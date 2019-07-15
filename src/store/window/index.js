import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { WindowProps } from './../../models/Window'

const state = new WindowProps()

export default {
  mutations,
  getters,
  state,
  actions
}
