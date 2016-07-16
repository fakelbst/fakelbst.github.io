import Vue from 'vue'
import Router from 'vue-router'
import appFooter from './Footer'
import appHeader from './Header'
import albumCube from './AlbumCube'
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
    <app-header></app-header>
    <section class={{style['main-content']}}>
      <router-view></router-view>
    </section>
    <app-footer></app-footer>`
})

const router = new Router()

router.map({
  '/': {
    component: albumCube
  },
  '/quotes': {
    component: quotes
  }
})

router.start(layout, 'body')

