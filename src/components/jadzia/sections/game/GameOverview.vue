<template>
    <section-component
      :class="sectionClass"
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
                  <q-rating v-if="isTested()"
                            icon="fa fa-gamepad"
                            slot="subtitle"
                            :class="computeClass(stars)"
                            v-model="stars"
                            :max="5" />
                  <span v-else>
                    {{ status }}
                  </span>
                </q-card-title>
                <q-card-main>
                  <p v-if="game.first_release_date">
                    <span class="label">{{ $t('first_release_date') }}:</span> {{ timeConverter(game.first_release_date) }}
                  </p>
                  <div v-for="(field, index) in csvFieldsData" :key="index">
                    <p v-if="game[field]">
                      <span class="label">{{ $t(field) }}: </span>
                      <span>{{ getCategories(game[field]) }}
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
import SectionComponent from '../Section.vue'
import { getStars, getDate, getImage, getCategories, computeStatusClass } from '../../../../utils/gameHelpers'
import { UNTESTED_LABEL } from '../../../../constants/general'

export default {
  components: { SectionComponent },
  props: {
    sectionClass: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
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
      return this.game.name
    },
    stars () {
      return getStars(this.status)
    },
    height () {
      return this.$store.getters.getHeight
    },
    width () {
      return this.$store.getters.getWidth
    },
    logoHeightStyle () {
      let multiplier = 1
      if (this.width < 576) {
        multiplier = 0.45
      }
      return `height: ${this.height * multiplier}px;`
    },
    logoBgStyle () {
      let imageUrl = null
      if (this.game.cover) {
        imageUrl = this.game.cover
      }
      imageUrl = getImage(imageUrl, 'cover_big')
      return `background: #04575d url(${imageUrl}) no-repeat center;`
    },
    logoStyle () {
      return `${this.logoHeightStyle} ${this.logoBgStyle}`
    }
  },
  methods: {
    timeConverter (unixTimestamp) {
      return getDate(unixTimestamp)
    },
    isTested () {
      return this.status !== UNTESTED_LABEL
    },
    getCategories (cats) {
      return getCategories(cats)
    },
    computeClass (status) {
      return computeStatusClass(status)
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
