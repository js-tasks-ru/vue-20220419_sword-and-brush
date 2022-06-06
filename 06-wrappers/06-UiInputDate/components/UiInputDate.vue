<template>
  <ui-input ref="uiInput" v-bind="$attrs" v-model="customModel" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import UiInput from './UiInput';

dayjs.extend(utc);

export default {
  name: 'UiInputDate',

  components: { UiInput },

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
    },
    step: {
      type: String,
    },
    modelValue: {
      type: [Number, null],
    },
  },

  emits: ['update:modelValue'],

  computed: {
    customModel: {
      get() {
        if (this.modelValue) {
          if (this.type === 'date') {
            return dayjs.utc(this.modelValue).format('YYYY-MM-DD');
          }
          if (this.type === 'time') {
            return this.step === '30'
              ? dayjs.utc(this.modelValue).format('HH:mm:ss')
              : dayjs.utc(this.modelValue).format('HH:mm');
          }
          if (this.type === 'datetime-local') {
            return dayjs.utc(this.modelValue).format('YYYY-MM-DD[T]HH:mm');
          }
        }

        return '';
      },
      set($event) {
        this.$emit('update:modelValue', this.$refs.uiInput.$refs.input.valueAsNumber);
      },
    },
  },
};
</script>
