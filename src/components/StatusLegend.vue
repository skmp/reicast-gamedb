<template>
  <div class="status-legend">
    <q-btn v-for="(item, index) in statuses"
           :key="index"
           :label="item"
           :icon="active(index) ? 'fa fa-check' : ''"
           :class="getClass(index)"
           @click="select(index)" no-caps/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      statuses: this.$t('gameStatus', { returnObjects: true })
    }
  },
  methods: {
    select (status) {
      this.$emit('statusClick', status)
      this.$router.push({ path: '', query: { status, category: this.$route.query.category } })
    },
    active (status) {
      return this.$route.query.status === status
    },
    getClass (status) {
      if (this.active(status)) {
        return `active-status ${status}`
      }
      return status
    }
  }
}
</script>
<style lang="stylus">
.status-legend
  display: block
  button
    margin: 5px
    i
      display: none
      margin-right: unset

    &.active-status
      i
        display: block
        margin-bottom 5px
</style>
