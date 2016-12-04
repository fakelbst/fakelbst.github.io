import Vue from 'vue'
import VueResource from 'vue-resource'
import { mapState, mapMutations } from 'vuex'

import store from './vuex'
// import projects from './Projects'
// import instagram from './Instagram'
import menus from './Menus'
import style from './style.css'

Vue.use(VueResource)
Vue.component('menus', menus)

const Layout = Vue.extend({
  data() {
    return {
      style,
    }
  },
  computed: mapState({
    modules: 'modules',
    zoomCurrentView: 'zoomCurrentView',
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
      if(this.zoomCurrentView) {
        if(this.currentViewIndex === 0){
          return 0
        }
        else {
          return (fullHeight - 300 + 100 * 2) + fullHeight * (this.currentViewIndex - 1) - 200 * (this.currentViewIndex - 1)
        }
      }
      else {
        return 400 + (this.currentViewIndex - 1) * 444
      }
    }
  }),
  template: `<div>
    <menus></menus>
    <section v-bind:class="[style['slider'], style['scroll-content']]" v-bind:style="{transform: 'translateY(' + -tY + 'px)'}">
      <div v-bind:class="[style['slider-item'], item.active? style['current-view']: '', currentViewIndex-1 === index? style.prev: '', currentViewIndex+1 === index? style.next: '', (item.active && zoomCurrentView)? style.zoom: '']" v-for="(item, index) in modules" @click="moveContent(item)">
        <div v-bind:class="style['component-content']">
          <keep-alive>
            <component v-bind:is="item.component" v-bind:class="[zoomCurrentView? '': style['no-zoom']]" v-show="currentViewIndex === index">
            </component>
          </keep-alive>
        </div>
        <div v-bind:class="style['title-wrap']">
          <h2 v-bind:class="[style.title, (item.active && !zoomCurrentView)? style.pop: '']">{{item.title}}</h2>
        </div>
      </div>
    </section>
  </div>`,
  methods: {
    moveContent (item) {
      store.commit('SET_MENU', item)
      let fullHeight = window.innerHeight
      if(item.active) {
        store.commit('SET_ZOOM', !this.zoomCurrentView);
      }
      else {
        store.commit('SET_ZOOM', false);
      }
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(Layout)
})

