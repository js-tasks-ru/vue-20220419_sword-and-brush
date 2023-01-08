<template>
  <slot v-if="status === 'pending'" name="pending" />
  <slot v-else-if="status === 'fulfilled'" name="fulfilled" :result="payload" />
  <slot v-else-if="status === 'error'" name="rejected" :error="payload" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      status: 'pending',
      payload: {},
    };
  },

  watch: {
    promise: {
      handler() {
        this.fetchMeetup();
      },
      immediate: true,
    },
  },

  methods: {
    fetchMeetup() {
      this.status = 'pending';
      this.payload = {};

      this.promise
        .then((data) => {
          this.status = 'fulfilled';
          this.payload = data;
        })
        .catch((error) => {
          this.status = 'error';
          this.payload = error;
        });
    },
  },
};
</script>
