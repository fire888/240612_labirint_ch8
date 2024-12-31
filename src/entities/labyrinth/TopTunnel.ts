import { createTileI } from "geometry/tile_I_crafted"
import { _M } from "geometry/_m"
import { createRandomDataForLine } from "geometry/lineGeomCrafted"
import * as THREE from 'three'
import { createDoor } from "geometry/door"


export class TopTunnel {
    W = 60
    N = 140
    mesh: THREE.Mesh
    meshCollision: THREE.Object3D
    meshDoorCollision: THREE.Object3D
    _doorMesh: THREE.Mesh

    init (data: any) {
        
        // corridor view mesh *************************************/
        const { dataForEnter } = data
        const randomData2 = createRandomDataForLine()

        const e = createTileI({ 
            paths: [dataForEnter.path, randomData2.path],
            colors: [dataForEnter.color, randomData2.color],
            forms: [dataForEnter.form, randomData2.form],
            n: this.N,
            w: this.W,
            key: 'n',
        })
        this.mesh = _M.createMesh({ v: e.v, c: e.c, material: data.material })


        // collision corridor *************************************/
        const vC = [
            ..._M.createPolygon(
                [-this.W / 2, 0, -1.5],
                [-this.W / 2, 0, 1.5],
                [this.W / 2, 0, 1.5],
                [this.W / 2, 0, -1.5],
            ),
            ..._M.createPolygon(
                [-this.W / 2, 0, -1.5],
                [this.W / 2, 0, -1.5],
                [this.W / 2, 3, -1.5],
                [-this.W / 2, 3, -1.5],
            ),
            ..._M.createPolygon(
                [this.W / 2, 0, 1.5],
                [-this.W / 2, 0, 1.5],
                [-this.W / 2, 3, 1.5],
                [this.W / 2, 3, 1.5],
            ),
        ]
        this.meshCollision = _M.createMesh({ v: vC, material: data.collisionMaterial })
        this.meshCollision.name = 'collision_lab_tunnel'

        const doorData = createDoor({
            color: dataForEnter.color,
            form: dataForEnter.form,
        })

        // door ***************************************************/ 
        this._doorMesh = _M.createMesh({
            v: doorData.v,
            c: doorData.c,
            material: data.material
        })
        this._doorMesh.position.z = this.W / 2 - (data.w * 3)
        this.mesh.add(this._doorMesh)

        this.meshDoorCollision = _M.createMesh({ 
            v: _M.createPolygon(
                [-3, -1, 0],
                [3, -1, 0],
                [3, 3, 0],
                [-3, 3, 0],
            ) 
        })
        this.meshDoorCollision.name = 'collision_lab_door'
    }

    destroy () {
        this.mesh.remove(this._doorMesh)
        this._doorMesh.geometry.dispose()
        this.mesh.geometry.dispose()
    }

    openDoor () {
        this._doorMesh.position.z = -50000
        this.meshDoorCollision.position.y = -500000
    }
}