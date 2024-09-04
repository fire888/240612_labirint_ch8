import * as CANNON from 'cannon-es'

const createTrimesh = geometry => {
    const vertices = geometry.attributes.position.array
    const indices = Object.keys(vertices).map(Number)
    return new CANNON.Trimesh(vertices, indices)
}

export class Phisics {
    constructor () {

    }

    init () {
        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.82, 0)
    }

    createPlayerPhisicsBody (playerPosition, playerRotationY) {
        const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
        this.playerBody = new CANNON.Body({ mass: 1 })
        this.playerBody.addShape(cubeShape)
        this.playerBody.position.x = playerPosition.x
        this.playerBody.position.y = playerPosition.y
        this.playerBody.position.z = playerPosition.z

        //this.playerBody.rotation.y = playerRotationY
        //this.playerBody.rotation.z = 0
        this.world.addBody(this.playerBody)
    }
    
    addMeshToCollision (mesh) {
        const cannonShape = createTrimesh(mesh.geometry)
        const body = new CANNON.Body({ mass: 0 })
        body.addShape(cannonShape)
    
        body.position.x = mesh.position.x
        body.position.y = mesh.position.y
        body.position.z = mesh.position.z

        //body.rotation.x = mesh.rotation.x
        //body.rotation.y = mesh.rotation.y
        //body.rotation.z = mesh.rotation.z
        
        this.world.addBody(body)
    }

    update (delta) {
        this.world.step(delta)
    }
}