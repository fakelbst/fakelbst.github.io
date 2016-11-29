import Vue from 'vue'
// import VueRouter from 'vue-router'
import appFooter from './Footer'
import appHeader from './Header'
import albumCube from './AlbumCube'
import books from './Books'
import projects from './Projects'
import instagram from './Instagram'
import about from './About'
import quotes from './Quotes'
import menus from './Menus'
import style from './style.css'
import scrollbar from './Components/scrollbar'

// Vue.use(VueRouter)

// Vue.component('app-header', appHeader)
// Vue.component('app-footer', appFooter)
Vue.component('menus', menus)
Vue.component('scrollbar', scrollbar)

// const router = new VueRouter({
//   routes: [
//     {path: '/', component: menus },
//     {path: '/quotes', component: quotes},
//     {path: '/inst', component: instagram},
//     {path: '/books', component: books},
//     {path: '/about', component: about},
//     {path: '/projects', component: projects},
//   ]
// })
//
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
        <div v-if="index === currentView">
          <p>{{item.c}}</p>
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
          this.tY = fullHeight - 100
        }
        else {
          this.tY = this.currentView * 400
        }
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

