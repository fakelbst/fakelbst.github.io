import Vue from 'vue'
import style from './style.css'
import fontello from '../fontello.css'

const Footer = Vue.extend({
  data() {
    return {
      style,
      fontello
    }
  },
  template: `<footer>
      <a href="http://douban.com/people/wber"><p><i class={{fontello['icon-douban']}}></i></p></a>
      <a href="https://twitter.com/fakelbst"><p><i class={{fontello['icon-twitter-bird']}}></i></p></a>
      <a href="https://github.com/fakelbst"><p><i class={{fontello['icon-github']}}></i></p></a>
      <a href="http://weibo.com/wher"><p><i class={{fontello['icon-weibo']}}></i></p></a>
      <a href="https://www.facebook.com/fakelbst"><p><i class={{fontello['icon-facebook-rect']}}></i></p></a>
      <a href="http://last.fm/user/fakelbst"><p><i class={{fontello['icon-lastfm']}}></i></p></a>
      <a href="http://instagram.com/fakelbst"><p><i class={{fontello['icon-instagram']}}></i></p></a>
      <a href="http://fakelbst.tubmlr.com/"><p><i class={{fontello['icon-tumblr-rect']}}></i></p></a>
    </footer>`
})

export default Footer
