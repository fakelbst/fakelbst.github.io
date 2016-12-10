import style from './style.css'
import fontello from '../fontello.css'

export default {
  data() {
    return {
      style,
      fontello,
      scrollValue: 0,
      fullHeight: 0,
      projects: [{
        name: 'xlyrics',
        link: 'https://github.com/fakelbst/xlyrics',
        img: '',
        intro: 'A CLI Tool in Node.js. Check lyrics in terminal.',
        year: '2014',
      }, {
        name: 'viajc.com',
        link: 'http://www.viajc.com',
        intro: 'A website for firend\'s startup company.',
        img: '',
        year: '2014',
      }, {
        name: 'color-palettes',
        link: 'https://github.com/fakelbst/color-palettes',
        intro: 'Get colors from image with canvas.',
        img: '',
        year: '2016',
      }, {
        name: 'drumMachine',
        link: 'https://github.com/fakelbst/drumMachine',
        intro: 'Just have fun.',
        img: '',
        year: '2016',
      }, {
        name: 'albums-match',
        link: 'https://github.com/fakelbst/albums-match',
        intro: 'A link game link albums by same artists. Using last.fm api written in coffeescript.',
        year: '2014',
      }, {
        name: 'douying',
        link: 'https://www.microsoft.com/zh-cn/store/p/douying/9nblggh0k721',
        intro: 'Windows Phone app written in college. Using douban.com\'s movie api.',
        year: '2012',
      }, {
        name: 'dfb fans',
        link: 'https://www.microsoft.com/zh-cn/store/p/%E5%BE%B7%E8%BF%B7/9nblggh0k72b',
        intro: 'Windows Phone app written in college. All data from http://www.dfo.cn/',
        year: '2013',
      }],
    }
  },
  template: `<div>
    <div v-bind:class="style.wrap">
      <div v-for="p in projects" v-bind:class="style.project">
        <h2>{{p.name}}<span v-bind:class="style.year">({{p.year}})</span></h2>
        <a v-bind:class="style.link" v-bind:href="p.link" target="_blank">{{p.link}}</a>
        <p v-bind:class="style.intro">{{p.intro}}</p>
      </div>
    </div>
    <scrollbar v-on:scrolling="toScroll" :sy="scrollValue" :h="fullHeight" v-show="$store.state.zoomCurrentView"></scrollbar>
  </div>`,
  methods: {
    toScroll(v) {
      this.scrollValue = v
    },
  },
  updated() {
    this.fullHeight = this.$el.offsetHeight
  },
}

