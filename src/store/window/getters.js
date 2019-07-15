export default {
  getHeight: state => {
    return state.height
  },
  getWidth: state => {
    return state.width
  },
  getTopOffset: state => {
    return state.offsetTop
  },
  getScrollStatus: state => {
    return state.scrollNav
  },
  getPageClass: state => {
    return state.pageClass
  }
}
