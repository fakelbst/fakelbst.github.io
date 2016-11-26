import Vue from 'vue'
import style from './style.css'

export default {
  data() {
    return {
      style
    }
  },
  template: `<header>
    <!--h1>Mao Yijie</h1>
    <p>What year is this?</p>
    <nav>
      <router-link to="/">
        <div v-bind:class="style.red">
          <span>home</span>
        </div>
      </router-link>
      <router-link to="/books"><div v-bind:class="style.orange"><span>books</span></div></router-link>
      <router-link to="/projects"><div v-bind:class="style.yellow"><span>projects</span></div></router-link>
      <router-link to="/quotes"><div v-bind:class="style.green"><span>quotes</span></div></router-link>
      <router-link to="/inst"><div v-bind:class="style.blue"><span>Instagram</span></div></router-link>
      <router-link to=""><div v-bind:class="style.indigo"><span>&nbsp;</span></div></router-link>
      <router-link to="/about"><div v-bind:class="style.violet"><span>about</span></div></router-link>
    </nav-->
    <nav>
      <div v-bind:class="[style.column, style.red]"></div>
      <div v-bind:class="[style.column, style.orange]"></div>
      <div v-bind:class="[style.column, style.yellow]"></div>
      <div v-bind:class="[style.column, style.green]"></div>
      <div v-bind:class="[style.column, style.blue]"></div>
      <div v-bind:class="[style.column, style.indigo]"></div>
      <div v-bind:class="[style.column, style.violet]"></div>
    </nav>

  </header>`
}

