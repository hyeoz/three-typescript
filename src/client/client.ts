import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module'; // fps 확인 가능
import { GUI } from 'dat.gui';

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(
  75, // 원근감
  window.innerWidth / window.innerHeight, // 카메라 비율
  0.1, // near plane
  1000, // far plane
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // window 사이즈로 렌더러의 사이즈를 설정
document.body.appendChild(renderer.domElement); // 1. canvas 를 직접 작성하지 않고 동적으로 추가

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

window.addEventListener('resize', onWindowResize, false); // 이벤트 리스너를 통해 바뀌는 윈도우 사이즈를 바로 적용
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}
controls.addEventListener('change', render);

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cubeFolder = gui.addFolder('Cube');
const cubeRotationFolder = cubeFolder.addFolder('CubeRotation');
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
const cubePositionFolder = cubeFolder.addFolder('CubePosition');
cubePositionFolder.add(cube.position, 'x', -10, 10);
cubePositionFolder.add(cube.position, 'y', -10, 10);
cubePositionFolder.add(cube.position, 'z', -10, 10);
const cubeScaleFolder = cubeFolder.addFolder('CubeScale');
cubeScaleFolder.add(cube.scale, 'x', 0, 10);
cubeScaleFolder.add(cube.scale, 'y', 0, 10);
cubeScaleFolder.add(cube.scale, 'z', 0, 10);

cubeFolder.open();
cubeRotationFolder.open();
cubePositionFolder.open();
cubeScaleFolder.open();
// const cameraFolder = gui.addFolder('Camera');
// cameraFolder.add(camera.position, 'z', 0, 20);
// cameraFolder.open();

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
// render();
