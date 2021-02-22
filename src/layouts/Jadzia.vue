<template>
  <div class="jadzia flex flex-center">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted () {
    this.setCurrentActiveSection()
  },
  destroyed () {
    this.$store.commit('resetWindowProps')
    window.removeEventListener('scroll', this.handleScroll)
  },
  data () {
    return {
      attemptsToGetData: 0
    }
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
      let worksCount = this.sections.length
      const active = this.scrollStatus.active

      return active === worksCount ? -1 : `.${this.sections[active + 1]}`
    },
    getScrollToPrev () {
      const active = this.scrollStatus.active
      if (active === 1) {
        return 0
      }
      if (active !== 0) {
        return `.${this.sections[active - 1]}`
      }

      return null
    },
    setUpNav (active) {
      document.body.classList.add('no-scroll-bar')
      this.$store.commit('setTopOffset', window.scrollY)
      this.$store.commit('setScroll', {
        active: active,
        lastScrollTop: this.topOffset
      })
      window.addEventListener('scroll', this.handleScroll)
      this.$store.commit('setLoading', false)
      this.scrollPageTo(0)
    },
    setCurrentActiveSection () {
      if (this.sections.length) {
        this.setUpNav(
          Math.floor(this.topOffset / this.$store.getters.getHeight)
        )
      } else if (this.attemptsToGetData === 3) {
        throw new Error('Sections could not be set')
      } else {
        this.attemptsToGetData++
        setTimeout(() => this.setCurrentActiveSection(), 1000)
      }
    }
  }
}
</script>
