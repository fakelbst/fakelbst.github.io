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
      value: 0
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
              if(Math.abs(this.value) + window.innerHeight > el.offsetTop && el.offsetTop + el.clientHeight > Math.abs(this.value)){
                let toggleClass = function(){
                  el.classList.add(style['fade-animation'])
                }

                requestAnimationFrame(toggleClass)

              }
              else{
                el.classList.remove(style['fade-animation'])
                el.classList.add(style['fade-animation-init'])
              }
            })
          }

          document.querySelector('[class*=main-content]').addEventListener('DOMMouseScroll', throttle(scrollHandler), false)
          document.querySelector('[class*=main-content]').addEventListener('mousewheel', throttle(scrollHandler), false)
        });
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
    <scrollbar :sy.sync="value" v-show="!loading"></scrollbar>
    `,
  route: {
    activate: function(transition){
      let url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=287140978.f316052.2c964e349edc4fc7b2497e60ca88f2c3'
      Vue.http.jsonp(url, {
        params: {
          count: 8
        }
      }).then((d) => {
        this.photos = d.data.data
      })
      transition.next()
    }
  }
})

