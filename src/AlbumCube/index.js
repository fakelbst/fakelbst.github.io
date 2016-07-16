import Vue from 'vue'
import VueResource from 'vue-resource'
import THREE from 'three'
import style from './style.css'

Vue.use(VueResource)

const AlbumCube = Vue.extend({
  template: `<div id="main"></div>
    <div class={{style.albumInfo}}>
      <p v-bind:style="{color: color1}">{{artist}}</p>
      <p v-bind:style="{color: color2}">{{title}}</p>
    </div>`,
  data() {
    return {
      style,
      artist: '',
      title: '',
      color1: '#333',
      color2: '#333',
      cube: {},
      renderer: {},
      interval: {}
    }
  },
  ready() {
    let that = this
    let renderer, scene, camera, stats, cameraControl, cube

    /**
     * Initializes the scene, camera and objects. Called when the window is
     * loaded by using window.onload (see below)
     */
    function init() {

      THREE.ImageUtils.crossOrigin = ''
      // create a scene, that will hold all our elements such as objects, cameras and lights.
      scene = new THREE.Scene()

      // create a camera, which defines where we're looking at.
      camera = new THREE.PerspectiveCamera(35,  document.getElementById('main').offsetWidth / window.innerHeight, 0.1, 1000)

      // create a render, sets the background color and the size
      that.renderer = new THREE.WebGLRenderer()
      that.renderer.setClearColor(0x000000, 1.0)
      that.renderer.setSize(document.getElementById('main').offsetWidth, window.innerHeight - 10)
      that.renderer.shadowMap.enabled = true

      // add the output of the renderer to the html element
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
      let material = new THREE.MeshLambertMaterial({color: 0x6C6C6C, transparent: true, opacity: 0.7})
      that.cube = new THREE.Mesh( geometry, material )
      scene.add( that.cube )
      camera.position.z = 5
      // call the render function, after the first render, interval is determined
      // by requestAnimationFrame
      render()
    }

    /**
     * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
     * for future renders
     */
    function render() {
      requestAnimationFrame( render )
      that.cube.rotation.x += 0.01
      that.cube.rotation.y += 0.01
      that.renderer.render( scene, camera )
    }

    /**
     * Function handles the resize event. This make sure the camera and the renderer
     * are updated at the correct moment.
     */
    function handleResize() {
      camera.aspect = document.getElementById('main').offsetWidth / window.innerHeight
      camera.updateProjectionMatrix()
      that.renderer.setSize(document.getElementById('main').offsetWidth, window.innerHeight - 10)
    }

    // calls the init function when the window is done loading.
    window.onload = init
    // calls the handleResize function when the window is resized
    window.addEventListener('resize', handleResize, false)

  },

  methods: {

    intervalTexture: function(datas) {
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

      that.interval = setInterval(function(){
        let album = datas.shift()
        datas.push(album.file)
        loader.load(
          'http://162.243.40.125/albums/' + album.file,
          ( texture ) => {
            that.cube.material.map = texture
            that.cube.material.needsUpdate = true
          },
          ( xhr ) => {
            let url = 'http://162.243.40.125/albums/' + album.file
            let albumColors = new AlbumColors(url)

            albumColors.getColors(function(colors) {
              that.renderer.setClearColor(parseInt(rgbToHex(colors[0]), 16), 1.0)
              document.body.style.background = '#'+rgbToHex(colors[0])
              document.body.style.color = '#'+rgbToHex(colors[1])
              document.getElementsByTagName('header')[0].firstElementChild.style.color = '#'+rgbToHex(colors[2])
              that.title = album.title
              that.artist = album.artist
              that.color1 = '#'+rgbToHex(colors[1])
              that.color2 = '#'+rgbToHex(colors[1])
            })
          },
          function ( xhr ) {
            console.log( 'An error happened' )
          }
        )
      }, 6000)

    },
    clearIntervalTexture: () => {
      clearInterval(this.interval)
    }

  },
  route: {
    activate: (transition) => {
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
          let allCovers = []
          let albums = datas.topalbums.album
          let src = albums[0].image[3]['#text']
          for(let i=0,j=albums.length; i<j; i++){
              let title = albums[i].name.split(' ').join('-')
              let ext = albums[i].image[3]['#text'].split('.').pop()
              allCovers.push({file: title + '.' + ext, title: albums[i].name, artist: albums[i].artist.name})
          }

          // that.intervalTexture(allCovers)
          transition.next()
      })
    },
    deactivate: (transition) => {
    }
  }

})

export default AlbumCube
