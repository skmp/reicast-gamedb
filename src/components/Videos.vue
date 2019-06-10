<template>
  <section-component
    :class="objectKey"
    :heading="false"
    bg="#D2D4C8"
    color="black"
    :title="$t(`gamePage.${objectKey}`)">

    <template slot="content">

        <q-carousel class="video-carousel"
                    infinite
                    quick-nav>
          <q-carousel-slide  v-for="(video, i) in game[objectKey]"
                             :name="`${$t(`gamePage.${objectKey}`)} ${i + 1}`"
                             :key="i"
                             :selected="i === 0">
            <div class="custom-caption" v-if="video.hw">
              <div>
                <v-table :fields="['Game Release', 'Hardware','Platform']"
                         :wrapperClass="objectKey"
                         :rows="[{
                                             'Game Release': getRelease(video.fingerprint).id ,
                                             Hardware: video.hw ,
                                             Platform: video.platform
                                             }]">
                </v-table>
              </div>
            </div>
            <iframe
              :width="playerWidth"
              :height="playerHeight"
              :src="`https://www.youtube.com/embed/${video[videoKey]}?rel=0`"
              frameborder="0"
              allowfullscreen
            ></iframe>

          </q-carousel-slide>
        </q-carousel>
    </template>
  </section-component>
</template>

<script>
import SectionComponent from './Section.vue'
import VTable from './Table.vue'

export default {
  components: { SectionComponent, VTable },
  props: {
    objectKey: {
      type: String,
      required: true
    },
    videoKey: {
      type: String,
      required: true
    },
    testCase: {
      type: Boolean,
      default: false
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
    playerHeight () {
      let multiplier = 0.7
      if (this.width < 576 || this.height < 768) {
        multiplier = 0.6
      }
      return this.height * multiplier
    },
    playerWidth () {
      if (this.width < 1200) {
        return '100%'
      }
      return '90%'
    }
  },
  methods: {
    getRelease (fingerprint) {
      let releaseIndex = null
      const releases = this.game.releases
      releases.forEach((key, index) => {
        if (key.id.substring(0, 4) === fingerprint.substring(0, 4)) {
          releaseIndex = index
        }
      })
      return releases[releaseIndex]
    }
  }
}
</script>
<style>
  @media screen and (max-height: 576px) {
    section.test-videos .q-carousel.video-carousel {
      padding-top: 45px;
    }
  }
</style>
