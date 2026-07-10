# Three.js + Cannon.js Cloth Simulation Pattern

This document explains the physics-based cloth simulation pattern using `threejs` and `cannon-es` (a modern 3D physics engine). It outlines the architecture, spring constraints, and mesh synchronization.

## 1. Architecture

The simulation is split into two worlds:
1.  **Physics World (Cannon.js)**: A 2D grid of particles (point masses) connected by distance constraints (springs).
2.  **Visual World (Three.js)**: A plane geometry whose vertices are mapped 1-to-1 to the positions of the physics particles on every frame.

```
[Physics World: Cannon.js]                [Visual World: Three.js]
  Particle (mass, velocity)  =======>   PlaneGeometry Vertex Position
         || (Distance Constraint)                     ||
  Particle (mass, velocity)  =======>   PlaneGeometry Vertex Position
```

## 2. Physics Grid Setup

To build the cloth, we instantiate a grid of `CANNON.Body` particles. The top row of particles is assigned `mass = 0` to fix them in place (acting as a curtain rod or hanging point), while the rest have a non-zero mass so gravity acts on them.

```javascript
import * as CANNON from 'cannon-es';

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0)
});

const Nx = 15; // columns
const Ny = 15; // rows
const mass = 1;
const clothSize = 1;
const dist = clothSize / Nx;

const shape = new CANNON.Particle();
const particles = [];

for (let i = 0; i < Nx + 1; i++) {
    particles.push([]);
    for (let j = 0; j < Ny + 1; j++) {
        const particle = new CANNON.Body({
            mass: j === Ny ? 0 : mass, // Fix the top row in space
            shape,
            position: new CANNON.Vec3((i - Nx * 0.5) * dist, (j - Ny * 0.5) * dist, 0),
            velocity: new CANNON.Vec3(0, 0, -0.1 * (Ny - j)) // Small wind nudge
        });
        particles[i].push(particle);
        world.addBody(particle);
    }
}
```

## 3. Spring Constraints

To make the particles behave like a sheet of fabric rather than loose sand, we link neighboring particles (horizontal and vertical neighbors) using `DistanceConstraint`s.

```javascript
function connect(i1, j1, i2, j2) {
    world.addConstraint(new CANNON.DistanceConstraint(
        particles[i1][j1],
        particles[i2][j2],
        dist
    ));
}

// Connect horizontal and vertical neighbors
for (let i = 0; i < Nx + 1; i++) {
    for (let j = 0; j < Ny + 1; j++) {
        if (i < Nx) connect(i, j, i + 1, j);
        if (j < Ny) connect(i, j, i, j + 1);
    }
}
```

## 4. Rendering and Synchronization

On every frame, we step the physics world forward and copy the positions of the Cannon.js particles into the `PlaneGeometry` vertex position buffer.

```javascript
import * as THREE from 'three';

const clothGeometry = new THREE.PlaneGeometry(1, 1, Nx, Ny);
const clothMat = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
const clothMesh = new THREE.Mesh(clothGeometry, clothMat);
scene.add(clothMesh);

function updateParticles() {
    const positionAttribute = clothGeometry.attributes.position;

    for (let i = 0; i < Nx + 1; i++) {
        for (let j = 0; j < Ny + 1; j++) {
            // Map grid coordinates to the flat 1D attribute array index
            const index = j * (Nx + 1) + i;
            
            // Get position of physics body (invert Y index if grid coordinates differ)
            const position = particles[i][Ny - j].position;

            // Update vertex
            positionAttribute.setXYZ(index, position.x, position.y, position.z);
        }
    }
    
    // Notify WebGL to upload the new positions to the GPU
    positionAttribute.needsUpdate = true;
    
    // Recompute normals for accurate light reflections on the folds
    clothGeometry.computeVertexNormals();
}

const timeStep = 1 / 60;
function animate() {
    requestAnimationFrame(animate);
    
    world.step(timeStep);
    updateParticles();
    
    renderer.render(scene, camera);
}
animate();
```
