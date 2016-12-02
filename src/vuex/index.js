import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

// const GET_INST_PHOTOS = 'GET_INST_PHOTOS'
// const GET_READING = 'GET_READING'

const state = {
  modules: [
    {title: 'index', active: true},
    {title: 'books', active: false},
    {title: 'albums', active: false},
  ],
  tags: ['Front-end Developer', 'Werder Bremen', 'Bundesliga', 'Dallas Mavericks', 'Supernatural', 'Explosions in The Sky', 'Gig', 'HangZhou', 'Music Festival', 'Rock n\' Roll', 'Baskball', 'Guitar', 'Drummer', 'ukulele', 'fantast', 'Post-rock'],
  instagrams: [],
  books: []
}

const mutations = {
  SET_MENU (state, item) {
    state.modules = state.modules.map( (obj) => {
      return item.title === obj.title? Object.assign({}, item, {active: true}): Object.assign({}, obj, {active: false})
    })
  },
  GET_INST_PHOTOS (state) {
  },
  GET_READING (state) {
  }
}

export default new Vuex.Store({
  state,
  mutations,
  strict: debug,
})
