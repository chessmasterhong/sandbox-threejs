/* global THREE, THREEx */


/**
 *  Implementation references:
 *  http://www.opengl.org.ru/docs/pg/0208.html
 *  http://xboxforums.create.msdn.com/forums/t/36650.aspx
 */
(function() {
    'use strict';

    var theta = Math.sqrt(2 / (5 + Math.sqrt(5))); // 0.525731112119133606
    var phi   = Math.sqrt(2 / (5 - Math.sqrt(5))); // 0.850650808352039932

    var scene, renderer, camera;
    var stats;
    var material, geometry, mesh;

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

        material = new THREE.MeshNormalMaterial();

        // Regular icosahedron {3,5}
        // F = 20, E = 30, V = 12
        geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(-theta,      0,    phi),
            new THREE.Vector3( theta,      0,    phi),
            new THREE.Vector3(-theta,      0,   -phi),
            new THREE.Vector3( theta,      0,   -phi),
            new THREE.Vector3(     0,    phi,  theta),
            new THREE.Vector3(     0,    phi, -theta),
            new THREE.Vector3(     0,   -phi,  theta),
            new THREE.Vector3(     0,   -phi, -theta),
            new THREE.Vector3(   phi,  theta,      0),
            new THREE.Vector3(  -phi,  theta,      0),
            new THREE.Vector3(   phi, -theta,      0),
            new THREE.Vector3(  -phi, -theta,      0)
        );
        geometry.faces.push(
            new THREE.Face3( 0,  4,  1),
            new THREE.Face3( 0,  9,  4),
            new THREE.Face3( 9,  5,  4),
            new THREE.Face3( 4,  5,  8),
            new THREE.Face3( 4,  8,  1),
            new THREE.Face3( 8, 10,  1),
            new THREE.Face3( 8,  3, 10),
            new THREE.Face3( 5,  3,  8),
            new THREE.Face3( 5,  2,  3),
            new THREE.Face3( 2,  7,  3),
            new THREE.Face3( 7, 10,  3),
            new THREE.Face3( 7,  6, 10),
            new THREE.Face3( 7, 11,  6),
            new THREE.Face3(11,  0,  6),
            new THREE.Face3( 0,  1,  6),
            new THREE.Face3( 6,  1, 10),
            new THREE.Face3( 9,  0, 11),
            new THREE.Face3( 9, 11,  2),
            new THREE.Face3( 9,  2,  5),
            new THREE.Face3( 7,  2, 11)
        );
        geometry.computeFaceNormals();

        mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);
        scene.add(new THREE.WireframeHelper(mesh, 0x000000));
    }

    function animate() {
        render();

        window.requestAnimationFrame(animate);

        stats.update();

        mesh.rotation.x += Math.PI / 900;
        mesh.rotation.y += Math.PI / 360;
        mesh.rotation.z += Math.PI / 1800;
    }

    function render() {
        renderer.render(scene, camera);
    }

    init();
    animate();
})();
