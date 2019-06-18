<template>
  <div>
    <section-component
      class="home"
      :heading="true"
      bg="#193960"
      color="#f7f7f7"
      :title="$t('app.description')">

      <template slot="content">
        <div class="centered">
          <img class="spin"
               :style="logoMaxHeight"
               alt="Reicast logo"
               src="statics/reicast-logo.png">
          <div style="clear:both"></div>
          <p class="subtitle hidden-xsh">
            {{ $t('app.long_description') }}
          </p>
          <q-btn color="secondary"
                 class="enter"
                 icon="fa fa-gamepad"
                 label="Enter"
                 @click="$router.push('/games')"/>
        </div>
        <scroll-nav/>
        <input v-if="!$q.platform.is.cordova && !$q.platform.is.electron"
               type="hidden" name="spaPreRenderElement" value=""/>
      </template>
    </section-component>

    <About/>
    <Footer/>

  </div>
</template>

<script>
import SectionComponent from '../components/Section.vue'
import About from '../components/About.vue'
import Footer from '../components/Footer.vue'
import ScrollNav from '../components/ScrollNav'

export default {
  name: 'HomePage',
  mounted () {
    this.$store.commit('setPageClass', 'home')
    this.$store.commit('setScrollItems', [ 'home', 'about' ]
    )
  },
  components: {
    SectionComponent,
    About,
    Footer,
    ScrollNav
  },
  computed: {
    height () {
      return this.$store.getters.getHeight
    },
    logoMaxHeight () {
      const minLogoHeight = 64
      let height = this.height * 0.3
      if (height < minLogoHeight) {
        height = minLogoHeight
      }
      return `max-height: ${height}px;`
    }
  }
}
</script>
<style>
  .enter {
    margin-top: 1em;
    animation: shadow-pulse 1s infinite;
    animation-delay: 5s;
  }
  .home .centered {
    overflow: visible;
  }
</style>
