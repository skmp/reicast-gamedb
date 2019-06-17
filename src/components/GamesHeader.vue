<template>
  <header class="center games-list-header">
    <img class="spin"
         alt="Reicast logo"
         src="statics/icons/icon-128x128.png"
         @click="$router.push('/')">
    <h2>
      {{ $t(tableTitle) }}
    </h2>
    <h4 v-if="tableSubTitle">
      {{ $t(tableSubTitle) }}
    </h4>
    <status-legend
      @statusClick="statusFilter"
    />
  </header>
</template>
<script>
import StatusLegend from '../components/StatusLegend'

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
      return null
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
  h4
    line-height: unset
    margin-bottom: 10px
</style>
