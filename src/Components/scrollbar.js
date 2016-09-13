import Vue from 'vue'
import style from './style.css'

export default Vue.extend({
  data() {
    return {
      style
    }
  },
  template: `<div class={{style.scrollbar}}>
      <div class={{style.drag}}></div>
    </div>`
})

