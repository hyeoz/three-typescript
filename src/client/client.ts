import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module'; // fps 확인 가능

const scene = new THREE.Scene();
const scene2 = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50, // 원근감
  window.innerWidth / window.innerHeight, // 카메라 비율
  0.1, // near plane
  1000, // far plane
);
camera.position.z = 2;

const camera2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
const camera3 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
const camera4 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera2.position.y = 2;
camera2.lookAt(new THREE.Vector3());
camera3.position.x = 2;
camera3.lookAt(new THREE.Vector3());
camera4.position.z = 2;

const canvas1 = document.getElementById('c1') as HTMLCanvasElement; // 2. canvas 를 하드코딩 하여 추가
const canvas2 = document.getElementById('c2') as HTMLCanvasElement; // 2. canvas 를 하드코딩 하여 추가
const canvas3 = document.getElementById('c3') as HTMLCanvasElement; // 2. canvas 를 하드코딩 하여 추가
const canvas4 = document.getElementById('c4') as HTMLCanvasElement; // 2. canvas 를 하드코딩 하여 추가

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight); // window 사이즈로 렌더러의 사이즈를 설정
// document.body.appendChild(renderer.domElement); // 1. canvas 를 직접 작성하지 않고 동적으로 추가
const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 });
renderer1.setSize(200, 200);
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 });
renderer2.setSize(200, 200);
const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3 });
renderer3.setSize(200, 200);
const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4 });
renderer4.setSize(200, 200);

const controls = new OrbitControls(camera, renderer1.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
const cube2 = new THREE.Mesh(geometry, material);
cube2.scale.x = 0.5;
cube2.scale.y = 0.5;
cube2.scale.z = 0.5;
scene2.add(cube2);

window.addEventListener('resize', onWindowResize, false); // 이벤트 리스너를 통해 바뀌는 윈도우 사이즈를 바로 적용
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer1.setSize(window.innerWidth, window.innerHeight);
  render();
}
controls.addEventListener('change', render);

const stats = new Stats();
document.body.appendChild(stats.dom);

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // cube2.rotation.x += 0.01;
  // cube2.rotation.y += 0.01;
  stats.update();

  render();
}

function render() {
  // renderer.render(scene, camera);
  renderer1.render(scene, camera);
  renderer2.render(scene2, camera2);
  renderer3.render(scene2, camera3);
  renderer4.render(scene2, camera4);
}

animate();
// render();
