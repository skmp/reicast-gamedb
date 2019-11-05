<template>
  <section-component
    :class="sectionClass">

    <template slot="content">
      <div :style="heightStyle">
        <disqus shortname="reicastdc"
                v-if="notInPrerenderMode"
                :identifier="gameID"
                :url="`${siteUrl}/games/${gameID}`">
        </disqus>
      </div>
      <Footer></Footer>
    </template>
  </section-component>
</template>

<script>
import SectionComponent from '../Section.vue'
import Footer from '../../../common/Footer.vue'
import Disqus from '../../../common/Disqus'
import { SITE_URL } from '../../../../constants/general'

export default {
  components: { SectionComponent, Footer, Disqus },
  props: {
    sectionClass: {
      type: String,
      required: true
    },
    gameID: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      siteUrl: SITE_URL
    }
  },
  computed: {
    calcHeight () {
      return this.$store.getters.getHeight * 0.8
    },
    heightStyle () {
      return `height: ${this.calcHeight}px; overflow:auto;`
    },
    notInPrerenderMode () {
      return !(window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerendered)
    }
  }
}
</script>
