import Vue from 'vue'
import VueRouter from 'vue-router'
import appFooter from './Footer'
import appHeader from './Header'
import albumCube from './AlbumCube'
import books from './Books'
import projects from './Projects'
import instagram from './Instagram'
import about from './About'
import quotes from './Quotes'
import style from './style.css'

Vue.use(VueRouter)

Vue.component('app-header', appHeader)
Vue.component('app-footer', appFooter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: albumCube },
    {path: '/quotes', component: quotes},
    {path: '/inst', component: instagram},
    {path: '/books', component: books},
    {path: '/about', component: about},
    {path: '/projects', component: projects},
  ]
})

const Layout = Vue.extend({
  router,
  data() {
    return {
      style
    }
  },
  template: `<div v-bind:class="style.wrapper">
    <div v-bind:class="style.sidebar">
      <app-header></app-header>
      <div v-bind:class="style.fake"></div>
      <app-footer></app-footer>
    </div>
    <section v-bind:class="style['main-content']">
      <router-view></router-view>
    </section>`
})

new Layout().$mount('#app')

