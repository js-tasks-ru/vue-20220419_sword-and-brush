import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  if (!container) {
    container = document.createElement('div');
    document.body.appendChild(container);
  }

  const progressBarInstance = createApp(TheTopProgressBar).mount(container);

  if (router) {
    router.beforeEach(() => {
      progressBarInstance.start();
      return true;
    });

    router.afterEach(() => {
      progressBarInstance.finish();
    });

    router.onError((err) => {
      progressBarInstance.fail();
      throw err;
    });
  }

  const progressBar = {
    start(loader) {
      progressBarInstance.start(loader);
    },
    finish(loader) {
      progressBarInstance.finish(loader);
    },
    fail() {
      progressBarInstance.fail();
    },

    install(container) {
      container.provide(PROGRESS_KEY, progressBar);
    },
  };

  return progressBar;
}
