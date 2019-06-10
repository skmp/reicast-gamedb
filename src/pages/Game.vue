<template>
  <div>
    <MainNavigation :menuItems="menuItems" />
    <game-overview/>
    <gallery v-if="screenshotsAlias"
             objectKey="screenshots"/>
    <videos v-if="videosAlias"
            videoKey="video_id"
            objectKey="videos"/>
    <tests v-if="testsAlias"
            objectKey="tests"/>
    <videos v-if="testVideosAlias"
            videoKey="yt"
            objectKey="test-videos"/>
  </div>
</template>
<script>
import { DESCRIPTION } from '../constants/head'
import MainNavigation from '../components/TopNavbar.vue'
import GameOverview from '../components/GameOverview.vue'
import Gallery from '../components/Gallery.vue'
import Videos from '../components/Videos.vue'
import Tests from '../components/Tests.vue'
import { SECTION_CLASSES } from '../constants/general'

export default {
  name: 'Game',
  components: {
    MainNavigation,
    GameOverview,
    Gallery,
    Videos,
    Tests
  },
  mounted () {
    this.$store.commit('setPageClass', this.gameData.slug)
    this.$store.commit(
      'setScrollItems',
      Array.from(this.menuItems, x => x.name)
    )
  },
  computed: {
    gameData () {
      return this.$store.state.routing.currentGame
    },
    title () {
      return this.gameData.title
    },
    screenshotsAlias () {
      return this[SECTION_CLASSES.SCREENSHOTS]
    },
    videosAlias () {
      return this[SECTION_CLASSES.VIDEOS]
    },
    testsAlias () {
      return this[SECTION_CLASSES.TESTS]
    },
    testVideosAlias () {
      return this[SECTION_CLASSES.TEST_VIDEOS]
    },
    [SECTION_CLASSES.OVERVIEW] () {
      return true
    },
    [SECTION_CLASSES.SCREENSHOTS] () {
      return this.gameData[SECTION_CLASSES.SCREENSHOTS]
    },
    [SECTION_CLASSES.VIDEOS] () {
      return this.gameData[SECTION_CLASSES.VIDEOS]
    },
    [SECTION_CLASSES.TESTS] () {
      return this.gameData[SECTION_CLASSES.TESTS]
    },
    [SECTION_CLASSES.TEST_VIDEOS] () {
      return this.gameData[SECTION_CLASSES.TEST_VIDEOS]
    },
    menuItems () {
      const items = this.$t('gamePage', { returnObjects: true })
      let menuItems = []
      let availableSectionCount = 0
      Object.keys(items).forEach((key) => {
        if (this.isMenuItemVisible(key)) {
          menuItems.push({
            label: this.$t(items[key]),
            name: key,
            sectionNumbers: [availableSectionCount]
          })
          availableSectionCount++
        }
      })

      return menuItems
    }
  },
  methods: {
    isMenuItemVisible (key) {
      if (this[key]) {
        return true
      }
      return false
    }
  },
  metaInfo () {
    return {
      title: this.title,
      game: '',
      meta: [{
        vmid: DESCRIPTION,
        name: DESCRIPTION,
        content: this.title
      }]
    }
  }
}
</script>
