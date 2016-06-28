import Vue from 'vue'
import appFooter from './Footer'
import appHeader from './Header'
import albumCube from './AlbumCube'
import THREE from 'three'

const style = require('./style.css')

Vue.component('app-header', appHeader)
Vue.component('app-footer', appFooter)
Vue.component('album-cube', albumCube)

const layout = Vue.extend({
  template: '<div class="' + style.wrapper + '">' +
    '<app-header></app-header>' + 
    '<section class="' + style['main-content'] + '">' +
      '<album-cube></album-cube>' + 
    '</section>' +
    '<app-footer></app-footer>'
})

Vue.component('app', layout)

new Vue({
  el: 'body',
  components: { layout }
})


