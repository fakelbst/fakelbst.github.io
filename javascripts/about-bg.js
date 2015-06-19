var container, outer;

var camera, scene, renderer;

var geometry, group;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var dDistance = 600,
    dRotX = 0,
    dRotY = 0;

var mousePos = {
    x: 0,
    y: 0
};
var cameraPos = {
    x: 0,
    y: 0,
    z: 0,
    dx: 0,
    dy: 0,
    dz: 0
};


document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();
animate();

function init() {

    container = document.getElementById( 'bg' );
    outer = document.getElementById( 'about' );
    windowHalfX = outer.offsetWidth / 2;
    // outer.appendChild( container );

    camera = new THREE.PerspectiveCamera( 80, outer.offsetWidth / window.innerHeight, 0.1, 20000 );

    scene = new THREE.Scene();

    var g = new THREE.Geometry();

    g.before = [];
    g.verticesNeedUpdate = true;

    for (var i = 0; i < 3500; i++) {
	    var v = new THREE.Vector3();
        g.before[i] = [];

        var rand1 = Math.random();
        var rand2 = Math.random();

        var theta1 = 360 * rand1 * Math.PI / 180;
        var theta2 = ( 180 * rand2 - 90 ) * Math.PI / 180;
        var radius = 380;

        v.x = radius * Math.cos(theta2) * Math.sin(theta1);
        v.y = radius * Math.sin(theta2);
        v.z = radius * Math.cos(theta2) * Math.cos(theta1);

        g.before[i].t1 = rand1;
        g.before[i].t2 = rand2;
  		g.vertices.push(v);
    }

    var texture = THREE.ImageUtils.loadTexture('../images/particle.png');

    var material = new THREE.PointCloudMaterial({
        color: 0x000000,
        size: 1.5,
        map: texture
    });

    group = new THREE.PointCloud(g, material);


    scene.add( group );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xffffff );
    renderer.setSize( outer.offsetWidth - 110, window.innerHeight - 110 );
    renderer.sortObjects = false;

    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX =  outer.offsetWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = outer.offsetWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( outer.offsetWidth - 110, window.innerHeight - 110 );

}

function onDocumentMouseMove(event) {
    mousePos.x = event.clientX / outer.offsetWidth * 2 - 1;
    mousePos.y = event.clientY / window.innerHeight * 2 - 1;
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {

    rotX = mousePos.x * 180;
    rotY = mousePos.y * 90;
    dRotX += (rotX - dRotX) * 0.05;

// cameraPos.x += camera.dx;
//       cameraPos.y += camera.dy;
//       cameraPos.z += camera.dz;
//       camera.position.x = cameraPos.x;
//       camera.position.y = cameraPos.y;
//       camera.position.z = cameraPos.z;

    camera.position.x = dDistance * Math.sin(dRotX * Math.PI / 180);
    camera.position.y = dDistance * Math.sin(dRotY * Math.PI / 180);
    camera.position.z = dDistance * Math.cos(dRotX * Math.PI / 180);

    camera.lookAt( scene.position );

    renderer.render( scene, camera );
}

