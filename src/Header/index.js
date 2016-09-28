import Vue from 'vue'
import style from './style.css'

const header = Vue.extend({
  data() {
    return {
      style
    }
  },
  template: `<header>
      <h1>Mao Yijie</h1>
      <p>What year is this?</p>
      <nav>
        <a v-link="{path: \'/\'}">
          <div class={{style.red}}>
            <span>home</span>
          </div>
        </a>
        <a v-link="{path: \'/books\'}"><div class={{style.orange}}><span>books</span></div></a>
        <a href="#"><div class={{style.yellow}}><span>&nbsp;</span></div></a>
        <a v-link="{path: \'/quotes\'}"><div class={{style.green}}><span>quotes</span></div></a>
        <a v-link="{path: \'/inst\'}"><div class={{style.blue}}><span>Instagram</span></div></a>
        <a href="#"><div class={{style.indigo}}><span>&nbsp;</span></div></a>
        <a v-link="{path: \'/about\'}"><div class={{style.violet}}><span>about</span></div></a>
      </nav>
    </header>`
})

export default header
