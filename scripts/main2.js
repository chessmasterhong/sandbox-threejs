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

    var controls = new THREE.OrbitControls( camera );

    var stats = new window.Stats();
    stats.setMode(0);
    document.body.appendChild(stats.domElement);

    var axis = new THREE.AxisHelper(10);
    scene.add(axis);

    /* ====================================================================== */

    /**
     *  Light sources positioning
     *           +y
     *            |
     *      L1 ------- L2
     *        \   |   /
     *  -x ----\--#--/---- +x
     *          \ | /
     *           \|/
     *           L0
     *            |
     *           -y
     */
    var L0 = new THREE.PointLight(0xff0000);
    L0.position.set(10 * Math.sqrt(3), 0, 0);
    scene.add(L0);

    var L1 = new THREE.PointLight(0x00ff00);
    L1.position.set(-2.5 * Math.sqrt(3), 10, 0);
    scene.add(L1);

    var L2 = new THREE.PointLight(0x0000ff);
    L2.position.set(-2.5 * Math.sqrt(3), -10, 0);
    scene.add(L2);

    var material = new THREE.MeshPhongMaterial({
        color      : 0x223344,
        //ambient    : 0xffffff,
        emissive   : 0x101010,
        specular   : 0xffffff,
        shininess  : 10,
        shading    : THREE.FlatShading,
        //transparent: true,
        opacity    : 0.7
    });

    /**
     *  Icosahedron subdivisions
     *    s  |  f
     *  -----+-----
     *    0  |  20 =  1 * 20 = (0 + 1)^2 * 20
     *    1  |  80 =  4 * 20 = (1 + 1)^2 * 20
     *    2  | 180 =  9 * 20 = (2 + 1)^2 * 20
     *    3  | 320 = 16 * 20 = (3 + 1)^2 * 20
     *    4  | 500 = 25 * 20 = (4 + 1)^2 * 20
     *   ... | ...
     *    n  |                 (n + 1)^2 * 20
     */
    var meshOuter = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 2), material);
    var meshInner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 2), material);

    scene.add(meshOuter);
    scene.add(meshInner);

    scene.add(new THREE.WireframeHelper(meshOuter, 0x606060));
    scene.add(new THREE.WireframeHelper(meshInner, 0x404040));

    meshOuter.rotation.z = 0.55;
    meshInner.rotation.z = meshOuter.rotation.z;

    /* ====================================================================== */

    function update() {
        //meshOuter.rotation.y += Math.PI / 900;
        meshInner.rotation.y = meshOuter.rotation.y;
    }

    function render() {
        window.requestAnimationFrame(render);
        renderer.render(scene, camera);
        controls.update();
        stats.update();
        update();
    }

    render();
})();
