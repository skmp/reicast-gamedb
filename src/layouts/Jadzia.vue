<template>
  <div class="jadzia flex flex-center" v-if="true">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted () {
    document.body.classList.add('no-scroll-bar')
    this.$store.dispatch('scrollPageTo', { to: 0, duration: 1000 })
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    this.$store.dispatch('scrollPageTo', { to: 0, duration: 0 })
      .then(() => this.$store.commit('resetWindowProps'))
  },
  destroyed () {
    document.body.classList.remove('no-scroll-bar')
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    topOffset () {
      return this.$store.getters.getTopOffset
    },
    scrollStatus () {
      return this.$store.getters.getScrollStatus
    },
    sections () {
      return this.scrollStatus.items
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
      let worksCount = this.sections.length
      const active = this.scrollStatus.active
      if (active === worksCount) {
        next = -1
      } else if (active !== worksCount) {
        next = `.${this.sections[active + 1]}`
      }
      return next
    },
    getScrollToPrev () {
      let prev = null
      const active = this.scrollStatus.active
      if (active === 1) {
        prev = 0
      } else if (active !== 0) {
        prev = `.${this.sections[active - 1]}`
      }
      return prev
    }
  }
}
</script>
