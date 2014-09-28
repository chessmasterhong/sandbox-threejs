/* global THREE, THREEx */


/**
 *  Implementation references:
 *  http://www.opengl.org.ru/docs/pg/0208.html
 *  http://xboxforums.create.msdn.com/forums/t/36650.aspx
 */
(function() {
    'use strict';

    var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 4);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var stats = new window.Stats();
    stats.setMode(0);
    document.body.appendChild(stats.domElement);

    var geometry = new THREE.IcosahedronGeometry(1, 0);
    var material = new THREE.MeshNormalMaterial({ wireframe: true });
    var mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    function update() {
        mesh.rotation.x += Math.PI / 900;
        mesh.rotation.y += Math.PI / 360;
        mesh.rotation.z += Math.PI / 1800;
    }

    function render() {
        window.requestAnimationFrame(render);
        renderer.render(scene, camera);
        stats.update();
        update();
    }

    render();
})();
