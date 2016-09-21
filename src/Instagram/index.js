import Vue from 'vue'
import VueResource from 'vue-resource'
import imagesLoaded from 'imagesloaded'
import style from './style.css'
import fontello from '../fontello.css'
import scrollbar from '../Components/scrollbar'

Vue.component('scrollbar', scrollbar)

export default Vue.extend({
  data() {
    return {
      style,
      fontello,
      loading: true,
      photos: [],
      scrollValue: 0,
      max_id: '',
      next: true
    }
  },
  watch: {
    photos: {
      handler: function(val, oldVal) {

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

        imagesLoaded( document.querySelector('[class*=__item__]'), {background: '[class*=__images__]'},  () => {
          this.loading = false

          let pics = document.querySelectorAll('[class*=__item__]')
          let scrollHandler = () => {
            pics.forEach( (el, i) => {
              if(Math.abs(this.scrollValue) + window.innerHeight > el.offsetTop && el.offsetTop + el.clientHeight > Math.abs(this.scrollValue)){
                let toggleClass = function(){
                  el.classList.add(style['fade-animation'])
                }
                requestAnimationFrame(toggleClass)
              }
            })

            if(Math.abs(this.scrollValue) > (document.querySelector('[class*=__wrap__]').clientHeight - window.innerHeight) && this.loading === false && this.next){
              this.loading = true
              this.getDatas()
            }
          }

          document.body.addEventListener('DOMMouseScroll', throttle(scrollHandler), false)
          document.body.addEventListener('mousewheel', scrollHandler, false)

        })
      }
    }
  },
  template: `<div class={{style.wrap}}>
    <div v-for="p in photos" class="{{style.item}} {{style['fade-animation-init']}}">
      <div class={{style.images}} v-bind:style="{ backgroundImage: 'url(' + p.images.standard_resolution.url + ')' }"></div>
      <p>{{p.caption ? p.caption.text: ''}}</p>
      </div>
    </div>
    <div class={{style.loading}} v-show="loading">
      <div class={{style.bar}}></div>
      <div class={{style.bar}}></div>
      <div class={{style.bar}}></div>
    </div>
    <scrollbar :sy.sync="scrollValue" v-show="!loading"></scrollbar>
    `,
  methods: {
    getDatas() {
      let url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=287140978.f316052.2c964e349edc4fc7b2497e60ca88f2c3'
      Vue.http.jsonp(url, {
        params: {
          count: 8,
          max_id: this.max_id
        }
      }).then((d) => {
        if(d.data.data.length === 0) this.next = false
        this.photos = this.photos.concat(d.data.data)
        this.max_id = d.data.data[d.data.data.length - 1].id
      })
    },
  },
  route: {
    activate: function(transition){
      this.getDatas()
      transition.next()
    }
  }
})

