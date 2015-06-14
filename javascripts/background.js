
// global variables
var renderer;
var scene;
var camera;
var stats;
var cameraControl;
var cube;

/**
 * Initializes the scene, camera and objects. Called when the window is
 * loaded by using window.onload (see below)
 */
function init() {

    THREE.ImageUtils.crossOrigin = '';
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(35,  document.getElementById('albums').offsetWidth / window.innerHeight, 0.1, 1000);

    // create a render, sets the background color and the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(document.getElementById('albums').offsetWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    // add the output of the renderer to the html element
    document.getElementById('albums').appendChild(renderer.domElement);


    var ambientLight = new THREE.AmbientLight( 0x000000 );
    scene.add( ambientLight );

    var lights = [];
    lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[0].position.set( 0, 200, 0 );
    lights[1].position.set( 100, 200, 100 );
    lights[2].position.set( -100, -200, -100 );

    scene.add( lights[0] );
    scene.add( lights[1] );
    scene.add( lights[2] );


    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial({color: 0x6C6C6C, transparent: true, opacity: 0.7});
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;
    // call the render function, after the first render, interval is determined
    // by requestAnimationFrame
    render();
}

/**
 * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
 * for future renders
 */
function render() {
    requestAnimationFrame( render );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}


/**
 * Function handles the resize event. This make sure the camera and the renderer
 * are updated at the correct moment.
 */
function handleResize() {
    camera.aspect = document.getElementById('albums').offsetWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.getElementById('albums').offsetWidth, window.innerHeight);
}

// calls the init function when the window is done loading.
window.onload = init;
// calls the handleResize function when the window is resized
window.addEventListener('resize', handleResize, false);

function intervalTexture(datas) {
    var file = datas.shift();
    datas.push(file);
    cube.material.map = THREE.ImageUtils.loadTexture("http://162.243.40.125/albums/" + file);
    cube.material.needsUpdate = true;
}

var APIkey, Limit, Page, Period, User;
APIkey = "4dff88a0423651b3570253b10b745b2c";
User = "fakelbst";
Limit = 100;
Page = 1;

$.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&", {
  user: User,
  api_key: APIkey,
  limit: Limit,
  format: 'json',
  page: 1
}, function(datas) {
    var allCovers = [];
    var albums = datas.topalbums.album;
    var src = albums[0].image[3]['#text'];
    for(var i=0,j=albums.length; i<j; i++){
        var title = albums[i].name.split(' ').join('-');
        var ext = albums[i].image[3]['#text'].split('.').pop();
        allCovers.push(title + '.' + ext);
    }
    setInterval(function(){
        intervalTexture(allCovers);
    }, 8000);
});

