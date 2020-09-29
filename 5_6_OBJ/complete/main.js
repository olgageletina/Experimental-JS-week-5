let scene, camera, renderer, model, objLoader, controls;

function init() {
  // scene
  scene = new THREE.Scene();

  // loader
  objLoader = new THREE.OBJLoader();

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

  // add controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // control features
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.screenSpacePanning = false;
  controls.dampingFactor = 0.1;
  controls.minDistance = 50;
  controls.maxDistance = 500;

  // light
  const skyColor = 0xffffff; // white
  const groundColor = 0x0F0305; // nearly black
  const intensity = 1;
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  scene.add(light);

  // OBJ – lincoln
  const material = new THREE.MeshLambertMaterial({ color: 0xE01C21 });
  objLoader.load(
    "./model/lincoln.obj",
    function (obj) {
      obj.traverse((child) => {
        child.material = material;
      });
      model = obj;
      model.position.z = 100;
      model.position.y = -15;
      scene.add(model);

      const bbox = new THREE.Box3().setFromObject(model);
      const targetVector = new THREE.Vector3();
      const center = bbox.getCenter(targetVector);
      controls.target = center;
      controls.update();

    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

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
  renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
