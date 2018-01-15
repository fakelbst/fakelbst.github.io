import { mapState } from 'vuex'
import style from './style.css'

export default {
  template: `<div v-bind:class="style.wrap">
    <ul v-bind:class="style.tags">
      <li v-for="t in randomTags" v-bind:class="style.tag" v-bind:style="{fontSize: randomFontSize() + 'px'}" >{{t}}</li>
    </ul>
    </div> `,
  data() {
    return {
      style,
    }
  },
  computed: {
    ...mapState([
      'tags',
    ]),
    randomTags(v) {
      const tagsClone = Object.assign([], this.tags)
      return tagsClone.sort(() => 0.5 - Math.random())
    },
  },
  methods: {
    randomFontSize() {
      return Math.floor(Math.random() * 14) + 16;
    },
  },
}

