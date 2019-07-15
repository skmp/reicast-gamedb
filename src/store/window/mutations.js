import { WindowProps } from '../../models/Window'

export default {
  heightResize (state, height) {
    state.height = height
  },
  widthResize (state, width) {
    state.width = width
  },
  setTopOffset (state, offset) {
    state.offsetTop = offset
  },
  setPageClass (state, pageClass) {
    state.pageClass = pageClass
  },
  setScroll (state, data) {
    state.scrollNav = Object.assign(state.scrollNav, data)
  },
  setScrollItems (state, items) {
    state.scrollNav.items = items
  },
  resetWindowProps (state) {
    state = new WindowProps()
  },
  setLoading (state, loading) {
    state.loading = loading
  }
}
