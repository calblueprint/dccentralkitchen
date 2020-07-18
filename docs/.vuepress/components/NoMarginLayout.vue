<template>
  <Content class="theme-default-content" />
</template>

<script>
import Layout from '@vuepress/theme-default/layouts/Layout.vue';
export default {
  extends: Layout,
  components: { Layout },
  computed: {
    data() {
      return this.$page.frontmatter;
    },
  },
};
</script>

<style lang="stylus">
body
  font-family 'Poppins'
@media (max-width: $MQMobileNarrow)
  .theme-default-content:not(.custom)
    padding 1px 0 0 0
    *:first-child
      margin-top 1px
</style>
