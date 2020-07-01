<template>
  <main class="home" aria-labelledby="main-title">
    <main class="page">
      <header class="hero">
        <img
          v-if="data.heroImage"
          :src="$withBase(data.heroImage)"
          :alt="data.heroAlt || 'hero'"
        />
      </header>
    </main>
    <Layout />
    <main class="page">
      <div class="footer" v-if="data.footer">
        <a :href="data.footerLink || null" target="_blank">
          {{ data.footer }}
        </a>
      </div>
    </main>
  </main>
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
.home
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto
  display block
  .hero
    margin 1em auto 0 auto
    padding-left 2.5rem
    max-width 760px
    margin 3em auto 0 auto
    img
      max-width 300px
      max-height 100px
      display block
      margin 0 0
  .footer
    padding 2.5rem
    border-top 0px solid $borderColor
    text-align center
    color lighten($textColor, 25%)
.page
  padding-bottom 0

@media (max-width: 959px)
  .home
    .hero
      padding 0 2rem

@media (max-width: $MQMobileNarrow)
  .home
    padding $navbarHeight 2rem 0
    .hero
      margin 1em auto 0 auto
      padding 0 1.5rem
      img
        max-width 200px
        max-height 70px
  .page
    padding-bottom 0
</style>
