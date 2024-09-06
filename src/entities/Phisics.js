import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import CannonDebugger from 'cannon-es-debugger'

const createTrimesh = geometry => {
    const vertices = geometry.attributes.position.array
    const indices = Object.keys(vertices).map(Number)
    return new CANNON.Trimesh(vertices, indices)
}

export class Phisics {
    constructor () {

    }

    init (root) {
        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.82, 0)

        this.ground = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
        })
        this.ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
        this.world.addBody(this.ground)
        
        this.cannonDebugger = new CannonDebugger(root.studio.scene, this.world, {})
    }

    createPlayerPhisicsBody (playerPosition, playerRotationY) {
        const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
        this.playerBody = new CANNON.Body({ mass: 1 })
        this.playerBody.addShape(cubeShape)
        this.playerBody.position.x = playerPosition.x
        this.playerBody.position.y = playerPosition.y
        this.playerBody.position.z = playerPosition.z

        this.playerBody._object3D = new THREE.Object3D()
        this.playerBody._object3D.position.set(playerPosition.x, playerPosition.y, playerPosition.z)

        this.world.addBody(this.playerBody)

        console.log(this.playerBody)
    }
    
    addMeshToCollision (mesh) {
        // const cannonShape = createTrimesh(mesh.geometry)
        // const body = new CANNON.Body({ mass: 0 })
        // body.addShape(cannonShape)
    
        // body.position.x = mesh.position.x
        // body.position.y = mesh.position.y
        // body.position.z = mesh.position.z

        // //body.rotation.x = mesh.rotation.x
        // //body.rotation.y = mesh.rotation.y
        // //body.rotation.z = mesh.rotation.z
        
        // this.world.addBody(body)
        // console.log('JJJ', body)
    }

    update (delta) {
        if (!this.playerBody) {
            return;
        }
        this.playerBody.position.x = this.playerBody._object3D.position.x
        this.playerBody.position.z = this.playerBody._object3D.position.z

        this.playerBody.quaternion.copy(this.playerBody._object3D.quaternion)


        this.world.fixedStep()
        this.cannonDebugger.update()
    }
}