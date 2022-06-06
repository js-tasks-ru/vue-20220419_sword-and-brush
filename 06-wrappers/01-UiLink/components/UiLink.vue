<template>
  <component :is="tagItem.tag" :[tagItem.attr]="$attrs[tagItem.attr]" class="link">
    <slot />
  </component>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'UiLink',

  props: {
    tag: {
      type: [String, Object],
    },
  },

  computed: {
    tagItem() {
      return this.tag === 'a' ? { tag: 'a', attr: 'href' } : { tag: RouterLink, attr: 'to' };
    },
  },
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
