import Vue from 'vue'
import VueResource from 'vue-resource'
import THREE from 'three'
import style from './style.css'
import fontello from '../fontello.css'

Vue.use(VueResource)

const AlbumCube = Vue.extend({
  template: `<div class={{style.imgwrap}}>
      <div class={{style.row}}>
        <div class={{style.scroller}}>

          <div v-for="item in allAlbums" class={{style['img-inner']}} v-bind:style="{ backgroundImage: 'url(' + item.image + ')' }" v-on:click.prevent="select(item, $index, $event)"></div>
        </div>
      </div>
      <i class="{{fontello['icon-right-open']}} {{style['to-right']}} {{style['arrow-right']}}"></i>
    </div>

    <div class={{style.albumInfo}}>
      <p v-bind:style="{color: color1}">{{artist}}</p>
      <p v-bind:style="{color: color2}">{{title}}</p>
    </div>`,
  data() {
    return {
      style,
      fontello,
      artist: '',
      title: '',
      allAlbums: []
    }
  },
  ready() {

  },
  methods: {
    select: function(album, index, event){
      console.log(album, index, event);

      // let  = index
      // let translateString = `translate3d(0, ${scrollerTranslate}px, 0)`;
      // event.target.parentElement.style.transform = translateString;
      // event.target.classList.toggle(style['picker-item-selected']);
    }

  },
  route: {
    activate: function(transition){
      let that = this
      let APIkey = "4dff88a0423651b3570253b10b745b2c",
        Limit = 10,
        Page = 1,
        User = "fakelbst"

      Vue.http.get("http://ws.audioscrobbler.com/2.0/", {
        params: {
          method: 'user.gettopalbums',
          format: 'json',
          user: User,
          api_key: APIkey,
          limit: Limit,
          page: 1
        }
      }).then((d) => {
        let datas = d.json()
        let albums = datas.topalbums.album
        let src = albums[0].image[3]['#text']
        for(let i=0,j=albums.length; i<j; i++){
            let title = albums[i].name.split(' ').join('-')
            let ext = albums[i].image[3]['#text'].split('.').pop()
            that.allAlbums.push({file: title + '.' + ext, title: albums[i].name, artist: albums[i].artist.name, image: 'http://162.243.40.125/albums/' + title + '.' + ext})
        }
        console.log(that.allAlbums);
      })
      transition.next()
    }
  }

})

export default AlbumCube
