/* global THREE, THREEx */

(function() {
    'use strict';

    var container;
    var scene, camera, renderer, stats;
    var keyboard;
    var cube;

    function init() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.y = 150;
        camera.position.z = 350;

        cube = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            new THREE.MeshNormalMaterial()
        );
        cube.position.y = 150;

        scene.add(cube);

        container = document.createElement('div');
        document.body.appendChild(container);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.left = '0px';
        container.appendChild(stats.domElement);

        THREEx.WindowResize(renderer, camera);

        keyboard = new THREEx.KeyboardState(renderer.domElement);
        renderer.domElement.setAttribute('tabIndex', '0');
        renderer.domElement.focus();

        keyboard.domElement.addEventListener('keydown', function(){
            if(keyboard.pressed('w')) { cube.rotation.x -= 0.1; }
            if(keyboard.pressed('s')) { cube.rotation.x += 0.1; }
            if(keyboard.pressed('a')) { cube.rotation.y -= 0.1; }
            if(keyboard.pressed('d')) { cube.rotation.y += 0.1; }
        });
    }

    function animate() {
        render();

        window.requestAnimationFrame(animate);

        stats.update();
    }

    function render() {
        renderer.render(scene, camera);
    }

    init();
    animate();
})();
