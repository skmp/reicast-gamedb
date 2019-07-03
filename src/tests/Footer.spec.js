import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Footer from '@/components/common/Footer.vue'
import store from '@/store'

describe('Footer.vue', () => {
  let wrapper
  let copyrightEl
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    wrapper = mount(
      Footer, {
        store,
        sync: false,
        mocks: {
          $t: () => 'dummy text'
        }
      }
    )
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is an instance of Vue', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  describe('copyright element', () => {
    beforeEach(() => {
      copyrightEl = wrapper.find('.copyright')
    })
    it('it exists', () => {
      expect(copyrightEl.exists()).toBe(true)
    })
    it('it has correct innerHtml', () => {
      expect(copyrightEl.text().includes('dummy text'))
    })
  })
})
