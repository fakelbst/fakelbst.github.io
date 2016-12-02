import Vue from 'vue'
import Vuex from 'vuex'
import { mapState, mapMutations } from 'vuex'

import store from './vuex'
import appFooter from './Footer'
import appHeader from './Header'
import albumCube from './AlbumCube'
// import books from './Books'
import projects from './Projects'
import instagram from './Instagram'
import tags from './Tags'
import quotes from './Quotes'
import menus from './Menus'
import style from './style.css'
import scrollbar from './Components/scrollbar'

Vue.use(Vuex)
Vue.component('menus', menus)
Vue.component('scrollbar', scrollbar)

const Layout = Vue.extend({
  data() {
    return {
      style,
      zoomCurrenView: false,
    }
  },
  computed: mapState({
    modules: 'modules',
    currentView (state) {
      let cComponent = state.modules.filter( (obj) => {
        return obj.active === true
      })
      return cComponent[0].component
    },
    currentViewIndex (state) {
      return state.modules.findIndex( (obj) => {
        return obj.active === true
      })
    },
    tY (state) {
      let fullHeight = window.innerHeight
      if(this.zoomCurrenView) {
        if(this.currentViewIndex === 0){
          return 0
        }
        else if(this.currentViewIndex === this.modules.length - 1){
          return this.currentViewIndex * fullHeight - 300
        }
        else {
          return fullHeight - 100
        }
      }
      else {
        return this.currentViewIndex * 400
      }
      if(this.currentViewIndex - 1 === index) { //prev
        return this.currentViewIndex * 400
      }
      if(this.currentViewIndex + 1 === index) { //next
        return this.currentViewIndex * 400
      }
    }
  }),
  template: `<div>
    <menus></menus>
    <section v-bind:class="[style['slider'], style['scroll-content']]" v-bind:style="{transform: 'translateY(' + -tY + 'px)'}">
      <div v-bind:class="[style['slider-item'], item.active? style['current-view']: '', currentViewIndex-1 === index? style.prev: '', currentViewIndex+1 === index? style.next: '', (item.active && zoomCurrenView)? style.zoom: '']" v-for="(item, index) in modules" @click="moveContent(item)">
        <div v-bind:class="style['component-content']">
          <component v-bind:is="currentView" v-bind:class="[style['no-zoom']]">
          </component>
        </div>
        <div v-bind:class="style['title-wrap']">
          <h2 v-bind:class="[style.title, (item.active && !zoomCurrenView)? style.pop: '']">{{item.title}}</h2>
        </div>
      </div>
    </section>
  </div>`,
  methods: {
    moveContent (item) {
      store.commit('SET_MENU', item)
      let fullHeight = window.innerHeight
      if(item.active) {
        this.zoomCurrenView = !this.zoomCurrenView
      }
      else {
        this.zoomCurrenView = false
      }
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(Layout)
})

