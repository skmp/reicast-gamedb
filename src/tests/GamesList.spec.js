import { createLocalVue, mount } from '@vue/test-utils'
import Games from '@/components/miles/games/GamesList'
import { queryFilters } from '@/router/functions'
import { routeQueriesToTest } from '@/tests/fixtures/routes'

const gameLists = routeQueriesToTest()

const localVue = createLocalVue()
const $router = {
  push: jest.fn()
}

const componentFactory = (propsData, route) => {
  return mount(Games, {
    localVue,
    propsData: propsData,
    mocks: {
      $t: () => 'dummy text',
      $router,
      $route: route
    },
    sync: false
  })
}
describe(`GameList component`, () => {
  Object.keys(gameLists).forEach((key) => {
    let wrapper
    const route = gameLists[key].route
    const games = queryFilters(route)
    const filtersDescription = () => {
      let separator = ''
      if (route.query.status && route.query.category) {
        separator = ' and '
      }
      return `filtered by ${route.query.status}${separator}${route.query.category}`
    }
    const gameCount = games.tableData.length
    describe(`GameList ${filtersDescription()} (${gameCount} games total)`, () => {
      beforeAll(() => {
        wrapper = componentFactory(games, route)
      })

      beforeEach(() => {
        $router.push.mockClear()
      })

      afterAll(() => {
        wrapper.destroy()
      })

      it('is an instance of Vue', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
      })
      if (gameCount) {
        it('game title button triggers correctly', async () => {
          const buttonWrapper = wrapper.find('.game-title')
          const button = wrapper.find('.game-title button')
          await button.trigger('click')
          expect($router.push).toHaveBeenCalledWith({ path: `/games/${buttonWrapper.element.parentElement.className}` })
        })

        it('cover button triggers correctly', async () => {
          const buttonWrapper = wrapper.find('.cover-img')
          const button = wrapper.find('img.cover')
          await button.trigger('click')
          expect($router.push).toHaveBeenCalledWith({ path: `/games/${buttonWrapper.element.parentElement.className}` })
        })
        it('category button triggers correctly', async () => {
          const button = wrapper.find('.category')
          const buttonInner = wrapper.find('.category .q-btn-inner div').text()
          const category = wrapper.vm.$route.query.category
          jest.spyOn(wrapper.vm, 'addCategory')
          await button.trigger('click')
          expect(wrapper.vm.addCategory).toHaveBeenCalledWith(buttonInner)
          if (category === buttonInner) {
            expect($router.push).not.toHaveBeenCalled()
          } else {
            let categories = `${category},${buttonInner}`
            if (category === '') {
              categories = buttonInner
            }
            expect($router.push).toHaveBeenCalledWith({
              query: {
                category: categories,
                status: wrapper.vm.$route.query.status
              }
            })
          }
        })
        it('reset button triggers correctly', async () => {
          const button = wrapper.find('.reset')
          jest.spyOn(wrapper.vm, 'resetFilter')
          await button.trigger('click')
          expect(wrapper.vm.resetFilter).toHaveBeenCalled()
          expect($router.push).toHaveBeenCalledWith({ path: '' })
        })
      } else {
        it('there are no games in the list', async () => {
          const noDataWrapper = wrapper.find('.q-table-nodata')
          expect(noDataWrapper).toBeTruthy()
        })
      }
    })
  })
})
