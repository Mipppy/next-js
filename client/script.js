 // Create a Three.js scene
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 const renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);

 // Create a Cannon.js world
 const world = new CANNON.World();
 world.gravity.set(0, -9.82, 0); // gravity (m/s²), along the negative Y-axis

 // Create a ground plane (Cannon.js)
 const groundShape = new CANNON.Plane();
 const groundBody = new CANNON.Body({ mass: 0 });
 groundBody.addShape(groundShape);
 world.addBody(groundBody);

 // Create a ground plane (Three.js)
 const groundGeometry = new THREE.PlaneGeometry(10, 10);
 const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
 const ground = new THREE.Mesh(groundGeometry, groundMaterial);
 ground.rotation.x = -Math.PI / 2;
 scene.add(ground);

 // Create a ball (Cannon.js)
 const ballShape = new CANNON.Sphere(0.5); // radius
 const ballBody = new CANNON.Body({ mass: 1 });
 ballBody.addShape(ballShape);
 ballBody.position.set(0, 3, 0); // initial position
 world.addBody(ballBody);

 // Create a ball (Three.js)
 const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
 const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
 const ball = new THREE.Mesh(ballGeometry, ballMaterial);
 scene.add(ball);

 // Animation loop
 function animate() {
     requestAnimationFrame(animate);

     // Step the physics world
     world.step(1 / 60);

     // Update the Three.js objects based on Cannon.js physics
     ball.position.copy(ballBody.position);
     ball.quaternion.copy(ballBody.quaternion);

     // Render the scene
     renderer.render(scene, camera);
 }

 // Run the animation
 animate();