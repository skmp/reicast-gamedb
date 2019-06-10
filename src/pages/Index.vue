<template>
  <div>
    <section-component
      class="home"
      :heading="true"
      :height="1"
      :width="1"
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

export default {
  name: 'HomePage',
  mounted () {
    this.$store.commit('setPageClass', 'home')
  },
  components: {
    SectionComponent,
    About,
    Footer
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
