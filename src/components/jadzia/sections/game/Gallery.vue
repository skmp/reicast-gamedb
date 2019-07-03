<template>
  <section-component
    :class="objectKey"
    :heading="false"
    bg="#D2D4C8"
    color="black"
    :title="$t(`gameSections.${objectKey}`)">

    <template slot="content">
      <div class="centered">
        <q-carousel
          class="text-white"
          autoplay
          infinite
          quick-nav>
          <q-carousel-slide
            v-for="(shot, i) in game[objectKey]"
            :name="`Shot ${i + 1}`"
            :key="i">

            <img overlay-position="full"
                 itemprop="url"
                 :style="playerStyle"
                 :src="getScreenShotUrl(shot.url)"
                 :title="`${game.title} - ${objectKey}-${i}`"
                 :alt="`${game.title} - ${objectKey}-${i}`">
          </q-carousel-slide>

        </q-carousel>
      </div>
    </template>
  </section-component>
</template>

<script>
import SectionComponent from '../Section.vue'
import { getImage } from '../../../../utils/gameHelpers'

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
    width () {
      return this.$store.getters.getWidth
    },
    playerStyle () {
      const height = this.height
      const width = this.width
      let multiplier = 0.7
      if (width < 576 || height < 499) {
        multiplier = 0.6
      }
      return `max-height: ${height * multiplier}px; max-width: ${width * multiplier}px`
    }
  },
  methods: {
    getScreenShotUrl (url, size = 'screenshot_huge') {
      if (this.$q.platform.is.mobile) {
        size = 'screenshot_big'
      }
      return getImage(url, size)
    }
  }
}
</script>
