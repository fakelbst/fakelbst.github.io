import Vue from 'vue'
import style from './style.css'

export default {
  data() {
    return {
      style
    }
  },
  props: ['visible'],
  template: ` <div v-bind:class="style.loading" v-show="visible">
    <div v-bind:class="style.bar"></div>
    <div v-bind:class="style.bar"></div>
    <div v-bind:class="style.bar"></div>
  </div>`,
}

