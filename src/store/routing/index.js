import { UPDATE } from '../mutation-types'

const mutations = {
  [UPDATE] (state, gameId) {
    const data = require(`../../games/${gameId}.json`)
    state.currentGame = data[0] // router.currentRoute.params.id
  }
}

const state = () => ({
  currentGame: {}
})

export default {
  namespaced: true,
  mutations,
  state
}
