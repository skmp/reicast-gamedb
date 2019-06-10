<template>
    <section-component
      class="overview"
      :heading="false"
      bg="#38478c"
      color="white"
      :title="title">

      <template slot="content">

        <q-card>
          <div class="row">
            <div class="col-md-8 col-sm-8 col-xs-12">
              <div class="game-cover" :style="logoStyle">
              </div>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-12 centered">
              <div class="center-vertical">
                <q-card-title>
                  <h3>{{ title }}</h3>
                  <q-rating slot="subtitle" v-model="stars" :max="5" />
                </q-card-title>
                <q-card-main>
                  <p v-if="game.first_release_date">
                    <span class="label">{{ $t('first_release_date') }}:</span> {{ timeConverter(game.first_release_date) }}
                  </p>
                  <div v-for="(field, index) in csvFieldsData" :key="index">
                    <p v-if="game[field]">
                      <span class="label">{{ $t(field) }}:</span>
                      <span
                        v-for="(category, index) in game[field]"
                        :key="index">
                        {{ category }}
                     <span class="separator" v-if="game[field].length - 1 !== index">,
                     </span>
                  </span>
                    </p>
                  </div>

                </q-card-main>
              </div>
            </div>
          </div>
        </q-card>

      </template>
    </section-component>
</template>

<script>
import SectionComponent from './Section.vue'
import helpers from '../utils/gameHelpers'

export default {
  components: { SectionComponent },
  data () {
    return {
      csvFieldsData: ['categories', 'game_modes', 'player_perspectives']
    }
  },
  computed: {
    game () {
      return this.$store.state.routing.currentGame
    },
    title () {
      return this.game.title
    },
    stars () {
      return 4
    },
    height () {
      return this.$store.getters.getHeight
    },
    width () {
      return this.$store.getters.getWidth
    },
    logoHeightCss () {
      let multiplier = 1
      if (this.width < 576) {
        multiplier = 0.45
      }
      return `height: ${this.height * multiplier}px;`
    },
    logoBgCss () {
      let imageUrl = '../statics/reicast-logo.png'
      if (this.game.cover) {
        imageUrl = this.getCoverUrl(this.game.cover[0].url)
      }
      return `background: #04575d url(${imageUrl}) no-repeat center;`
    },
    logoStyle () {
      return `${this.logoHeightCss} ${this.logoBgCss}`
    }
  },
  methods: {
    getCoverUrl (url, size = 'cover_big') {
      return url.replace('t_thumb', `t_${size}`)
    },
    timeConverter (unixTimestamp) {
      return helpers.getDate(unixTimestamp)
    }
  }
}
</script>

<style scoped lang="stylus">

  ul.page-header
    &__list
      list-style none
    &.cat
      li
        float: left
        padding-right: 8px

  .game-cover
    background-repeat: no-repeat
    background-position: center
    background-size: cover!important

  .label
    font-weight: bold

  @media (min-width: 576px) and (min-height: 560px)
    .center-vertical
      position: relative
      top: 50%
      transform: translateY(-50%)

    .label
      display: block

  @media (min-width: 576px) and (max-height: 559px)
    .center-vertical
      margin-top: 55px

  @media screen and (max-height: 299px)
    .center-vertical
      margin-top: 35px
</style>
