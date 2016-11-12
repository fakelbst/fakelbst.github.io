import Vue from 'vue'
import imagesLoaded from 'imagesloaded'
import style from './style.css'
import scrollbar from '../Components/scrollbar'
import loading from '../Components/loading'

Vue.component('loading', loading)
Vue.component('scrollbar', scrollbar)

export default {
  data() {
    return {
      style,
      loadingReading: true,
      loadingRead: true,
      reading: [],
      read: [],
      scrollValue: 0,
      start: 0
    }
  },
  template: `<div>
    <div v-bind:class="style.wrap">
      <h3 v-bind:class="style.label">Reading</h3>
      <loading :visible="loadingReading"></loading>
      <div v-bind:class="[style.books, style.reading]">
        <div v-for="r in reading" v-bind:class="style.book">
          <a v-bind:href="r.book.alt" target="_blank" v-bind:title="r.book.alt_title">
            <div v-bind:class="[style.cover, style.init]" v-bind:style="{ backgroundImage: 'url(' + r.book.images.large + ')' }"></div>
          </a>
        </div>
      </div>

      <h3 v-bind:class="style.label">Read</h3>
      <div v-bind:class="[style.books, style.read]">
        <div v-for="r in read" v-bind:class="style.book">
          <a v-bind:href="r.book.alt" target="_blank" v-bind:title="r.book.alt_title">
            <div v-bind:class="[style.cover, style.init]" v-bind:style="{ backgroundImage: 'url(' + r.book.images.large + ')' }"></div>
          </a>
        </div>
      </div>
      <loading :visible="loadingRead"></loading>
    </div>
    <scrollbar v-on:scrolling="toScroll" :sy="scrollValue"></scrollbar>
  </div>`,
  mounted() {
    let scrollHandler = () => {

      if(Math.abs(this.scrollValue) > (document.querySelector('[class*=__wrap__]').clientHeight - window.innerHeight) && this.loadingRead === false){
        this.loadingRead = true
        this.getRead()
      }
    }

    document.body.addEventListener('DOMMouseScroll', scrollHandler, false)
    document.body.addEventListener('mousewheel', scrollHandler, false)
  },
  methods: {
    getRead() {
      Vue.http.jsonp("https://api.douban.com/v2/book/user/wber/collections", {
        params: {
          status: 'read',
          count: 20,
          start: this.start
        }
      }).then((d) => {
        this.read = this.read.concat(d.data.collections)
        this.start += 20

        imagesLoaded( document.querySelector('[class*=__read___]'), {background: '[class*=__cover___]'},  () => {
          this.loadingRead = false

          document.querySelectorAll('[class*=__read___]>div>a>div').forEach( function(el, i){
            setTimeout(function() {
              el.classList.remove(style['init'])
              el.classList.add(style['scale-animation'])
            }, 50 * i);
          })
        })
      })
    },
    toScroll(v) {
      this.scrollValue = v
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      console.log(9999);
      Vue.http.jsonp("https://api.douban.com/v2/book/user/wber/collections", {
        params: {
          status: 'reading',
          count: 10
        }
      }).then((d) => {
        vm.reading = d.data.collections

        imagesLoaded( document.querySelector('[class*=__reading___]'), {background: '[class*=__cover___]'},  () => {
          vm.loadingReading = false

          document.querySelectorAll('[class*=__reading___]>div>a>div').forEach( function(el, i){
            setTimeout(function() {
              el.classList.remove(style['init'])
              el.classList.add(style['scale-animation'])
            }, 20 * i);
          })
        })
      })
      vm.getRead()
    })
  },
}

