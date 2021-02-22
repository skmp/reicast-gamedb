import { UPDATE, SET_GAMES } from '../mutation-types'

import { FETCH_GAME, GET_GAME, GET_GAMES } from '../action-types'

import axios from 'axios'
import { Loading } from 'quasar'

const mutations = {
  [UPDATE] (state, game) {
    state.currentGame = game
  },
  [SET_GAMES] (state, games) {
    state.games = games
  }
}

const actions = {
  async [GET_GAME] ({ dispatch, commit, state }, gameId) {
    Loading.show()
    const games = state.games
    try {
      if (games.length === 0) {
        const response = await dispatch(FETCH_GAME, gameId)
        commit(UPDATE, response.data)
        return true
      }

      commit(UPDATE, games.filter(game => game.id === gameId)[0])
      return true
    } catch (e) {
      // TODO: error handling
      console.log(e)
    } finally {
      Loading.hide()
    }
  },
  [FETCH_GAME] ({ state }, gameId) {
    try {
      return axios.get(`https://api.reicast.com/games?slug=${gameId}`)
    } catch (e) {
      // TODO: error handling
      console.log(e)
    }
  },
  async [GET_GAMES] ({ commit }) {
    Loading.show()
    try {
      const response = await axios.get('https://api.reicast.com/games')
      commit(SET_GAMES, response.data)
    } catch (e) {
      // TODO: error handling
      console.log(e)
    } finally {
      Loading.hide()
    }
  }
}

const state = () => ({
  currentGame: {},
  games: []
})

export default {
  namespaced: true,
  mutations,
  actions,
  state
}
