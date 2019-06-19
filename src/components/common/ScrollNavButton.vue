<template>
  <div :class="scrollClass">
    <q-btn round v-if="showButtonIf"
           :dense="dense"
           :icon="getIcon()"
           :color="color"
           @click="scrollTo"/>
    </div>
</template>

<script>
import { scrollButtonProps } from '../../constants/components'

export default {
  props: scrollButtonProps,
  computed: {
    scrollSize () {
      const scrollSize = 50
      if (this.directionDown) {
        return scrollSize
      }
      return -scrollSize
    },
    scrollClass () {
      return this.appendDirectionString(`${this.styleClasses} scroll-`)
    },
    showButtonIf () {
      if (this.showButton) {
        return this.showButton
      }
      const scrollStatus = this.$store.getters.getScrollStatus
      if (this.directionDown) {
        return scrollStatus.items.length !== scrollStatus.active + 1
      } else {
        return scrollStatus.active !== 0
      }
    }
  },
  methods: {
    scrollTo () {
      window.scrollBy({
        top: this.scrollSize,
        left: 0,
        behavior: 'smooth'
      })
    },
    appendDirectionString (appendTo) {
      if (this.directionDown) {
        return `${appendTo}down`
      }
      return `${appendTo}up`
    },
    getIcon () {
      return this.appendDirectionString(`${this.icon}-`)
    }
  }
}
</script>
<style lang="stylus">
  .scroll-navigation-btn
    position: fixed
    right: 20px
    z-index: 10
    &.scroll-down
      top: 85px
    &.scroll-up
      bottom: 50px
</style>
