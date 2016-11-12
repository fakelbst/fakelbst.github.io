import Vue from 'vue'
import VueResource from 'vue-resource'
import colorPalettes from 'color-palettes'
import style from './style.css'
import fontello from '../fontello.css'
const THREE = require('three')

Vue.use(VueResource)

export default {
  template: `<div v-bind:class="style['main-wrapper']">
    <div v-bind:class="style.main" id="main"></div>
    <i v-bind:class="[fontello['icon-right-open'], style['to-right'], style['arrow-right']]" v-on:click="loadTexture()"></i>
    <div v-bind:class="style.albumInfo">
      <p v-bind:style="{color: color1}">{{artist}}</p>
      <p v-bind:style="{color: color2}">{{title}}</p>
    </div>
  </div>`,
  data() {
    return {
      style,
      fontello,
      artist: '',
      title: '',
      color1: '#333',
      color2: '#333',
      cube: {},
      renderer: {},
      material: {},
      allAlbums: []
    }
  },
  mounted() {
    let that = this
    let scene, camera, stats, cameraControl

    function init() {

      THREE.ImageUtils.crossOrigin = ''
      scene = new THREE.Scene()

      camera = new THREE.PerspectiveCamera(35, document.querySelector('[class*=main-content]').offsetWidth / window.innerHeight, 0.1, 1000)

      that.renderer = new THREE.WebGLRenderer()
      that.renderer.setClearColor(0x1e2021, 1.0)
      that.renderer.setSize(document.querySelector('[class*=main-content]').offsetWidth, window.innerHeight - 10)
      that.renderer.shadowMap.enabled = true

      document.getElementById('main').appendChild(that.renderer.domElement)

      var ambientLight = new THREE.AmbientLight( 0x000000 )
      scene.add( ambientLight )

      var lights = []
      lights[0] = new THREE.PointLight( 0xffffff, 1, 0 )
      lights[1] = new THREE.PointLight( 0xffffff, 1, 0 )
      lights[2] = new THREE.PointLight( 0xffffff, 1, 0 )
      lights[0].position.set( 0, 200, 0 )
      lights[1].position.set( 100, 200, 100 )
      lights[2].position.set( -100, -200, -100 )

      scene.add( lights[0] )
      scene.add( lights[1] )
      scene.add( lights[2] )

      let geometry = new THREE.BoxGeometry( 1, 1, 1 )
      that.material = new THREE.MeshLambertMaterial({color: 0x6C6C6C, transparent: true, opacity: 0.7})
      that.cube = new THREE.Mesh( geometry, that.material )
      scene.add( that.cube )
      camera.position.z = 5
      render()
    }

    function render() {
      requestAnimationFrame( render )
      that.cube.rotation.x += 0.01
      that.cube.rotation.y += 0.01
      that.renderer.render( scene, camera )
    }

    function handleResize() {
      camera.aspect = document.querySelector('[class*=main-content]').offsetWidth / window.innerHeight
      camera.updateProjectionMatrix()
      that.renderer.setSize(document.querySelector('[class*=main-content]').offsetWidth, window.innerHeight - 10)
    }

    setTimeout( init, 200)
    window.addEventListener('resize', handleResize, false)

  },
  methods: {

    loadTexture: function() {
      let loader = new THREE.TextureLoader()

      let album = this.allAlbums.shift()
      this.allAlbums.push(album.file)
      loader.load(
        '/static/albums/' + album.file,
        ( texture ) => {
          this.cube.material.map = texture
          this.material.needsUpdate = true
        },
        ( xhr ) => {
          let url = '/static/albums/' + album.file
          let cp = new colorPalettes(url)
          cp.dominantThree({
            format: 'hex'
          }).then( (colors) => {
            this.renderer.setClearColor(parseInt(colors[0], 16), 1.0)
            document.body.style.background = '#' + colors[0]
            document.body.style.color = '#' + colors[1]
            document.getElementsByTagName('header')[0].firstElementChild.style.color = '#' + colors[2]
            let footers = document.querySelectorAll('footer p')
            footers.forEach(elem => elem.style.color = '#' + colors[2])
            this.title = album.title
            this.artist = album.artist
            this.color1 = '#' + colors[2]
            this.color2 = '#' + colors[1]
          })
        },
        function ( xhr ) {
          console.log( 'An error happened' )
        }
      )
    }
  },
  beforeRouteEnter (to, from, next){
    next(vm => {
      let APIkey = "4dff88a0423651b3570253b10b745b2c",
        Limit = 100,
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
            vm.allAlbums.push({file: title + '.' + ext, title: albums[i].name, artist: albums[i].artist.name})
        }
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    // TODO: add some animation
    document.body.style.background = '#1e2021'
    document.body.style.color = '#e8e8e8'
    document.getElementsByTagName('header')[0].firstElementChild.style.color = '#e8e8e8'
    let footers = document.querySelectorAll('footer p')
    footers.forEach(elem => elem.style.color = '#e8e8e8')

    next()
  }
}

