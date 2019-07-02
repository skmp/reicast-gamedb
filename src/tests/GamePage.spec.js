import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import Game from '@/pages/Game.vue'
import appWindow from '@/store/window/'
import { SECTION_CLASSES } from '@/constants/general'

function shouldBooleanToText (expected) {
  if (expected === false) {
    return 'should not'
  }
  return 'should'
}

describe('Game page', () => {
  const localVue = createLocalVue()
  const gameList = require('@/games/.gameList.json')
  localVue.use(Vuex)
  Object.keys(gameList).forEach((gameIndex) => {
    // test only first 120 games**
    if (gameIndex < 120) {
      let wrapper
      let hasSection
      let sectionExpectationFailMsg
      let menuItemExpectationFailMsg
      beforeAll(() => {
        const currentGame = require(`@/games/${gameList[gameIndex].id}.json`)[0]
        const appWindowClone = cloneDeep(appWindow)
        wrapper = mount(
          Game, {
            localVue,
            store: new Vuex.Store({
              modules: {
                appWindow: appWindowClone,
                routing: {
                  state: {
                    currentGame: currentGame
                  }
                }
              }
            }),
            propsData: {
              gameListData: gameList[gameIndex]
            },
            mocks: {
              $t: () => 'dummy text'
            },
            sync: false
          }
        )
      })

      afterAll(() => {
        wrapper.destroy()
      })

      describe(gameList[gameIndex].id, () => {
        it('is an instance of Vue', () => {
          expect(wrapper.isVueInstance()).toBeTruthy()
        })
        Object.keys(SECTION_CLASSES).forEach((sectionKey) => {
          describe('Test all possible Game sections and corresponding menu items', () => {
            beforeAll(() => {
              const section = SECTION_CLASSES[sectionKey]
              hasSection = false
              if (wrapper.vm[section]) {
                hasSection = true
              }
              // toggle state that allows menu component to render
              wrapper.vm.$store.commit('setLoading', false)

              sectionExpectationFailMsg = `${section} section ${shouldBooleanToText(hasSection)} exist`
              menuItemExpectationFailMsg = `${section} menu item ${shouldBooleanToText(hasSection)} exist`
            })
            describe('Are they rendered? Should they be?', () => {
              it(`${SECTION_CLASSES[sectionKey]} section`, () => {
                expect(
                  wrapper.contains(`.section.${SECTION_CLASSES[sectionKey]}`),
                  sectionExpectationFailMsg
                ).toBe(hasSection)
              })
              it(`${SECTION_CLASSES[sectionKey]} menu item`, () => {
                expect(
                  wrapper.contains(`li[data-section="${SECTION_CLASSES[sectionKey]}"]`),
                  menuItemExpectationFailMsg
                ).toBe(hasSection)
              })
            })
          })
        })
      })
      // console.log(process.memoryUsage())
    }
  })
})

// **120 games - 2040 tests
// node process.memoryUsage()
// {
//   rss: 141508608,
//   heapTotal: 108457984,
//   heapUsed: 80488104,
//   external: 336854
// }
