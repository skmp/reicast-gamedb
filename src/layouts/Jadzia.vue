<template>
  <div class="flex flex-center" v-if="true">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('scrollPageTo', { to: 0, duration: 2000 })
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    this.$store.dispatch('scrollPageTo', { to: 0, duration: 0 })
      .then(() => this.$store.commit('resetWindowProps'))
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    height () {
      return this.$store.getters.getHeight
    },
    width () {
      return this.$store.getters.getWidth
    },
    topOffset () {
      return this.$store.getters.getTopOffset
    },
    scrollStatus () {
      return this.$store.getters.getScrollStatus
    },
    sections () {
      return this.scrollStatus.items
    },
    pageClass () {
      return this.$store.getters.getPageClass
    }
  },
  methods: {
    scrollPageTo (to = null, duration = 500) {
      if (!to) {
        to = this.scrollStatus.down ? this.getScrollToNext() : this.getScrollToPrev()
      }
      this.$store.dispatch('scrollPageTo', { to, duration })
    },
    handleScroll () {
      if (!this.scrollStatus.scrollStarted) {
        this.$store.commit('setTopOffset', window.scrollY)
        let st = this.topOffset
        let lastScrollTop = this.scrollStatus.lastScrollTop
        if (st !== lastScrollTop) {
          this.$store.commit('setScroll', {
            down: st > lastScrollTop,
            scrollStarted: true
          })
          if (this.scrollStatus.active !== null) {
            this.scrollPageTo()
          }
        }
      }
    },
    getScrollToNext () {
      let next = null
      const worksCount = this.sections.length
      const active = this.scrollStatus.active
      if (active === worksCount) {
        next = -1
      } else if (active !== worksCount) {
        next = `.${this.pageClass}.${this.sections[active]}`
      }
      return next
    },
    getScrollToPrev () {
      let prev = null
      const active = this.scrollStatus.active
      if (active === 1) {
        prev = 0
      } else if (active !== 0) {
        prev = `.${this.pageClass}.${this.sections[active - 2]}`
      }
      return prev
    }
  }
}
</script>
