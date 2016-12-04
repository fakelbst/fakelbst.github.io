import Vue from 'vue'
import Vuex from 'vuex'
import books from '../Books'
import tags from '../Tags'
import quotes from '../Quotes'
import projects from '../Projects'
import albumCube from '../AlbumCube'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

const state = {
  zoomCurrentView: false,
  modules: [
    {title: 'index', active: true, component: albumCube},
    {title: 'books', active: false, component: books},
    {title: 'tags', active: false, component: tags},
    {title: 'projects', active: false, component: projects},
    {title: 'quotes', active: false, component: quotes},
  ],
  tags: ['Front-end Developer', 'Werder Bremen', 'Bundesliga', 'Dallas Mavericks', 'Supernatural', 'Explosions in The Sky', 'Gig', 'HangZhou', 'Music Festival', 'Rock n\' Roll', 'Baskball', 'Guitar', 'Drummer', 'ukulele', 'fantast', 'Post-rock'],
  instagrams: [],
  reading: [],
  read: [],
  readPagination: 0,
  albums: [],
}

const getters = {
  currentViewItem (state) {
    return state.modules.find( (obj) => {
      return obj.active === true
    })
  }
}

const mutations = {
  SET_MENU (state, item) {
    state.modules = state.modules.map( (obj) => {
      return item.title === obj.title? Object.assign({}, item, {active: true}): Object.assign({}, obj, {active: false})
    })
  },
  SET_ZOOM (state, playload) {
    state.zoomCurrentView = playload
  },
  GET_INST_PHOTOS (state) {
  },
  SET_READING (state, playload) {
    state.reading = state.reading.concat(playload)
  },
  SET_READ (state, playload) {
    state.read = state.read.concat(playload)
  },
  ADD_READ_PAGINATION (state) {
    state.readPagination += 10
  },
  SET_ALBUMS (state, playload) {
    state.albums = playload
  },
}

const actions = {
  getReading ( {commit} ) {
    Vue.http.jsonp("https://api.douban.com/v2/book/user/wber/collections", {
      params: {
        status: 'reading',
        count: 10
      }
    }).then((d) => {
      commit('SET_READING', d.data.collections)
    })
  },
  getRead ( {commit, state} ) {
    Vue.http.jsonp("https://api.douban.com/v2/book/user/wber/collections", {
      params: {
        status: 'read',
        count: 10,
        start: state.readPagination
      }
    }).then((d) => {
      commit('SET_READ', d.data.collections)
      if(d.data.count <= 10) commit('ADD_READ_PAGINATION')
    })
  },
  getAlbums ({ commit }) {

    Vue.http.get("http://ws.audioscrobbler.com/2.0/", {
      params: {
        method: 'user.gettopalbums',
        format: 'json',
        user: 'fakelbst',
        api_key: '4dff88a0423651b3570253b10b745b2c',
        limit: 50,
        page: 1
      }
    }).then((d) => {
      let datas = d.json()
      let albums = datas.topalbums.album
      commit('SET_ALBUMS', albums)
    })

  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
})
