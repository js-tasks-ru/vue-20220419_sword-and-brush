<template>
  <div class="pagination-container">
    <slot v-for="meetup in meetups" :item="meetup" />
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    meetups() {
      const lastElementPosition = this.page * this.perPage;

      return this.items.slice(lastElementPosition - this.perPage, lastElementPosition);
    },
  },
};
</script>

<style></style>
