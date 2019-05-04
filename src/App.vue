<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { metaTags, linkTags, DESCRIPTION } from './constants/head'

export default {
  name: 'App',
  mounted () {
    // to be later moved into a more complete 'meta instantiation' method in head.js directly
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

<style>
</style>
