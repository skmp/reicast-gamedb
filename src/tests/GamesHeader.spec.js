import Quasar, * as All from 'quasar'
import { mount } from '@vue/test-utils'
import i18nLocalVue from '@/tests/fixtures/localVueI18n'
import GamesHeader from '@/components/miles/games/GamesHeader'
import { GAME_STATUSES } from '@/constants/general'
import { getStarsFromClass } from '@/utils/gameHelpers'

const headerTitleSelector = 'header h2'
const statusButtonSelector = '.status-legend button'
const activeStatusButtonSelector = `${statusButtonSelector}.active-status`
const activeCheckIconSelector = '.q-icon.fa.fa-check.on-left'
const activeRatingButtonsSelector = '.q-rating i.q-icon.active'

const $router = {
  push: jest.fn()
}

const componentFactory = (status = '') => {
  const options = Object.assign(i18nLocalVue, {
    mocks: {
      $router,
      $route: {
        query: {
          status: status,
          category: ''
        }
      }
    },
    sync: false
  })
  return mount(GamesHeader, options)
}
describe('GamesHeader component', () => {
  describe('Mounted without status', () => {
    let wrapper
    beforeEach(() => {
      wrapper = componentFactory()
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('is an instance of Vue', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('shows correct header title text', () => {
      const headerTitle = wrapper.find(headerTitleSelector)
      expect(headerTitle.text()).toBe(wrapper.vm.$t('gamesIndexTitle'))
    })

    it('rating component has correct status class', () => {
      const ratingWrapper = wrapper.find('.q-rating[class^="status__"]')
      expect(ratingWrapper.exists()).toBe(false)
    })

    it('rating component has correct score', () => {
      const activeRatingButtons = wrapper.findAll(activeRatingButtonsSelector)
      expect(activeRatingButtons.length).toEqual(5)
    })

    it('all status buttons are rendered', () => {
      const allStatusButtons = wrapper.findAll(statusButtonSelector)
      expect(allStatusButtons.length).toEqual(7)
    })

    it('no status button is set to active', () => {
      const activeStatusButton = wrapper.find(activeStatusButtonSelector)
      const activeCheckIcons = wrapper.findAll(activeCheckIconSelector)
      expect(activeStatusButton.exists()).toBe(false)
      expect(activeCheckIcons.exists()).toBe(false)
    })
  })
  describe('Mounted with status', () => {
    Object.keys(GAME_STATUSES).forEach((key) => {
      const status = GAME_STATUSES[key]
      describe(status, () => {
        let wrapper
        beforeAll(() => {
          wrapper = componentFactory(status)
        })

        afterAll(() => {
          wrapper.destroy()
        })
        it('is an instance of Vue', () => {
          expect(wrapper.isVueInstance()).toBeTruthy()
        })

        it('shows correct header title text', () => {
          const headerTitle = wrapper.find(headerTitleSelector)
          expect(headerTitle.text()).toBe(wrapper.vm.$t(`gameStatus.${status}`))
        })

        it('rating component has correct status class', () => {
          const ratingWrapper = wrapper.find(`.q-rating.${status}`)
          expect(ratingWrapper.exists()).toBe(true)
        })

        it('rating component has correct score', () => {
          const activeRatingButtons = wrapper.findAll(activeRatingButtonsSelector)
          let stars = getStarsFromClass(status)
          if (stars === null) {
            stars = 0
          }
          expect(activeRatingButtons.length).toEqual(stars)
        })

        it('all status buttons are rendered', () => {
          const allStatusButtons = wrapper.findAll(statusButtonSelector)
          expect(allStatusButtons.length).toEqual(7)
        })

        it(`${status} button set to active`, () => {
          const activeStatusButton = wrapper.find(`${activeStatusButtonSelector}.${status}`)
          const activeCheckIcon = activeStatusButton.find(activeCheckIconSelector)
          const activeCheckIcons = wrapper.findAll(activeCheckIconSelector)
          expect(activeStatusButton.exists()).toBe(true)
          expect(activeCheckIcon.exists()).toBe(true)
          expect(activeCheckIcons.length).toEqual(1)
        })
      })
    })
  })
  describe('Toggle status', () => {
    Object.keys(GAME_STATUSES).forEach((key) => {
      const status = GAME_STATUSES[key]
      describe(status, () => {
        let wrapper
        beforeAll(() => {
          wrapper = componentFactory()
        })

        beforeEach(async () => {
          const button = wrapper.find(`${statusButtonSelector}.${status}`)
          await button.trigger('click')
        })

        afterAll(() => {
          wrapper.destroy()
        })

        it(`clicking ${status} button triggers correctly`, () => {
          expect($router.push).toHaveBeenCalledWith({
            path: '',
            query: {
              category: '',
              status: status
            }
          })
        })
      })
    })
  })
})
