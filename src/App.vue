<template>
  <div id="q-app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { metaTags, linkTags, DESCRIPTION } from './constants/head'

export default {
  name: 'App',
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.$store.commit('heightResize', window.innerHeight)
      this.$store.commit('widthResize', window.innerWidth)
    }
  },
  // TODO: move into a more complete 'meta instantiation' method in head.js directly (?)
  mounted () {
    metaTags.push({
      vmid: DESCRIPTION,
      name: DESCRIPTION,
      content: this.$t('app.description')
    })
    return metaTags
  },
  metaInfo () {
    const appName = this.$t('app.name')
    const appDesc = this.$t('app.description')
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: appDesc,
      // all titles will be injected into this template
      titleTemplate: pageTitle => (
        `${pageTitle} - ${appName}`
      ),
      meta: metaTags,
      link: linkTags
    }
  }
}
</script>
