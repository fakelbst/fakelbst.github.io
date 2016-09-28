import Vue from 'vue'
import style from './style.css'
// import scrollbar from '../Components/scrollbar'

// Vue.component('scrollbar', scrollbar)

export default Vue.extend({
  template: `<div class={{style.wrap}}>
    <!--img src="/static/about-bg.jpg" alt=""-->
    <!--div class={{style.bg}}></div-->
    <ul class={{style.tags}}>
      <li v-for="t in shuffleTags()" class={{style.tag}} v-bind:style="{fontSize: randomFontSize() + 'px'}" >{{t}}</li>
    </ul>
    </div> `,
  data() {
    return {
      style,
      hide: false,
      tags: ['Front-end Developer', 'Werder Bremen', 'Bundesliga', 'Dallas Mavericks', 'Supernatural', 'Explosions in The Sky', 'Gig', 'HangZhou', 'Music Festival', 'Rock n\' Roll', 'Baskball', 'Guitar', 'Drummer', 'ukulele', 'fantast']
    }
  },
  methods: {
    randomFontSize: function(){
      return Math.floor(Math.random() * 14) + 16;
    },
    shuffleTags: function(){
      let o = this.tags
      for(let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    },
    focus: function($event){
      console.log($event);
      let el = $event.target
      el.style.mixBlendMode = 'multiply'
      el.style.background = '#1e2021'
      el.style.color = 'transparent'
    },
    // leave: function($event){
    //   console.log($event, 2222);
    //   this.hide = false
    // }
  }
})

