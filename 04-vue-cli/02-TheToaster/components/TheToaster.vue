<template>
  <div class="toasts">
    <toasts-list v-slot="{ toast }" :toasts-list="toastsList">
      <ui-toast :toast="toast" :has-closing-icon="true" @remove="removeToast" />
    </toasts-list>
  </div>
</template>

<script>
import ToastsList from './ToastsList';
import UiToast from './UiToast';

export default {
  name: 'TheToaster',

  components: { ToastsList, UiToast },

  data() {
    return {
      toastsList: [],
    };
  },

  methods: {
    success(message, time = 5000) {
      this.toastsList.push({
        message: message,
        type: 'success',
      });
      setTimeout(() => this.toastsList.shift(), time);
    },
    error(message, time = 5000) {
      this.toastsList.push({
        message: message,
        type: 'error',
      });
      setTimeout(() => this.toastsList.shift(), time);
    },
    removeToast($event) {
      const toastPosition = this.toastsList.indexOf((item) => $event === item);
      this.toastsList.splice(toastPosition, 1);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast + .toast {
  margin-top: 20px;
}
</style>
