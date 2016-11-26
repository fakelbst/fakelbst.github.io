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

const Layout = Vue.extend({
  // router,
  data() {
    return {
      style,
      scrollValue: 0,
    }
  },
  template: `<div v-bind:class="style.wrap">
    <menus></menus>
    <section v-bind:class="style['content']">
      <div v-bind:class="style.main">
        <p>Hello, there</p>
    
      </div>
    </section>
  </div>`,
  methods: {
    toScroll(v) {
      this.scrollValue = v
    }
  }

})

new Layout().$mount('#app')

