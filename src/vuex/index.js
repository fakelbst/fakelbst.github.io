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

const stateValues = {
  zoomCurrentView: false,
  modules: [
    { title: 'index', active: true, component: albumCube },
    { title: 'books', active: false, component: books },
    { title: 'tags', active: false, component: tags },
    { title: 'projects', active: false, component: projects },
    { title: 'quotes', active: false, component: quotes },
  ],
  tags: ['Front-end Developer', 'Werder Bremen', 'Bundesliga', 'Dallas Mavericks', 'Supernatural', 'Explosions in The Sky', 'Gig', 'HangZhou', 'Music Festival', 'Rock n\' Roll', 'Baskball', 'Guitar', 'Drummer', 'ukulele', 'fantast', 'Post-rock', 'Sigur Rós'],
  instagrams: [],
  reading: [],
  read: [],
  readPagination: 0,
  albums: [],
  albumsCoverBase64: [],
}

const getters = {
  currentViewItem(state) {
    return state.modules.find(obj => obj.active === true)
  },
}

const mutations = {
  SET_MENU(state, item) {
    state.modules = state.modules.map((obj) => {
      let value = {}
      if (item.title === obj.title) {
        value = Object.assign({}, item, { active: true })
      } else {
        value = Object.assign({}, obj, { active: false })
      }
      return value
    })
  },
  SET_ZOOM(state, playload) {
    state.zoomCurrentView = playload
  },
  SET_READING(state, playload) {
    state.reading = state.reading.concat(playload)
  },
  SET_READ(state, playload) {
    state.read = state.read.concat(playload)
  },
  ADD_READ_PAGINATION(state) {
    state.readPagination += 10
  },
  SET_ALBUMS(state, playload) {
    state.albums = playload
  },
  LOAD_COVER_BASE64(state, playload) {
    state.albumsCoverBase64.push(playload)
  },
}

const actions = {
  getReading({ commit }) {
    Vue.http.jsonp('https://api.douban.com/v2/book/user/wber/collections', {
      params: {
        status: 'reading',
        count: 10,
      },
    }).then((d) => {
      commit('SET_READING', d.data.collections)
    })
  },
  getRead({ commit, state }) {
    Vue.http.jsonp('https://api.douban.com/v2/book/user/wber/collections', {
      params: {
        status: 'read',
        count: 10,
        start: state.readPagination,
      },
    }).then((d) => {
      commit('SET_READ', d.data.collections)
      if (d.data.count <= 10) commit('ADD_READ_PAGINATION')
    })
  },
  getAlbums({ dispatch, commit }) {
    Vue.http.get('http://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'user.gettopalbums',
        format: 'json',
        user: 'fakelbst',
        api_key: '4dff88a0423651b3570253b10b745b2c',
        limit: 50,
        page: 1,
      },
    }).then((d) => {
      const datas = d.json()
      const albums = datas.topalbums.album
      commit('SET_ALBUMS', albums)
      dispatch('getImageDataUri', albums[0].image[3]['#text']).then((value) => {
        commit('LOAD_COVER_BASE64', value)
        dispatch('getImageDataUri', albums[1].image[3]['#text']).then((value2) => {
          commit('LOAD_COVER_BASE64', value2)
        })
      })
    })
  },
  getImageDataUri({ dispatch, commit }, url) {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = 'Anonymous'
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        canvas.getContext('2d').drawImage(image, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      image.src = url
    })
  },
}

export default new Vuex.Store({
  state: stateValues,
  getters,
  mutations,
  actions,
  strict: debug,
})

