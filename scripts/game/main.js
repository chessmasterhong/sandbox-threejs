/* global THREE */

(function() {
    'use strict';

    var scene, camera, renderer;
    var cube;

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        cube = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );
        scene.add(cube);

        camera.position.z = 5;
    }

    function render() {
        requestAnimationFrame(render);

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        renderer.render(scene, camera);
    };

    init();
    render();
})();
