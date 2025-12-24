import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Black background

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
  alpha: false,
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial({ color: 0xff6600 });
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const donut_geo = new THREE.TorusGeometry(10, 3, 16, 100);
const donut_mat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const donut = new THREE.Mesh(donut_geo, donut_mat);
scene.add(donut);

camera.position.z = 45;

function add_star() {
  const star_geo = new THREE.SphereGeometry(0.25, 24, 24);
  const star_mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(star_geo, star_mat);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(add_star);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  cube.rotation.y += 0.005;
  cube.rotation.z += 0.005;
  camera.position.z = 45 + t * -0.01;
}

document.body.onscroll = moveCamera;

function animate() {
  donut.rotation.x += 0.01;
  donut.rotation.y += 0.01;
  moveCamera();
  renderer.render( scene, camera );
}

renderer.setAnimationLoop(animate);