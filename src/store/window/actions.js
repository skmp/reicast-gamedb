import {
  getMatchingPreviousSiblingsCount,
  easeInOutQuad
} from '../../utils/windowHelpers'

const actions = {
  async scrollPageTo ({ dispatch }, args) {
    document.body.style.overflowY = 'hidden'
    let to
    let duration
    const argsType = typeof args
    if (argsType === 'string' || argsType === 'number') {
      to = args
      duration = 500
    } else if (argsType === 'object') {
      to = args.to
      duration = args.duration
    }
    const toSelector = to
    return new Promise((resolve, reject) => {
      const element = document.scrollingElement
      if (typeof to === 'string') {
        to = document.querySelector(to) || reject(new Error(
          'element cannot be found')
        )
      }
      if (typeof to !== 'number') {
        to = to.getBoundingClientRect().top + element.scrollTop
      }
      // -1 represents scroll to the bottom, compensate for duration
      if (to === -1) {
        to = element.scrollHeight
        duration = duration * 1.6
      }

      let start = element.scrollTop
      let change = to - start
      let currentTime = 0
      let increment = 20

      const animateScroll = function () {
        currentTime += increment
        let val = easeInOutQuad(currentTime, start, change, duration)
        element.scrollTop = val
        if (currentTime < duration) {
          setTimeout(animateScroll, increment)
        } else {
          dispatch('onEndScrollPageTo', toSelector)
            .then(() => resolve())
        }
      }
      animateScroll()
    })
  },
  async onEndScrollPageTo ({ commit, dispatch }, toSelector) {
    try {
      const active = await dispatch('setActive', toSelector)
      const offset = window.scrollY
      commit('setTopOffset', offset)
      commit('setScroll', {
        active: active,
        scrollStarted: false,
        lastScrollTop: offset
      })
      document.body.style.overflowY = 'scroll'
    } catch (err) {
      console.log(err)
    }
  },
  setActive ({ state }, to) {
    let active
    if (to === 0) {
      active = 0
    } else if (to === -1) {
      active = state.scroll.items.length + 1
    } else {
      active = getMatchingPreviousSiblingsCount(
        document.querySelector(to),
        '.section')
    }
    return active
  },
  scrollPageToFromClick ({ commit, dispatch }, to) {
    commit('setScroll', {
      active: null
    })
    dispatch(
      'scrollPageTo',
      {
        to: to,
        duration: 1000
      }
    )
  }
}

export default actions
