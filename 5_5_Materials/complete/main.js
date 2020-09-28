let scene, camera, renderer, cube, clock;
const vShader = `
varying vec3 v_position;

  void main() {	
    v_position = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`

const fShader = `
varying vec3 v_position; 
uniform float u_time; 

  void main () {

    float sinP = sin(u_time * 1.25 + v_position.x * v_position.y);
    vec3 color = vec3(0.5, sinP, 0.5);
    gl_FragColor = vec4(color, 1.0);
  }
`

const uniforms = {
  u_time: { value: 0.0 },
  u_resolution: { value: { x: window.innerWidth, y: window.innerHeight } }
};

function init() {
  scene = new THREE.Scene();

  clock = new THREE.Clock;

  // PerspectiveCamera(fov, aspect, near, far)
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(3, 3, 3);

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vShader,
    fragmentShader: fShader
  });

  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);

  uniforms.u_time.value = clock.getElapsedTime();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();