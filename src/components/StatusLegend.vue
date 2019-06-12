<template>
  <div class="status-legend">
    <q-btn v-for="(item, index) in statuses"
           :key="index"
           :label="item"
           :class="`q-mr-md ${index}`"
           @click="emitStatus(index)"
    />
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
    emitStatus (status) {
      this.$emit('statusClick', status)
    }
  }
}
</script>
<style lang="stylus">
.status-legend
  button
    margin: 5px
</style>
