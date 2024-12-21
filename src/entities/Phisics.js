import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import CannonDebugger from 'cannon-es-debugger'
import { timerDelta } from 'three/examples/jsm/nodes/Nodes'

const createTrimesh = geometry => {
    const vertices = geometry.attributes.position.array
    const indices = Object.keys(vertices).map(Number)
    return new CANNON.Trimesh(vertices, indices)
}

export class Phisics {
    _cbsOnCollision = []
    _bodies = []

    init (root) {
        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.82, 0)
        this.world.quatNormalizeSkip = 0;
        this.world.quatNormalizeFast = false;

        var solver = new CANNON.GSSolver()

        this.world.defaultContactMaterial.contactEquationStiffness = 1e9
        this.world.defaultContactMaterial.contactEquationRelaxation = 4

        solver.iterations = 7
        solver.tolerance = 0.1
        this.world.solver = new CANNON.SplitSolver(solver);

        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.broadphase.useBoundingBoxes = true;

        // Create a slippery material (friction coefficient = 0.0)
        this.physicsMaterial = new CANNON.Material("slipperyMaterial");
        var physicsContactMaterial = new CANNON.ContactMaterial(
            this.physicsMaterial,
            this.physicsMaterial,
            {
                //friction: 0.1, // friction coefficient
               // restitution: 1  // restitution
                friction: 0.0,
                restitution: 1.0
            },

        );
        // We must add the contact materials to the world
        this.world.addContactMaterial(physicsContactMaterial);

        this.ground = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Box(new CANNON.Vec3(50, 0.1, 50)),
        })
        //this.ground.scale.set(1000, 1, 1000)
        this.ground._myName = 'ground'
        //this.ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
        this.world.addBody(this.ground)

        this._levelsPhisicsMeshes = []

        // this.cannonDebugger = new CannonDebugger(root.studio.scene, this.world, {})
    }

    createPlayerPhisicsBody (playerPosition, playerRotationY) {
        const sphere = new CANNON.Sphere(.5);
        this.playerBody = new CANNON.Body({ 
            mass: 5,
            linearDamping: 0.9,
        })
        this.playerBody._myName = 'playerBody'
        this.playerBody.addShape(sphere)

        this.playerBody.position.x = 15.076315508474185
        this.playerBody.position.y = 3
        this.playerBody.position.z = -10

        this.playerBody._object3D = new THREE.Object3D()
        this.playerBody._object3D.position.set(this.playerBody.position.x, this.playerBody.position.y, this.playerBody.position.z)
        this.playerBody._object3D.rotation.y = Math.PI

        this.world.addBody(this.playerBody)
    }
    
    addMeshToCollision (mesh, nameSpace = '') {
        const cannonShape = createTrimesh(mesh.geometry)
        const body = new CANNON.Body({ 
            mass: 0, 
            type: CANNON.Body.STATIC, 
        })
        body.addShape(cannonShape)
        body._myName = mesh.name
        body._nameSpace = nameSpace
        //body.collisionResponse = 0;

        body.position.x = mesh.position.x
        body.position.y = mesh.position.y
        body.position.z = mesh.position.z
        
        this.world.addBody(body)
        this._bodies.push(body)

        if (nameSpace === '') {
            return;
        }

        body.addEventListener("collide", e => {
            for (let i = 0; i < this._cbsOnCollision.length; ++i) {
                if (this._cbsOnCollision[i][0] !== nameSpace) {
                    continue;
                }
                this._cbsOnCollision[i][1](e.target._myName)
            }
        })
    }

    onCollision (meshNameIncludeStr, f) {
        this._cbsOnCollision.push([meshNameIncludeStr, f])
    }

    removeMeshFromCollision (name) {
        for (let i = 0; i < this._bodies.length; ++i) {
            if (this._bodies[i]._myName !== name) {
                continue
            }
            this._bodies[i].position.y = -100000
        }
    }

    /**
     * Updates the physics world by fixed time step.
     * @param {number} delta - Time elapsed since last frame.
     */
    update (delta) {
        if (!this.playerBody) {
            return;
        }
        this.world.fixedStep()
        this.cannonDebugger && this.cannonDebugger.update()
    }
}