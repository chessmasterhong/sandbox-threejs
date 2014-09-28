/* global THREE, THREEx */


/**
 *  Implementation references:
 *  http://www.opengl.org.ru/docs/pg/0208.html
 *  http://xboxforums.create.msdn.com/forums/t/36650.aspx
 */
(function() {
    'use strict';

    var scene, renderer, camera;
    var stats;
    var geometry, material, mesh;

    function init() {
        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
        camera.position.set(0, 0, 4);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        stats = new window.Stats();
        stats.setMode(0);
        document.body.appendChild(stats.domElement);

        geometry = new THREE.IcosahedronGeometry();
        material = new THREE.MeshNormalMaterial();
        mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);
        scene.add(new THREE.WireframeHelper(mesh, 0x000000));
    }

    function animate() {
        renderer.render(scene, camera);

        window.requestAnimationFrame(animate);

        stats.update();

        mesh.rotation.x += Math.PI / 900;
        mesh.rotation.y += Math.PI / 360;
        mesh.rotation.z += Math.PI / 1800;
    }

    init();
    animate();
})();
