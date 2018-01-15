import { mapState, mapMutations } from 'vuex'
import style from './style.css'

export default {
  data() {
    return {
      style,
    }
  },
  computed: mapState([
    'modules',
  ]),
  template: ` <nav v-bind:class="style['menu']">
    <button v-for="(item, index) in modules" v-bind:class="[style['menu-item'], item.active? style['menu-item-current']: '']" @click="setActive(item)">
      <span v-bind:class="style.title">
        <span>{{item.title}}</span>
      </span>
    </button>
  </nav>`,
  methods: {
    ...mapMutations({
      setActive: 'SET_MENU',
    }),
  },
}

