<template>
  <transition name="fade" mode="out-in">
    <div v-show="showButtonIf">
      <scroll-nav-button
        v-for="(button, index) in buttons"
        :key="index"
        :dense="dense"
        :icon="icon"
        :styleClasses="styleClasses"
        :color="color"
        :directionDown="index"
      />
    </div>
    </transition>
</template>

<script>
import ScrollNavButton from './ScrollNavButton'
import { scrollButtonProps } from '../constants/components'

export default {
  components: { ScrollNavButton },
  props: scrollButtonProps,
  data () {
    return {
      mousePosition: 0,
      buttons: [0, 1]
    }
  },
  created () {
    window.addEventListener('mousemove', this.traceMouse)
    window.addEventListener('mouseenter', this.traceMouse)
    window.addEventListener('mouseleave', this.traceMouse)
  },
  destroyed () {
    window.removeEventListener('mousemove', this.traceMouse)
    window.removeEventListener('mouseenter', this.traceMouse)
    window.removeEventListener('mouseleave', this.traceMouse)
  },
  computed: {
    showButtonIf () {
      const scrollZoneThreshold = this.$store.getters.getWidth - 60
      return this.mousePosition > scrollZoneThreshold
    }
  },
  methods: {
    traceMouse (event) {
      this.mousePosition = event.pageX
    }
  }
}
</script>
