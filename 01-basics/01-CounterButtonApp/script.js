import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  name: 'app',

  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increaseCounter() {
      return this.counter++;
    },
  },
});

createApp(App).mount('#app');
