/* global THREE, THREEx */

(function() {
    'use strict';

    var scene, renderer, camera,
        stats,
        keyboard,
        cube;

    function init() {
        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        renderer.domElement.setAttribute('tabIndex', '0');
        renderer.domElement.focus();

        camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.y = 150;
        camera.position.z = 350;
        THREEx.WindowResize(renderer, camera);

        stats = new window.Stats();
        stats.setMode(0);
        document.body.appendChild(stats.domElement);

        keyboard = new THREEx.KeyboardState(renderer.domElement);
        keyboard.domElement.addEventListener('keydown', function(){
            if(keyboard.pressed('w')) { cube.rotation.x -= 0.1; }
            if(keyboard.pressed('s')) { cube.rotation.x += 0.1; }
            if(keyboard.pressed('a')) { cube.rotation.y -= 0.1; }
            if(keyboard.pressed('d')) { cube.rotation.y += 0.1; }
        });

        cube = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            new THREE.MeshNormalMaterial()
        );
        cube.position.y = 150;
        scene.add(cube);
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
