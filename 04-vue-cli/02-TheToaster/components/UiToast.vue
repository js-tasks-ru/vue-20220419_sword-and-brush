<template>
  <div class="toast" :class="'toast_' + toast.type">
    <ui-icon class="toast__icon" :icon="$options.iconType[toast.type]" />
    <span>{{ toast.message }}</span>
    <ui-icon v-if="hasClosingIcon" class="toast__closing-icon" icon="check" @click="sendRemovalRequest" />
    <div class="toast__closing-icon-border"></div>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'UiToast',

  iconType: {
    success: 'check-circle',
    error: 'alert-circle',
  },

  components: { UiIcon },

  props: {
    toast: {
      type: Object,
      required: true,
    },
    hasClosingIcon: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['remove'],

  methods: {
    sendRemovalRequest() {
      this.$emit('remove', this.toast.message);
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast__icon {
  margin-right: 12px;
}

.toast__closing-icon {
  margin-left: auto;
  padding-left: 12px;
  filter: hue-rotate(360deg) brightness(1.8);
}

.toast__closing-icon-border {
  display: block;
  pointer-events: none;
  position: absolute;
  right: 11px;
  width: 25px;
  height: 25px;
  border: 2px solid lightskyblue;
  opacity: 0;
  border-radius: 90px;
}

.toast__closing-icon:hover + .toast__closing-icon-border {
  opacity: 100;
  transition-duration: 0.5s;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
