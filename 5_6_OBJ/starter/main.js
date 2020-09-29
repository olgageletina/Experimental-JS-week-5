let scene, camera, renderer;

function init() {
  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  console.log(controls);
  renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
