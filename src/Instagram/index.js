import Vue from 'vue'
import VueResource from 'vue-resource'
import style from './style.css'
import fontello from '../fontello.css'

const Instagram = Vue.extend({
  data() {
    return {
      style,
      fontello,
      photos: []
    }
  },
  template: `<div class={{style.wrap}}>
    <div v-for="p in photos" class={{style.item}}>
      <div class={{style.images}} v-bind:style="{ backgroundImage: 'url(' + p.images.standard_resolution.url + ')' }"></div>
      <p>{{p.caption ? p.caption.text: ''}}</p>
      </div>
    </div>`,
  route: {
    activate: function(transition){
      let url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=287140978.f316052.2c964e349edc4fc7b2497e60ca88f2c3'

      Vue.http.jsonp(url, {
      }).then((d) => {
        console.log(d);
        this.photos = d.data.data

      })
      transition.next()
    }
  }
})


export default Instagram
