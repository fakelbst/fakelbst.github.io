import Vue from 'vue'
import imagesLoaded from 'imagesloaded'
import { mapState, mapGetters, mapActions } from 'vuex'
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
      fullHeight: 0,
    }
  },
  computed: {
    ...mapState({
      zoom: 'zoomCurrentView',
      reading: 'reading',
      read: 'read',
    }),
    ...mapGetters([
      'currentViewItem',
    ]),
  },
  watch: {
    read() {
      this.showDatas('read')
    },
    zoom(val) {
      if (val) {
        this.showDatas('read')
        this.showDatas('reading')

        const scrollHandler = () => {
          if (Math.abs(this.scrollValue) >
              (this.$el.firstElementChild.clientHeight - window.innerHeight) &&
              this.loadingRead === false) {
            this.loadingRead = true
            this.getRead()
          }
        }

        this.$el.addEventListener('DOMMouseScroll', scrollHandler, false)
        this.$el.addEventListener('mousewheel', scrollHandler, false)
      } else {
        this.$el.querySelectorAll('[class*=__cover___]').forEach((el) => {
          el.classList.add(style.init)
          el.classList.remove(style['scale-animation'])
        })
      }
    },
  },
  template: `<div>
    <div v-bind:class="style['scroll-wrap']" v-show="zoom">
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
    <scrollbar v-on:scrolling="toScroll" :sy="scrollValue" :h="fullHeight" v-show="zoom && currentViewItem.title === 'books'"></scrollbar>
  </div>`,
  mounted() {
    this.getReading()
    this.getRead()
  },
  updated() {
    this.fullHeight = this.$el.offsetHeight
  },
  methods: {
    ...mapActions({
      getReading: 'getReading',
      getRead: 'getRead',
    }),
    showDatas(type) {
      imagesLoaded(this.$el.querySelector(`[class*=__${type}___]`), { background: '[class*=__cover___]' }, () => {
        if (type === 'reading') {
          this.loadingReading = false
        } else {
          this.loadingRead = false
        }
        this.$el.querySelectorAll(`[class*=__${type}___]>div>a>div`).forEach((el, i) => {
          setTimeout(() => {
            el.classList.remove(style.init)
            el.classList.add(style['scale-animation'])
          }, 50 * i);
        })
      })
    },
    toScroll(v) {
      this.scrollValue = v
    },
  },
}

