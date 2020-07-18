<template>
  <Content class="flush" />
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

@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

<style lang="stylus">
.flush
  padding 1px 0 0 0
  font-family 'Poppins', serif
  *:first-child
    margin-top 1px
</style>
