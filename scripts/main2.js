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

    /* ====================================================================== */

    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    var material = new THREE.MeshPhongMaterial({
        color      : 0x223344,
        //ambient    : 0xffffff,
        emissive   : 0x101010,
        specular   : 0xffffff,
        shininess  : 10,
        shading    : THREE.FlatShading,
        transparent: true,
        opacity    : 0.25
    });

    var meshOuter = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 0), material);
    var meshInner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 0), material);

    scene.add(meshOuter);
    scene.add(meshInner);

    //scene.add(new THREE.WireframeHelper(meshOuter, 0x000000));
    //scene.add(new THREE.WireframeHelper(meshInner, 0x000000));

    /* ====================================================================== */

    function update() {
        meshOuter.rotation.x = meshInner.rotation.x += Math.PI / 900;
        meshOuter.rotation.y = meshInner.rotation.y += Math.PI / 360;
        meshOuter.rotation.z = meshInner.rotation.z += Math.PI / 1800;
    }

    function render() {
        window.requestAnimationFrame(render);
        renderer.render(scene, camera);
        stats.update();
        update();
    }

    render();
})();
