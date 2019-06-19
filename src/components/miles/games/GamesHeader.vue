<template>
  <header class="center games-list-header">
    <h2>
      {{ $t(tableTitle) }}
    </h2>
    <h4>
      <q-rating
        icon="fa fa-gamepad"
        :class="$route.query.status"
        v-model="getStars"
        :max="5" />
    </h4>
    <h4>
      {{ $t(tableSubTitle) }}
    </h4>
    <status-legend
      @statusClick="statusFilter"
    />
  </header>
</template>
<script>
import StatusLegend from '../../common/StatusLegend'
import { getStarsFromClass } from '../../../utils/gameHelpers'

export default {
  components: { StatusLegend },
  computed: {
    tableTitle () {
      const status = this.$route.query.status
      if (status) {
        return this.$t(`gameStatus.${status}`)
      }
      return this.$t('gamesIndexTitle')
    },
    tableSubTitle () {
      const categories = this.$route.query.category
      if (categories) {
        return `${'in'} ${categories.replace(/,/g, ', ')}`
      }
      return this.$t('allCategories')
    },
    getStars () {
      return getStarsFromClass(this.$route.query.status)
    }
  },
  methods: {
    statusFilter (status) {
      this.$router.push({ query: { status, category: this.$route.query.category } })
    }
  }
}
</script>
<style lang="stylus">
.games-list-header
  padding: 25px;
  width: 100%;
  background: rgb(25, 57, 96)
  color: white
  background-image: url('/statics/reicast-logo.png')
  background-position: center
  background-repeat: no-repeat
  background-size: contain
  h4
    line-height: unset
    margin-bottom: 10px
.q-rating
  color: #c0c0c0;
</style>
