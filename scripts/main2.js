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
    camera.position.set(0, 4, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var stats = new window.Stats();
    stats.setMode(0);
    document.body.appendChild(stats.domElement);

    /* ====================================================================== */

    /**
     *  L1 ---------- L2
     *   \            /
     *    \    ##    /
     *     \   ##   /
     *      \      /
     *       \    /
     *        \  /
     *         L0
     */


    var L0 = new THREE.PointLight(0xff0000);
    L0.position.set(10 * Math.sqrt(3), 0, 0);
    scene.add(L0);

    var L1 = new THREE.PointLight(0x00ff00);
    L1.position.set(0, 0, 10);
    scene.add(L1);

    var L2 = new THREE.PointLight(0x0000ff);
    L2.position.set(0, 0, -10);
    scene.add(L2);

    var material = new THREE.MeshPhongMaterial({
        color      : 0x223344,
        //ambient    : 0xffffff,
        emissive   : 0x101010,
        specular   : 0xffffff,
        shininess  : 10,
        shading    : THREE.FlatShading,
        transparent: true,
        opacity    : 0.5
    });

    var meshOuter = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 2), material);
    //var meshInner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 2), material);

    scene.add(meshOuter);
    //scene.add(meshInner);

    scene.add(new THREE.WireframeHelper(meshOuter, 0x808080));
    //scene.add(new THREE.WireframeHelper(meshInner, 0x000000));

    meshOuter.rotation.z = 0.55;
    //meshInner.rotation.z = meshOuter.rotation.z;

    /* ====================================================================== */

    function update() {
        //meshOuter.rotation.x += Math.PI / 900;
        meshOuter.rotation.y += Math.PI / 720;
        //meshOuter.rotation.z += Math.PI / 1800;

        //meshInner.rotation.x = meshOuter.rotation.x;
        //meshInner.rotation.y = meshOuter.rotation.y;
        //meshInner.rotation.z = meshOuter.rotation.z;
    }

    function render() {
        window.requestAnimationFrame(render);
        renderer.render(scene, camera);
        stats.update();
        update();
    }

    render();
})();
