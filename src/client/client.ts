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
camera.position.x = 4;
camera.position.y = 4;
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // window 사이즈로 렌더러의 사이즈를 설정
document.body.appendChild(renderer.domElement); // 1. canvas 를 직접 작성하지 않고 동적으로 추가

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(8, 0, 0);

const light1 = new THREE.PointLight();
light1.position.set(10, 10, 10);
scene.add(light1);

const light2 = new THREE.PointLight();
light2.position.set(-10, 10, 10);
scene.add(light2);

const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0xff0000 }),
);
object1.position.set(4, 0, 0);
scene.add(object1);
object1.add(new THREE.AxesHelper(5));
const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0x00ff00 }),
);
object2.position.set(4, 0, 0);
object1.add(object2);
object2.add(new THREE.AxesHelper(5));
const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0x0000ff }),
);
object3.position.set(4, 0, 0);
object2.add(object3);
object3.add(new THREE.AxesHelper(5));

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
const object1Folder = gui.addFolder('Object1');
object1Folder.add(object1.position, 'x', 0, 10, 0.01).name('X position');
object1Folder
  .add(object1.rotation, 'x', 0, Math.PI * 2, 0.01)
  .name('X rotation');
object1Folder.add(object1.scale, 'x', 0, 2, 0.01).name('X scale');
const object2Folder = gui.addFolder('Object2');
object2Folder.add(object2.position, 'x', 0, 10, 0.01).name('X position');
object2Folder
  .add(object2.rotation, 'x', 0, Math.PI * 2, 0.01)
  .name('X rotation');
object2Folder
  .add(object2.rotation, 'y', 0, Math.PI * 2, 0.01)
  .name('Y rotation');
object2Folder.add(object2.scale, 'x', 0, 2, 0.01).name('X scale');
const object3Folder = gui.addFolder('Object3');
object3Folder.add(object3.position, 'x', 0, 10, 0.01).name('X position');
object3Folder
  .add(object3.rotation, 'x', 0, Math.PI * 2, 0.01)
  .name('X rotation');
object3Folder.add(object3.scale, 'x', 0, 2, 0.01).name('X scale');

// const cameraFolder = gui.addFolder('Camera');
// cameraFolder.add(camera.position, 'z', 0, 20);
// cameraFolder.open();

object1Folder.open();
object2Folder.open();
object3Folder.open();

const debug = document.getElementById('debug1') as HTMLDivElement;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  stats.update();
  render();

  const object1WorldPosition = new THREE.Vector3();
  object1.getWorldPosition(object1WorldPosition);
  const object2WorldPosition = new THREE.Vector3();
  object2.getWorldPosition(object2WorldPosition);
  const object3WorldPosition = new THREE.Vector3();
  object3.getWorldPosition(object3WorldPosition);
  debug.innerText =
    'Red\n' +
    'Local Pos X : ' +
    object1.position.x.toFixed(2) +
    '\n' +
    'World Pos X : ' +
    object1WorldPosition.x.toFixed(2) +
    '\n' +
    '\nGreen\n' +
    'Local Pos X : ' +
    object2.position.x.toFixed(2) +
    '\n' +
    'World Pos X : ' +
    object2WorldPosition.x.toFixed(2) +
    '\n' +
    '\nBlue\n' +
    'Local Pos X : ' +
    object3.position.x.toFixed(2) +
    '\n' +
    'World Pos X : ' +
    object3WorldPosition.x.toFixed(2) +
    '\n';
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
// render();
