<template>
  <Layout />
</template>

<script>
import Layout from '@vuepress/theme-default/layouts/Layout.vue';
export default {
  extends: Layout,
  components: { Layout },
};
</script>

@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

<style lang="stylus">
body
  font-family "Poppins"
@media (max-width: $MQMobileNarrow)
  .theme-default-content:not(.custom)
    padding 0
    *:first-child
      margin-top 1px
</style>
