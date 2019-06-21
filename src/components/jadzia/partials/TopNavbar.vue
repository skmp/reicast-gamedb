<template>
  <transition name="bounce" mode="out-in">
    <nav v-if="!loading" :class="setNavClasses" ref="navbar">
      <span class="navbar-toggle" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </span>

      <a class="navbar-brand" @click="$router.push('/games')">
        <h1 class="hidden-xs">{{ $t('app.name') }}</h1>
        <img class="display-xs" src="statics/icons/favicon-32x32.png" alt="Reicast Logo">
      </a>
      <span class="navbar-active">{{ activeLabel }}</span>
      <div class="collapse navbar-collapse navbar-right navbar-main-collapse">

        <ul class="main-nav" ref="navBarToggle">
          <li v-for="(menuItem, index) in menuItems"
              :key="index"
              :class="menuItemClass(index)"
              @click="goTo(index)">
            <a class="nav-links">
              {{ menuItem.label }}
            </a>
          </li>
        </ul>

      </div>
      <pre-render-injection/>
      <scroll-nav/>
    </nav>
  </transition>
</template>

<script>
import ScrollNav from '../../common/ScrollNav'
import PreRenderInjection from '../../common/PreRenderInjection'

const topNavCollapseClass = 'top-nav-collapse'
const topNavClasses = 'navbar navbar-fixed-top'

export default {
  name: 'GameNavigation',
  components: { ScrollNav, PreRenderInjection },
  props: {
    menuItems: {
      type: Array,
      required: true
    }
  },
  beforeMount () {
    this.$store.commit('setLoading', true)
  },
  data () {
    return {
      activeLabel: ''
    }
  },
  computed: {
    active () {
      return this.$store.state.appWindow.scrollNav.active
    },
    setNavClasses () {
      let active = this.active
      if (active === 0) {
        return topNavClasses
      }
      return `${topNavClasses} ${topNavCollapseClass}`
    },
    loading () {
      return this.$store.state.appWindow.loading
    }
  },
  methods: {
    menuItemClass (index) {
      // sectionNumbers exist to allow for more than one section to be related to a menu item
      if (this.isActiveMenuItem(index)) {
        this.activeLabel = this.menuItems[index].label
        return 'active'
      }
    },
    toggleMenu () {
      let navBarToggle = this.$refs.navBarToggle
      navBarToggle.classList.toggle('active')
    },
    goTo (index) {
      const to = this.menuItems[index].name
      if (this.isActiveMenuItem(index)) {
        this.$q.notify({
          type: 'info',
          message: this.$t('already_here')
        })
      } else if (this.$store.state.appWindow.scrollNav.scrollStarted) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('navigation_already_in_progress')
        })
      } else {
        if (this.menuItems[index].sectionNumbers.length) {
          this.$store.dispatch('scrollPageToFromClick', `.${to}`)
        } else {
          this.$router.push({ path: to })
        }
      }
    },
    isActiveMenuItem (index) {
      return this.menuItems[index].sectionNumbers.includes(this.active)
    }
  }
}
</script>
<style lang="stylus">
  $menu-background = #38478c
  $dark-transparent-bg = rgba(4,87,93,.3)
  $light-transparent-bg = rgba(255,255,255,.2)

  .navbar
    display: block
    font-size: 18px
    position: fixed
    right: 0
    left: 0
    background: 0 0
    padding: 0
    z-index: 1030
    top: 0
    -webkit-transition: all .5s ease-in-out,padding .5s ease-in-out
    -moz-transition: all .5s ease-in-out,padding .5s ease-in-out
    transition: all .5s ease-in-out,padding .5s ease-in-out
    &.top-nav-collapse
      background: rgba(56, 71, 140, 0.8)
      ul.main-nav li a
        color: #fff

  .main-nav
    list-style-type: none
    display: none
    background-color: $dark-transparent-bg
    margin:0
    li
      text-align: left
      margin:0

    li a
      font-size: 0.7em
      letter-spacing: 0.1em
      text-transform: uppercase
      font-weight: 700
      padding: 5px
      line-height: 55px
      cursor: pointer

    li.active, li:hover
      outline: 0
      background-color: $light-transparent-bg

  .nav-links,
  .navbar-brand
    text-decoration: none
    color: white

  .navbar-brand
    float: left
    font-size: 0.7em
    padding: 1em 2em 0
    cursor: pointer
    h1
      margin:0
      font-size: 23px
      line-height: unset

  .navbar-toggle
    position: absolute
    top: 1em
    right: 1em
    cursor: pointer
    color: rgba(255, 255, 255, 0.8)
    font-size: 1em

  .navbar-active
    font-size: 17px
    width: 240px
    margin: auto
    display: none
    text-align: center
    padding: 1em 2em
    text-transform: capitalize
    color: white

  .active
    display: block

  /* Maximum height */
  @media (max-height: 399px)
    .navbar.top-nav-collapse
      background: transparent!important

    footer .btn-circle
      display:none

    body
      font-size: 12px

  @media screen and (max-width: 991px), screen and (max-height: 398px)
    .navbar
      background: rgba(0,0,0,0.2)

    .collapse.navbar-collapse
      clear: both

    .main-nav
      li
        padding: 0 24px

        a
          padding: unset
          display: inline-block
          width:100%
          color: white
          line-height: 40px;

    .navbar-active
      display: block;

  @media screen and (max-height: 299px)
    .navbar-active
      display: none

  @media screen and (min-width: 992px) and (min-height: 399px)
    .navbar
      justify-content: space-between
      align-items: center
      padding: 20px 0
      letter-spacing: 1px
      background: 0 0
      border-radius: 0
      -webkit-transition: all .5s ease-in-out,padding .5s ease-in-out
      -moz-transition: all .5s ease-in-out,padding .5s ease-in-out
      transition: all .5s ease-in-out,padding .5s ease-in-out

      &.top-nav-collapse
        padding: 0
        background: $menu-background
      .main-nav
        background-color: rgba(0,0,0,0)
        li a:hover
          background-color: $light-transparent-bg
      &:not(.top-nav-collapse)
        .main-nav
          background: rgba(0,0,0,0.2);
      .navbar-collapse
        margin-right: 0
        margin-left: 0
        padding-left: 0
        padding-right: 0
        width: auto
        border-top: 0
        box-shadow: none
        max-height: 340px
        &.collapse
          display: block !important
          height: auto !important
          padding-bottom: 0
          overflow: visible !important

      .navbar-right
        float: right!important

      .main-nav
        display: flex
        margin-right: 30px
        flex-direction: row
        justify-content: flex-end

      .navbar.top-nav-collapse .nav.navbar-nav
        background-color: rgba(0,0,0,0)

      .nav-links
        padding: 18px 10px

      .navbar-toggle
        display: none

      .navbar-brand:hover,
      .nav-links:hover
        color: rgba(255, 255, 255, 1)

</style>
