var container, outer;

var camera, scene, renderer;

var geometry, group;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var geometry;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();
animate();

function init() {

    container = document.getElementById( 'bg' );
    outer = document.getElementById( 'about' );
    outer.appendChild( container );

    camera = new THREE.PerspectiveCamera( 60, outer.offsetWidth / window.innerHeight, 0.1, 20000 );
    camera.position.z = 800;

    scene = new THREE.Scene();

    geometry = new THREE.Geometry();
    geometry.before = [];

    var material = new THREE.PointCloudMaterial({
        color: 0x000000,
        size: 1.5
    });

    group = new THREE.PointCloud(geometry, material);

    for ( var i = 0; i < 8000; i ++ ) {

	    var v = new THREE.Vector3();
        geometry.before[i] = [];

        var rand1 = Math.random();
        var rand2 = Math.random();

        var theta1 = 360 * rand1 * Math.PI / 180;
        var theta2 = ( 180 * rand2 - 90 ) * Math.PI / 180;
        var radius = 380;

        v.x = radius * Math.cos(theta2) * Math.sin(theta1);
        v.y = radius * Math.sin(theta2);
        v.z = radius * Math.cos(theta2) * Math.cos(theta1);

        geometry.before[i].t1 = rand1;
        geometry.before[i].t2 = rand2;
  		geometry.vertices.push(v);

    }

    group = new THREE.PointCloud(geometry, material);

    scene.add( group );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xffffff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( outer.offsetWidth, window.innerHeight - 10 );
    renderer.sortObjects = false;

    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = outer.offsetWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( outer.offsetWidth, window.innerHeight - 10 );

}


function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

function animate() {

    requestAnimationFrame( animate );

    render();

}


function render() {

    var vLength = geometry.vertices.length;

    for( i = 0; i < vLength; i++ ){
      var v = geometry.vertices[i];
      var b = geometry.before[i];

      var pos1 =  b.t1 + Math.random() * 0.001 - 0.0005;
      var pos2 =  b.t2 + Math.random() * 0.001 - 0.0005;

      if( pos1 > 1 ) pos1 = 0;
      if( pos2 > 1 ) pos2 = 0;

      var theta1 = 360 * pos1 * Math.PI / 180;
      var theta2 = ( 180 * pos2 - 90 ) * Math.PI / 180;
      var radius = 380;

      v.x = radius * Math.cos(theta2) * Math.sin(theta1);
      v.y = radius * Math.sin(theta2);
      v.z = radius * Math.cos(theta2) * Math.cos(theta1);

      b.t1 = pos1;
      b.t2 = pos2;
    }

    geometry.verticesNeedUpdate = true;

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    renderer.render( scene, camera );

}
