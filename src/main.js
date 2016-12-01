import Vue from 'vue'
import appFooter from './Footer'
import appHeader from './Header'
import albumCube from './AlbumCube'
import books from './Books'
import projects from './Projects'
import instagram from './Instagram'
import tags from './Tags'
import quotes from './Quotes'
import menus from './Menus'
import style from './style.css'
import scrollbar from './Components/scrollbar'

Vue.component('menus', menus)
Vue.component('scrollbar', scrollbar)

// const modules = [
//   {component: ''},
//   {component: books},
//   {component: albumCube},
// ]

const Layout = Vue.extend({
  data() {
    return {
      style,
      currentView: 0,
      zoomCurrenView: false,
      movingNext: false,
      modules: [
        {c: 'index'},
        {c: 'books'},
        {c: 'albumCube'},
      ],
      tY: 0,
    }
  },
  computed: {

  },
  template: `<div v-bind:class="style.wrap">
    <menus></menus>
    <section v-bind:class="[style['slider'], style['scroll-content']]"  v-bind:style="{transform: 'translateY(' + -tY + 'px)'}">
      <div v-bind:class="[style['slider-item'], currentView===index? style['current-view']: '', currentView-1 === index? style.prev: '', currentView+1 === index? style.next: '', (currentView===index && zoomCurrenView)? style.zoom: '']" v-for="(item, index) in modules" @click="moveContent($event, index)">
          <div v-bind:class="style['title-wrap']">
            <h2 v-bind:class="[style.title, currentView === index? style.pop: '']">{{item.c}}</h2>
          </div>
      </div>
    </section>
  </div>`,
  methods: {
    moveContent (event, index) {
      let fullHeight = window.innerHeight
      if(index === this.currentView) {
        this.zoomCurrenView = !this.zoomCurrenView

        if(this.zoomCurrenView) {

          if(this.currentView === 0){
            this.tY = 0
          }
          else if(this.currentView === this.modules.length - 1){
            this.tY = this.currentView * fullHeight - 300
          }
          else {
            this.tY = fullHeight - 100
          }

        }
        else {
          this.tY = this.currentView * 400
        }
      }
      else {
        this.zoomCurrenView = false
      }
      if(this.currentView - 1 === index) { //prev
        this.currentView--
        this.tY = this.currentView * 400
      }
      if(this.currentView + 1 === index) { //next
        this.currentView++
        this.tY = this.currentView * 400
      }
    }
  }
})

new Layout().$mount('#app')

