import Vue from 'vue'
import style from './style.css'
import scrollbar from '../Components/scrollbar'

export default {
  data() {
    return {
      style,
      activeIndex: 0
    }
  },
  template: ` <nav v-bind:class="style['menu']">
    <button v-bind:class="[style['menu-item'], activeIndex === 0? style['menu-item-current']: '']" @click="activeIndex = 0">
      <span v-bind:class="style.title">
        <span>index</span>
      </span>
    </button>
    <button v-bind:class="[style['menu-item'], activeIndex === 1? style['menu-item-current']: '']" @click="activeIndex = 1">
      <span v-bind:class="style.title">
        <span>albums</span>
      </span>
    </button>
    <button v-bind:class="[style['menu-item'], activeIndex === 2? style['menu-item-current']: '']" @click="activeIndex = 2">
      <span v-bind:class="style.title">
        <span>instagram</span>
      </span>
    </button>
    <button v-bind:class="[style['menu-item'], activeIndex === 3? style['menu-item-current']: '']" @click="activeIndex = 3">
      <span v-bind:class="style.title">
        <span>books</span>
      </span>
    </button>
    <button v-bind:class="[style['menu-item'], activeIndex ===  4? style['menu-item-current']: '']" @click="activeIndex = 4">
      <span v-bind:class="style.title">
        <span>about</span>
      </span>
    </button>
  </nav>`,
  methods: {
  }
}

