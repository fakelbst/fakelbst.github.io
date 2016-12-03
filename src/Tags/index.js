import Vue from 'vue'
import style from './style.css'
import { mapState } from 'vuex'

export default {
  template: `<div v-bind:class="style.wrap">
    <ul v-bind:class="style.tags">
      <li v-for="t in shuffleTags()" v-bind:class="style.tag" v-bind:style="{fontSize: randomFontSize() + 'px'}" >{{t}}</li>
    </ul>
    </div> `,
  data() {
    return {
      style,
    }
  },
  computed: mapState({
    tags: 'tags'
  }),
  methods: {
    randomFontSize: function(){
      return Math.floor(Math.random() * 14) + 16;
    },
    shuffleTags: function(){
      let o = this.tags
      for(let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }
  }
}

