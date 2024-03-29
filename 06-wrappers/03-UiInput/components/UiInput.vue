<template>
  <div class="input-group" :class="iconClasses()">
    <div v-if="!!$slots['left-icon']" class="input-group__icon">
      <slot name="left-icon" />
    </div>

    <component
      :is="multiline ? 'textarea' : 'input'"
      v-bind="$attrs"
      ref="input"
      :value="modelValue"
      class="form-control"
      :class="formClasses"
      @[eventType]="sendEnteredValue"
    />

    <div v-if="!!$slots['right-icon']" class="input-group__icon">
      <slot name="right-icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiInput',

  inheritAttrs: false,

  props: {
    small: Boolean,
    rounded: Boolean,
    multiline: Boolean,
    modelValue: String,
    modelModifiers: {
      default: () => ({
        lazy: false,
      }),
    },
  },

  emits: ['update:modelValue'],

  computed: {
    formClasses() {
      return {
        'form-control_rounded': this.rounded,
        'form-control_sm': this.small,
      };
    },
    eventType() {
      return this.modelModifiers.lazy ? 'change' : 'input';
    },
  },

  methods: {
    iconClasses() {
      return {
        'input-group_icon': !!this.$slots,
        'input-group_icon-left': !!this.$slots['left-icon'],
        'input-group_icon-right': !!this.$slots['right-icon'],
      };
    },
    focus() {
      this.$refs.input.focus();
    },
    sendEnteredValue($event) {
      return this.$emit('update:modelValue', $event.target.value);
    },
  },
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s border-color;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon-left .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon-right .form-control {
  padding-right: 50px;
}

.input-group.input-group_icon .input-group__icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .input-group__icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .input-group__icon:last-child {
  right: 16px;
}
</style>
