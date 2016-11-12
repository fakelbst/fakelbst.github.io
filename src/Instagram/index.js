import Vue from 'vue'
import VueResource from 'vue-resource'
import imagesLoaded from 'imagesloaded'
import style from './style.css'
import fontello from '../fontello.css'
import scrollbar from '../Components/scrollbar'
import loading from '../Components/loading'

Vue.component('scrollbar', scrollbar)
Vue.component('loading', loading)

export default {
  data() {
    return {
      style,
      fontello,
      loadingVisible: true,
      photos: [],
      scrollValue: 0,
      lastMaxId: '',
      maxId: '',
      next: true
    }
  },
  template: `<div>
  <div v-bind:class="style.wrap">
    <loading :visible="loadingVisible" v-if="photos.length === 0"></loading>
    <div v-for="p in photos" v-bind:class="[style.item, style['fade-animation-init']]">
      <div v-bind:class="style.images" v-bind:style="{ backgroundImage: 'url(' + p.images.standard_resolution.url + ')' }"></div>
      <p>{{p.caption ? p.caption.text: ''}}</p>
      </div>
      <loading :visible="loadingVisible" v-if="photos.length > 0"></loading>
    </div>
    <scrollbar v-on:scrolling="toScroll" :sy="scrollValue" v-show="!loadingVisible"></scrollbar>
  </div>`,
  updated: function(){

    function throttle (callback) {
      var wait = false
      return function () {
        if (!wait) {
          callback.call()
          wait = true
          setTimeout(function () {
            wait = false
          }, 100)
        }
      }
    }

     imagesLoaded( document.querySelector('[class*=__item___]'), {background: '[class*=__images___]'},  () => {

      let pics = document.querySelectorAll('[class*=__item__]')
      pics[0].classList.add(style['fade-animation'])

      let scrollHandler = () => {
        pics.forEach( (el, i) => {
          if(Math.abs(this.scrollValue) + window.innerHeight > el.offsetTop && el.offsetTop + el.clientHeight > Math.abs(this.scrollValue)){
            let toggleClass = function(){
              el.classList.add(style['fade-animation'])
            }
            requestAnimationFrame(toggleClass)
          }
        })

        if(Math.abs(this.scrollValue) > (document.querySelector('[class*=__wrap__]').clientHeight - window.innerHeight) && this.loadingVisible === false && this.maxId !== this.lastMaxId && this.next){
          this.getDatas()
        }
      }

      document.body.addEventListener('DOMMouseScroll', scrollHandler, false)
      document.body.addEventListener('mousewheel', scrollHandler, false)

     })

  },
  methods: {
    getDatas() {
      this.loadingVisible = true
      let url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=287140978.f316052.2c964e349edc4fc7b2497e60ca88f2c3'
      Vue.http.jsonp(url, {
        params: {
          count: 6,
          max_id: this.maxId
        }
      }).then((d) => {
        if(d.data.data.length === 0) this.next = false
        this.photos = this.photos.concat(d.data.data)
        this.lastMaxId = this.maxId
        this.maxId = d.data.data[d.data.data.length - 1].id
        this.loadingVisible = false
      })
    },
    toScroll(v) {
      this.scrollValue = v
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.getDatas()
    })
  }
}

