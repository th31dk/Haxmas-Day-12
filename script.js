import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const texture = new THREE.TextureLoader().load('jon.png')
const material = new THREE.MeshBasicMaterial({map: texture});
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const donut_geo = new THREE.TorusGeometry(10, 3, 16, 100);
const donut_tex = new THREE.TextureLoader().load('jon.png')
const donut_mat = new THREE.MeshBasicMaterial({map: donut_tex});
const donut = new THREE.Mesh(donut_geo, donut_mat);
scene.add(donut);

camera.position.z = 45;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0000;
  camera.rotation.y = t * -0.0000;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  donut.rotation.x += 0.01;
  donut.rotation.y += 0.01;

  renderer.render( scene, camera );
}

function add_star() {
  const star_geo = new THREE.SphereGeometry(0.25, 24, 24);
  const star_tex = new THREE.TextureLoader().load('jon.png')
  const star_mat = new THREE.MeshBasicMaterial({map: star_tex});
  const star = new THREE.Mesh(star_geo, star_mat);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(add_star);

renderer.setAnimationLoop(animate);