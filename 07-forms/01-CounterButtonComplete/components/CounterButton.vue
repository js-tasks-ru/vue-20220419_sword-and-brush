<template>
  <button @click="increaseCounter">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count() {
      this.localCount = this.count;
    },
  },

  methods: {
    increaseCounter() {
      this.localCount++;
      this.$emit('update:count', this.localCount);
    },
  },
};
</script>
