import Vue from 'vue'
import imagesLoaded from 'imagesloaded'
import style from './style.css'
import scrollbar from '../Components/scrollbar'
import loading from '../Components/loading'

Vue.component('loading', loading)
Vue.component('scrollbar', scrollbar)

export default Vue.extend({
  data() {
    return {
      style,
      loadingReading: true,
      loadingRead: true,
      reading: [],
      read: [],
      scrollValue: 0
    }
  },
  template: `<div class={{style.wrap}}>
      <h3 class={{style.label}}>Reading</h3>
      <loading :visible.sync="loadingReading"></loading>
      <div class="{{style.books}} {{style.reading}}">
        <div v-for="r in reading" class={{style.book}}>
          <a href={{r.book.alt}} target="_blank" title={{r.book.alt_title}}>
            <div class="{{style.cover}} {{style.init}}" v-bind:style="{ backgroundImage: 'url(' + r.book.images.large + ')' }"></div>
          </a>
        </div>
      </div>

      <h3 class={{style.label}}>Read</h3>
      <loading :visible.sync="loadingRead"></loading>
      <div class="{{style.books}} {{style.read}}">
        <div v-for="r in read" class={{style.book}}>
          <a href={{r.book.alt}} target="_blank" title={{r.book.alt_title}}>
            <div class="{{style.cover}} {{style.init}}" v-bind:style="{ backgroundImage: 'url(' + r.book.images.large + ')' }"></div>
          </a>
        </div>
      </div>
    </div>
    <scrollbar :sy.sync="scrollValue" v-show="!loading"></scrollbar>
    `,

  route: {
    activate: function(transition){

      Vue.http.jsonp("https://api.douban.com/v2/book/user/wber/collections", {
        params: {
          status: 'reading',
          count: 10
        }
      }).then((d) => {
        this.reading = d.data.collections

        imagesLoaded( document.querySelector('[class*=__reading___]'), {background: '[class*=__cover___]'},  () => {
          this.loadingReading = false

          document.querySelectorAll('[class*=__reading___]>div>a>div').forEach( function(el, i){
            setTimeout(function() {
              el.classList.remove(style['init'])
              el.classList.add(style['scale-animation'])
            }, 20 * i);
          })
        })
      })

      Vue.http.jsonp("https://api.douban.com/v2/book/user/wber/collections", {
        params: {
          status: 'read',
          count: 20
        }
      }).then((d) => {
        this.read = d.data.collections

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

      transition.next()
    }
  }
})

