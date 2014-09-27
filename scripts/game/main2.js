/* global THREE, THREEx */

(function() {
    'use strict';

    var scene, renderer, camera;
    var material, geometry, line;

    function init() {
        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
        camera.position.set(0, 0, 100);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        material = new THREE.LineBasicMaterial({ color: 0x0000ff });

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 10, 0));
        geometry.vertices.push(new THREE.Vector3(10, 0, 0));

        line = new THREE.Line(geometry, material);

        scene.add(line);
    }

    function animate() {
        render();

        window.requestAnimationFrame(animate);
    }

    function render() {
        renderer.render(scene, camera);
    }

    init();
    animate();
})();
