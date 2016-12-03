import Vue from 'vue'
import imagesLoaded from 'imagesloaded'
import { mapState, mapActions } from 'vuex'
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
      scrollValue: 0,
      fullHeight: 0
    }
  },
  computed: mapState({
    zoom: 'zoomCurrenView',
    reading: 'reading',
    read: 'read'
  }),
  watch: {
    zoom: function(val){
      if(val) {
        imagesLoaded( document.querySelector('[class*=__reading___]'), {background: '[class*=__cover___]'},  () => {
          this.loadingReading = false
          document.querySelectorAll('[class*=__reading___]>div>a>div').forEach( function(el, i){
            setTimeout(function() {
              el.classList.remove(style['init'])
              el.classList.add(style['scale-animation'])
            }, 50 * i);
          })
        })

        imagesLoaded( document.querySelector('[class*=__read___]'), {background: '[class*=__cover___]'},  () => {
          this.loadingRead = false

          document.querySelectorAll('[class*=__read___]>div>a>div').forEach( function(el, i){
            setTimeout(function() {
              el.classList.remove(style['init'])
              el.classList.add(style['scale-animation'])
            }, 50 * i);
          })
        })

        let scrollHandler = () => {
          if(Math.abs(this.scrollValue) > (document.querySelector('[class*=__scroll-wrap__]').clientHeight - window.innerHeight) && this.loadingRead === false){
            this.loadingRead = true
            this.getRead()
          }
        }

        document.body.addEventListener('DOMMouseScroll', scrollHandler, false)
        document.body.addEventListener('mousewheel', scrollHandler, false)


      }
      else {
        document.querySelectorAll('[class*=__reading___]>div>a>div').forEach( function(el, i){
          el.classList.add(style['init'])
          el.classList.remove(style['scale-animation'])
        })

        document.querySelectorAll('[class*=__read___]>div>a>div').forEach( function(el, i){
          el.classList.add(style['init'])
          el.classList.remove(style['scale-animation'])
        })
      }
    }
  },
  template: `<div v-show="zoom">
    <div v-bind:class="style['scroll-wrap']">
      <div v-bind:class="style['title-wrap']">
        <h3 v-bind:class="[style.label, zoom? style.pop: '']">Reading</h3>
      </div>
      <loading :visible="loadingReading"></loading>
      <div v-bind:class="[style.books, style.reading]">
        <div v-for="r in reading" v-bind:class="style.book">
          <a v-bind:href="r.book.alt" target="_blank" v-bind:title="r.book.alt_title">
            <div v-bind:class="[style.cover, style.init]" v-bind:style="{ backgroundImage: 'url(' + r.book.images.large + ')' }"></div>
          </a>
        </div>
      </div>

      <div v-bind:class="style['title-wrap']">
        <h3 v-bind:class="[style.label, zoom? style.pop: '']">Read</h3>
      </div>
      <div v-bind:class="[style.books, style.read]">
        <div v-for="r in read" v-bind:class="style.book">
          <a v-bind:href="r.book.alt" target="_blank" v-bind:title="r.book.alt_title">
            <div v-bind:class="[style.cover, style.init]" v-bind:style="{ backgroundImage: 'url(' + r.book.images.large + ')' }"></div>
          </a>
        </div>
      </div>
      <loading :visible="loadingRead"></loading>
    </div>
    <scrollbar v-on:scrolling="toScroll" :sy="scrollValue" :h="fullHeight" v-show="zoom"></scrollbar>
  </div>`,
  mounted () {
    this.getReading()
    this.getRead()
  },
  updated () {
    this.fullHeight = this.$el.offsetHeight
  },
  methods: {
    ...mapActions({
      getReading: 'getReading',
      getRead: 'getRead',
    }),
    toScroll(v) {
      this.scrollValue = v
    },
  },
}

