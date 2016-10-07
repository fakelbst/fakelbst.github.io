import Vue from 'vue'
import Router from 'vue-router'
import appFooter from './Footer'
import appHeader from './Header'
import albumCube from './AlbumCube'
import books from './Books'
import projects from './Projects'
import instagram from './Instagram'
import about from './About'
import quotes from './Quotes'
import style from './style.css'

Vue.use(Router)

Vue.component('app-header', appHeader)
Vue.component('app-footer', appFooter)

const layout = Vue.extend({
  replace: false,
  data() {
    return {
      style
    }
  },
  template: `<div class={{style.wrapper}}>
    <div class={{style.sidebar}}>
      <app-header></app-header>
      <div class={{style.fake}}></div>
      <app-footer></app-footer>
    </div>
    <section class={{style['main-content']}}>
      <router-view></router-view>
    </section>`
})

const router = new Router({
  hashbang: false
})

router.map({
  '/': {
    component: albumCube
  },
  '/quotes': {
    component: quotes
  },
  '/inst': {
    component: instagram
  },
  '/books': {
    component: books
  },
  '/about': {
    component: about
  },
  '/projects': {
    component: projects
  }
})

router.start(layout, 'body')

