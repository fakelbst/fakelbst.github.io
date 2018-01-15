import Vue from 'vue'
import { mapState } from 'vuex'
import VueResource from 'vue-resource'
import fontello from './fontello.css'

import store from './vuex'
import menus from './Menus'
import style from './style.css'

Vue.use(VueResource)
Vue.component('menus', menus)

const Layout = Vue.extend({
  data() {
    return {
      style,
      fontello,
      scaleX: 1,
      scaleY: 1,
      zoomout: false,
      scrollYInZoomout: 0,
    }
  },
  computed: mapState({
    modules: 'modules',
    zoomCurrentView: 'zoomCurrentView',
    currentView(state) {
      const cComponent = state.modules.filter(obj => obj.active === true)
      return cComponent[0].component
    },
    currentViewIndex(state) {
      return state.modules.findIndex(obj => obj.active === true)
    },
    tY(state) {
      const fullHeight = window.innerHeight
      if (!this.zoomout) {
        if (this.zoomCurrentView) {
          if (this.currentViewIndex === 0) {
            return 0
          }
          return (((fullHeight - 300) + (100 * 2)) +
                  (fullHeight * (this.currentViewIndex - 1))) -
                  (200 * (this.currentViewIndex - 1))
        }
        return 400 + ((this.currentViewIndex - 1) * 444)
      }
      return this.scrollYInZoomout
    },
  }),
  watch: {
    zoomout(val) {
      if (!val) {
        this.scaleX = this.scaleY = 1
      } else {
        this.scaleX = this.scaleY = 0.5
      }
    },
  },
  template: `<div>
    <menus></menus>
    <span v-bind:class="style.small" v-on:click="toZoomout" v-show="!zoomCurrentView">
      <i v-bind:class="fontello['icon-th-large']"></i>
    </span>
    <section v-bind:class="[style['slider'], style['scroll-content']]" v-bind:style="{transform: 'matrix(' + scaleX + ', 0, 0,' + scaleY + ', 0,' + -tY + ')'}">
      <div v-bind:class="[style['slider-item'], (item.active || zoomout )? style['current-view']: '', (currentViewIndex-1 === index && !zoomout)? style.prev: '', (currentViewIndex+1 === index && !zoomout) ? style.next: '', (item.active && zoomCurrentView)? style.zoom: '']" v-for="(item, index) in modules" @click="moveContent(item)">
        <div v-bind:class="style['component-content']">
          <keep-alive>
            <component v-bind:is="item.component" v-bind:class="[zoomCurrentView? '': style['no-zoom']]" v-show="currentViewIndex === index">
            </component>
          </keep-alive>
        </div>
        <div v-bind:class="style['title-wrap']">
          <h2 v-bind:class="[style.title, ((item.active || zoomout) && !zoomCurrentView)? style.pop: '']">{{item.title}}</h2>
        </div>
      </div>
      <div v-bind:class="style.footer" v-show="zoomout">
        <p v-bind:class="style.email"><b>Contact me at:</b> myj226#gmail.com</p>
        <p v-bind:class="style.socials">
          <a href="http://douban.com/people/wber"><i v-bind:class="fontello['icon-douban']"></i></a>
          <a href="https://twitter.com/fakelbst"><i v-bind:class="fontello['icon-twitter']"></i></a>
          <a href="https://github.com/fakelbst"><i v-bind:class="fontello['icon-github']"></i></a>
          <a href="http://last.fm/user/fakelbst"><i v-bind:class="fontello['icon-lastfm']"></i></a>
          <a href="http://instagram.com/fakelbst"><i v-bind:class="fontello['icon-instagram']"></i></a>
        </p>
      </div>
    </section>
  </div>`,
  mounted() {
    function throttle(callback) {
      let wait = false
      return (...args) => {
        const context = this
        if (!wait) {
          callback.call(context, args)
          wait = true
          setTimeout(() => {
            wait = false
          }, 1500)
        }
      }
    }

    const scrollHandler = (evt) => {
      if (this.zoomCurrentView) return

      if (this.zoomout) {
        if (evt[0].deltaY > 0) {
          this.scrollYInZoomout += 300
        } else {
          this.scrollYInZoomout -= 300
        }
      } else {
        let toViewIndex = this.currentViewIndex
        if (evt[0].deltaY > 0) {
          if (this.currentViewIndex === this.modules.length) return
          toViewIndex += 1
        } else {
          if (this.currentViewIndex === 0) return
          toViewIndex -= 1
        }
        store.commit('SET_MENU', this.modules[toViewIndex])
      }
    }

    this.$el.addEventListener('DOMMouseScroll', throttle(scrollHandler), false)
    this.$el.addEventListener('mousewheel', throttle(scrollHandler), false)
  },
  methods: {
    moveContent(item) {
      store.commit('SET_MENU', item)
      if (item.active) {
        store.commit('SET_ZOOM', !this.zoomCurrentView)
      } else {
        store.commit('SET_ZOOM', false);
      }
    },
    toZoomout() {
      if (!this.zoomout) {
        this.scrollYInZoomout = 0
      }
      this.zoomout = !this.zoomout
    },
  },
})

/* eslint no-new: 0 */
new Vue({
  el: '#app',
  store,
  render: h => h(Layout),
})

