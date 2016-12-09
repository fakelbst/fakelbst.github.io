import Vue from 'vue'
import { mapState, mapMu, mapActions } from 'vuex'
import colorPalettes from 'color-palettes'
import style from './style.css'
import fontello from '../fontello.css'
const THREE = require('three')

export default {
  template: `<div v-bind:class="style['main-wrapper']">
    <div v-bind:class="style.main" id="main"></div>
    <i v-bind:class="[fontello['icon-angle-double-right'], style['to-right'], style['arrow-right']]" v-if="zoomCurrentView" v-on:click.stop="loadTexture()"></i>
    <div v-bind:class="style['album-info']">
      <p v-bind:class="style.a">{{artist}}</p>
      <p v-bind:class="style.t">{{title}}</p>
    </div>
  </div>`,
  data() {
    return {
      style,
      fontello,
      artist: '',
      title: '',
      cube: {},
      renderer: {},
      material: {},
      camera: {},
      aIndex: 0,
    }
  },
  computed: mapState([
    'zoomCurrentView',
    'albums',
    'albumsCoverBase64'
  ]),
  mounted() {
    let scene, stats, cameraControl

    let init = () => {

      let wrapDom = this.$el.parentNode
      THREE.ImageUtils.crossOrigin = ''
      scene = new THREE.Scene()

      this.camera = new THREE.PerspectiveCamera(35, wrapDom.offsetWidth / wrapDom.offsetHeight, 0.1, 1000)

      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(0x1e2021, 1.0)
      this.renderer.setSize(this.$el.parentNode.offsetWidth, wrapDom.offsetHeight - 10)
      this.renderer.shadowMap.enabled = true

      this.$el.firstElementChild.appendChild(this.renderer.domElement)

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
      this.material = new THREE.MeshLambertMaterial({color: 0x6C6C6C, transparent: true, opacity: 0.7})
      this.cube = new THREE.Mesh( geometry, this.material )
      scene.add( this.cube )
      this.camera.position.z = 5
      render()
    }

    let render = () => {
      requestAnimationFrame( render )
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01
      this.renderer.render( scene, this.camera )
    }
    setTimeout( init, 200)

    this.getAlbums()
  },
  updated () {
    setTimeout( () => {
      this.handleResize()
    }, 500)
  },
  methods: {
    ...mapActions({
      getAlbums: 'getAlbums',
    }),
    ...mapActions({
      getImageDataUri: 'getImageDataUri',
    }),
    handleResize () {
      let wrapDom = this.$el.parentNode
      this.camera.aspect = wrapDom.offsetWidth / wrapDom.offsetHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(wrapDom.offsetWidth, wrapDom.offsetHeight)
    },

    loadTexture () {
      this.getImageDataUri(this.albums[this.aIndex+2].image[3]['#text']).then( (value) => {
        this.$store.commit('LOAD_COVER_BASE64', value)
      })
      let loader = new THREE.TextureLoader()

      let album = this.albums[this.aIndex]
      loader.load(
        this.albumsCoverBase64[this.aIndex],
        ( texture ) => {
          this.cube.material.map = texture
          this.material.needsUpdate = true

          this.title = album.name
          this.artist = album.artist.name
          this.aIndex++
        },
        ( xhr ) => {
        },
        function ( xhr ) {
          console.log( 'An error happened' )
        }
      )

    }
  },
}

