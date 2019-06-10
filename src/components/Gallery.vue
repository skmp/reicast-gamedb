<template>
  <section-component
    :class="objectKey"
    :heading="false"
    bg="#D2D4C8"
    color="black"
    :title="$t(`gamePage.${objectKey}`)">

    <template slot="content">
      <div class="centered">
        <q-carousel
          class="text-white"
          autoplay
          infinite
          quick-nav>
          <q-carousel-slide  v-for="(shot, i) in game[objectKey]"
                             :name="`Shot ${i + 1}`"
                             :key="i"
                             :selected="i === 0">

            <img overlay-position="full"
                 itemprop="url"
                 :style="playerHeightStyle"
                 :src="getBigScreenshotUrl(shot.url)"
                 :title="`${game.title} - ${objectKey}-${i}`"
                 :alt="`${game.title} - ${objectKey}-${i}`">
          </q-carousel-slide>

        </q-carousel>
      </div>
    </template>
  </section-component>
</template>

<script>
import SectionComponent from './Section.vue'

export default {
  components: { SectionComponent },
  props: {
    objectKey: {
      required: true
    }
  },
  computed: {
    game () {
      return this.$store.state.routing.currentGame
    },
    height () {
      return this.$store.getters.getHeight
    },
    playerHeightStyle () {
      let multiplier = 0.7
      if (this.width < 576) {
        multiplier = 0.6
      }
      return `max-height: ${this.height * multiplier}px`
    }
  },
  methods: {
    getBigScreenshotUrl (url, size = 'screenshot') {
      return url.replace('t_thumb', `t_${size}_big`)
    }
  }
}
</script>
