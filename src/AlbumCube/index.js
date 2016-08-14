import Vue from 'vue'
import VueResource from 'vue-resource'
import THREE from 'three'
import style from './style.css'
import fontello from '../fontello.css'

Vue.use(VueResource)

const AlbumCube = Vue.extend({
  template: `<div class={{style.main}} id="main"></div>
    <i class="{{fontello['icon-right-open']}} {{style['to-right']}} {{style['arrow-right']}}" v-on:click="loadTexture()"></i>
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
      color1: '#333',
      color2: '#333',
      cube: {},
      renderer: {},
      material: {},
      allAlbums: []
    }
  },
  ready() {
    let that = this
    let scene, camera, stats, cameraControl

    function init() {

      THREE.ImageUtils.crossOrigin = ''
      scene = new THREE.Scene()

      camera = new THREE.PerspectiveCamera(35,  document.getElementById('main').offsetWidth / window.innerHeight, 0.1, 1000)

      that.renderer = new THREE.WebGLRenderer()
      that.renderer.setClearColor(0x1e2021, 1.0)
      that.renderer.setSize(document.getElementById('main').offsetWidth, window.innerHeight - 10)
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
      camera.aspect = document.getElementById('main').offsetWidth / window.innerHeight
      camera.updateProjectionMatrix()
      that.renderer.setSize(document.getElementById('main').offsetWidth, window.innerHeight - 10)
    }

    init()
    window.addEventListener('resize', handleResize, false)

  },
  methods: {

    loadTexture: function() {
      let that = this
      let loader = new THREE.TextureLoader()

      function componentToHex(c) {
        var hex = c.toString(16)
        return hex.length == 1 ? "0" + hex : hex
      }

      function rgbToHex(rgb) {
        let c = ''
        for(let i=0; i<3; i++){
          c += componentToHex(rgb[i])
        }
        return c
      }

      let album = that.allAlbums.shift()
      that.allAlbums.push(album.file)
      loader.load(
        '/static/albums/' + album.file,
        ( texture ) => {
          that.cube.material.map = texture
          that.material.needsUpdate = true
        },
        ( xhr ) => {
          let url = '/static/albums/' + album.file
          let albumColors = new AlbumColors(url)

          albumColors.getColors(function(colors) {
            that.renderer.setClearColor(parseInt(rgbToHex(colors[0]), 16), 1.0)
            document.body.style.background = '#'+rgbToHex(colors[0])
            document.body.style.color = '#'+rgbToHex(colors[1])
            document.getElementsByTagName('header')[0].firstElementChild.style.color = '#'+rgbToHex(colors[2])
            let footers = document.querySelectorAll('footer p')
            footers.forEach(elem => elem.style.color = '#'+rgbToHex(colors[2]))
            that.title = album.title
            that.artist = album.artist
            that.color1 = '#'+rgbToHex(colors[2])
            that.color2 = '#'+rgbToHex(colors[1])
          })
        },
        function ( xhr ) {
          console.log( 'An error happened' )
        }
      )
    }
  },
  route: {
    data: function(transition){
      let that = this
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
            that.allAlbums.push({file: title + '.' + ext, title: albums[i].name, artist: albums[i].artist.name})
        }
      })
      transition.next()
    }
  }

})

export default AlbumCube
