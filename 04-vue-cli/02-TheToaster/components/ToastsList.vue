<template>
  <div v-for="toast in toastsList" :key="toast.message">
    <slot :toast="toast" />
  </div>
</template>

<script>
export default {
  name: 'ToastsList',

  props: {
    toastsList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped />
