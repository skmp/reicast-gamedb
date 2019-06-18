export class WindowProps {
  constructor ({
    loading = true,
    pageClass = 'home',
    width = 0,
    height = 0,
    offsetTop = 0,
    scrollNav = {
      items: [],
      active: null,
      down: true,
      scrollStarted: false,
      lastScrollTop: 0
    }
  } = {}) {
    this.loading = loading
    this.pageClass = pageClass
    this.width = width
    this.height = height
    this.offsetTop = offsetTop
    this.scrollNav = Object.assign({}, {
      items: scrollNav.items,
      active: scrollNav.active,
      down: scrollNav.down,
      scrollStarted: scrollNav.scrollStarted,
      lastScrollTop: scrollNav.lastScrollTop
    })
  }
}
