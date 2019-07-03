<template>
  <div class="game">
    <MainNavigation :menuItems="menuItems" />
    <game-overview :section-class="sectionClasses.OVERVIEW"
                   :status="gameListData.status"/>
    <info v-if="infoAlias"
          :section-class="sectionClasses.INFO" />
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
    <discuss :game-i-d="gameData.id"
             :section-class="sectionClasses.DISCUSS"/>
  </div>
</template>
<script>
import { DESCRIPTION } from '../constants/head'
import MainNavigation from '../components/jadzia/partials/TopNavbar'
import GameOverview from '../components/jadzia/sections/game/GameOverview'
import Info from '../components/jadzia/sections/game/Info'
import Gallery from '../components/jadzia/sections/game/Gallery'
import Videos from '../components/jadzia/sections/game/Videos'
import Tests from '../components/jadzia/sections/game/Tests'
import Discuss from '../components/jadzia/sections/game/Discuss'
import { SECTION_CLASSES } from '../constants/general'

export default {
  name: 'Game',
  props: {
    gameListData: {
      type: Object,
      required: true
    }
  },
  components: {
    MainNavigation,
    GameOverview,
    Info,
    Gallery,
    Videos,
    Tests,
    Discuss
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
      [SECTION_CLASSES.TESTS]: true,
      [SECTION_CLASSES.DISCUSS]: true
    }
  },
  computed: {
    gameData () {
      return this.$store.state.routing.currentGame
    },
    title () {
      return this.gameData.title
    },
    infoAlias () {
      return this[SECTION_CLASSES.INFO]
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
    [SECTION_CLASSES.INFO] () {
      return this.gameData.releases.length
    },
    [SECTION_CLASSES.VIDEOS] () {
      return this.gameData[SECTION_CLASSES.VIDEOS]
    },
    [SECTION_CLASSES.TEST_VIDEOS] () {
      return this.gameData[SECTION_CLASSES.TEST_VIDEOS]
    },
    menuItems () {
      let menuItems = []
      let availableSectionCount = 0
      Object.keys(SECTION_CLASSES).forEach((key) => {
        if (this.isMenuItemVisible(SECTION_CLASSES[key])) {
          menuItems.push({
            label: this.$t(`gameSections.${SECTION_CLASSES[key]}`),
            name: SECTION_CLASSES[key],
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
    // TODO: generate and feed appropriate meta desc, etc
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
