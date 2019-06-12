<template>
  <div class="game">
    <MainNavigation :menuItems="menuItems" />
    <game-overview :section-class="sectionClasses.OVERVIEW"
                   :status="gameListData.status"/>
    <gallery v-if="screenshotsAlias"
             :objectKey="sectionClasses.SCREENSHOTS"/>
    <videos v-if="videosAlias"
            videoKey="video_id"
            :objectKey="sectionClasses.VIDEOS"/>
    <tests :game="gameListData"
           :section-class="sectionClasses.TESTS"/>
    <videos v-if="testVideosAlias"
            videoKey="yt"
            :objectKey="sectionClasses.TEST_VIDEOS"/>
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
  data () {
    return {
      sectionClasses: SECTION_CLASSES,
      [SECTION_CLASSES.OVERVIEW]: true,
      [SECTION_CLASSES.TESTS]: true
    }
  },
  computed: {
    gameData () {
      return this.$store.state.routing.currentGame
    },
    title () {
      return this.gameData.title
    },
    gameListData () {
      return this.$store.state.games.filter(game => game.id === this.gameData.id)[0]
    },
    screenshotsAlias () {
      return this[SECTION_CLASSES.SCREENSHOTS]
    },
    videosAlias () {
      return this[SECTION_CLASSES.VIDEOS]
    },
    testVideosAlias () {
      return this[SECTION_CLASSES.TEST_VIDEOS]
    },
    [SECTION_CLASSES.SCREENSHOTS] () {
      return this.gameData[SECTION_CLASSES.SCREENSHOTS]
    },
    [SECTION_CLASSES.VIDEOS] () {
      return this.gameData[SECTION_CLASSES.VIDEOS]
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
