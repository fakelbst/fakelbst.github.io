import Vue from 'vue'
import style from './style.css'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default Vue.extend({
  data() {
    return {
      style,
      reading: [],
      read: []
    }
  },
  template: `<div class={{style.wrap}}>
      <h3 class={{style.label}}>Reading</h3>
      <div class={{style.books}}>
        <div v-for="r in reading" class={{style.book}}>
          <div class={{style.cover}} v-bind:style="{ backgroundImage: 'url(' + r.book.images.large + ')' }"></div>
        </div>
      </div>

      <h3 class={{style.label}}>Read</h3>
      <div class={{style.books}}>
        <div v-for="r in read" class={{style.book}}>
          <div class={{style.cover}} v-bind:style="{ backgroundImage: 'url(' + r.book.images.large + ')' }"></div>
        </div>
      </div>

    </div>`,

  route: {
    activate: function(transition){

      Vue.http.jsonp("https://api.douban.com/v2/book/user/wber/collections", {
        params: {
          status: 'reading',
          count: 10
        }
      }).then((d) => {
        this.reading = d.data.collections
      })

      Vue.http.jsonp("https://api.douban.com/v2/book/user/wber/collections", {
        params: {
          status: 'read',
          count: 20
        }
      }).then((d) => {
        this.read = d.data.collections
      })

      transition.next()
    }
  }
})

