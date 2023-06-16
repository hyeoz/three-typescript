import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'dat.gui';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.x = -2;
camera.position.y = 4;
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const sphereGeometry = new THREE.SphereGeometry();
const IcosahedronGeometry = new THREE.IcosahedronGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
cube.position.x = 5;
scene.add(cube);

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = -5;
scene.add(sphere);

const icosahedron = new THREE.Mesh(IcosahedronGeometry, material);
scene.add(icosahedron);

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}
const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cubeFolder = gui.addFolder('Cube');
const cubeRotationFolder = cubeFolder.addFolder('Rotation');
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01);
const cubePositionFolder = cubeFolder.addFolder('Position');
cubePositionFolder.add(cube.position, 'x', -10, 10);
cubePositionFolder.add(cube.position, 'y', -10, 10);
cubePositionFolder.add(cube.position, 'z', -10, 10);
const cubeScaleFolder = cubeFolder.addFolder('Scale');
cubeScaleFolder.add(cube.scale, 'x', -5, 5, 0.1); //.onFinishChange(() => console.dir(cube.geometry))
cubeScaleFolder.add(cube.scale, 'y', -5, 5, 0.1);
cubeScaleFolder.add(cube.scale, 'z', -5, 5, 0.1);
cubeFolder.add(cube, 'visible', true);
cubeFolder.open();

const cubeData = {
  width: 1,
  height: 1,
  depth: 1,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
};
const sphereData = {
  radius: 1,
  widthSegments: 8,
  heightSegments: 6,
  phiStart: 0,
  phiLength: Math.PI * 2,
  thetaStart: 0,
  thetaLength: Math.PI,
};
const icosahedronData = {
  radius: 1,
  detail: 0,
};

const cubePropertiesFolder = cubeFolder.addFolder('Properties');
cubePropertiesFolder
  .add(cubeData, 'width', 0.1, 30)
  .onChange(regenerateBoxGeometry)
  .onFinishChange(() => console.dir(cube.geometry));
cubePropertiesFolder
  .add(cubeData, 'height', 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, 'depth', 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, 'widthSegments', 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, 'heightSegments', 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, 'depthSegments', 1, 30)
  .onChange(regenerateBoxGeometry);

const sphereFolder = gui.addFolder('Sphere');
const spherePropertiesFolder = sphereFolder.addFolder('Properties');
spherePropertiesFolder
  .add(sphereData, 'radius', 0.1, 30)
  .onChange(regenerateSphereGeometry)
  .onFinishChange(() => console.dir(cube.geometry));
spherePropertiesFolder
  .add(sphereData, 'widthSegments', 1, 32)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'heightSegments', 1, 16)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'phiStart', 0, Math.PI * 2)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'phiLength', 0, Math.PI * 2)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'thetaStart', 0, Math.PI)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'thetaLength', 0, Math.PI)
  .onChange(regenerateSphereGeometry);

const icosahedronFolder = gui.addFolder('Icosahedron');
const icosahedronPropertiesFolder = icosahedronFolder.addFolder('Properties');
icosahedronPropertiesFolder
  .add(icosahedronData, 'radius', 0.1, 10)
  .onChange(regenerateIcosahedronGeometry);
icosahedronPropertiesFolder
  .add(icosahedronData, 'detail', 0, 5)
  .step(1)
  .onChange(regenerateIcosahedronGeometry);

function regenerateBoxGeometry() {
  const newGeo = new THREE.BoxGeometry(
    cubeData.width,
    cubeData.height,
    cubeData.depth,
    cubeData.widthSegments,
    cubeData.heightSegments,
    cubeData.depthSegments,
  );
  cube.geometry.dispose();
  cube.geometry = newGeo;
}
function regenerateSphereGeometry() {
  const newGeo = new THREE.SphereGeometry(
    sphereData.radius,
    sphereData.widthSegments,
    sphereData.heightSegments,
    sphereData.phiStart,
    sphereData.phiLength,
    sphereData.thetaStart,
    sphereData.thetaLength,
  );
  sphere.geometry.dispose();
  sphere.geometry = newGeo;
}
function regenerateIcosahedronGeometry() {
  const newGeo = new THREE.IcosahedronGeometry(
    icosahedronData.radius,
    icosahedronData.detail,
  );
  icosahedron.geometry.dispose();
  icosahedron.geometry = newGeo;
}

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();
