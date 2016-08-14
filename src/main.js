import Vue from 'vue'
import Router from 'vue-router'
import appFooter from './Footer'
import appHeader from './Header'
import albumCube from './AlbumCube'
import index from './Index'
import albums from './Albums'
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
    <svg class={{style.hidden}}>
      <defs>
        <!-- From Karen Menezes: https://www.smashingmagazine.com/2015/05/creating-responsive-shapes-with-clip-path/ -->
        <clipPath id="polygon-clip-rhomboid" clipPathUnits="objectBoundingBox">
          <polygon points="0 1, 0.3 0, 1 0, 0.7 1" />
        </clipPath>
      </defs>
    </svg>
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
  }
})

router.start(layout, 'body')

