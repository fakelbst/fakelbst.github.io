import Vue from 'vue'
import style from './style.css'

export default Vue.extend({
  data() {
    return {
      style
    }
  },
  props: ['visible'],
  template: ` <div class={{style.loading}} v-show="visible">
      <div class={{style.bar}}></div>
      <div class={{style.bar}}></div>
      <div class={{style.bar}}></div>
    </div>`,
  ready() {
  }
})

