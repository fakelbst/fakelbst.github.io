import Vue from 'vue'
import VueResource from 'vue-resource'
import THREE from 'three'

Vue.use(VueResource)

const AlbumCube = Vue.extend({
  template: ' <div id="main"></div>'
})

Vue.component('app', AlbumCube)

new Vue({
  el: 'body',
  components: { AlbumCube },
  ready() {


    // global variables
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
        renderer = new THREE.WebGLRenderer()
        renderer.setClearColor(0x000000, 1.0)
        renderer.setSize(document.getElementById('main').offsetWidth, window.innerHeight - 10)
        renderer.shadowMap.enabled = true

        // add the output of the renderer to the html element
        document.getElementById('main').appendChild(renderer.domElement)


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
        cube = new THREE.Mesh( geometry, material )
        scene.add( cube )
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
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        renderer.render( scene, camera )
    }

    /**
     * Function handles the resize event. This make sure the camera and the renderer
     * are updated at the correct moment.
     */
    function handleResize() {
        camera.aspect = document.getElementById('main').offsetWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(document.getElementById('main').offsetWidth, window.innerHeight - 10)
    }

    // calls the init function when the window is done loading.
    window.onload = init
    // calls the handleResize function when the window is resized
    window.addEventListener('resize', handleResize, false)

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

    function intervalTexture(datas) {
        var file = datas.shift()
        datas.push(file)
        var loader = new THREE.TextureLoader()
        loader.load(
          'http://162.243.40.125/albums/' + file,
          function ( texture ) {
            cube.material.map = texture
            cube.material.needsUpdate = true
          },
          function ( xhr ) {
          },
          function ( xhr ) {
            console.log( 'An error happened' )
          }
        )
        let url = 'http://162.243.40.125/albums/' + file
        let albumColors = new AlbumColors(url)

          albumColors.getColors(function(colors) {
            
            renderer.setClearColor(parseInt(rgbToHex(colors[0]), 16), 1.0)
            document.body.style.background = '#'+rgbToHex(colors[0])
            document.body.style.color = '#'+rgbToHex(colors[1])
            document.getElementsByTagName('header')[0].firstElementChild.style.color = '#'+rgbToHex(colors[2])
          })
    }

    let APIkey = "4dff88a0423651b3570253b10b745b2c", 
      Limit = 100, 
      Page = 1, 
      User = "fakelbst"

    this.$http.get("http://ws.audioscrobbler.com/2.0/", {
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
            allCovers.push(title + '.' + ext)
        }
        setInterval(function(){
            intervalTexture(allCovers)
        }, 6000)
    })


  }
})


