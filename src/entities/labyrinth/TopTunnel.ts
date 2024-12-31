import { createTileI } from "geometry/tile_I_crafted"
import { _M } from "geometry/_m"
import { createRandomDataForLine } from "geometry/lineGeomCrafted"
import * as THREE from 'three'
import { createDoor } from "geometry/door"
import { Root } from "index"

type TopTunnelStartData = {
    color: number[],
    form: number[],
    path: number[][],
    material: THREE.MeshBasicMaterial,
    collisionMaterial: THREE.MeshBasicMaterial,
    w: number,
}


export class TopTunnel {
    W = 60
    N = 140
    mesh: THREE.Mesh
    meshCollision: THREE.Object3D
    meshDoorCollision: THREE.Object3D
    _doorMesh: THREE.Mesh

    init (root: Root, startData: TopTunnelStartData) {

        
        // corridor view mesh *************************************/
        const randomData2 = createRandomDataForLine()

        const e = createTileI({ 
            paths: [startData.path, randomData2.path],
            colors: [startData.color, randomData2.color],
            forms: [startData.form, randomData2.form],
            n: this.N,
            w: this.W,
            key: 'n',
        })
        this.mesh = _M.createMesh({ v: e.v, c: e.c, material: startData.material })


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
        this.meshCollision = _M.createMesh({ v: vC, material: startData.collisionMaterial })
        this.meshCollision.name = 'collision_lab_tunnel'

        const doorData = createDoor({
            color: startData.color,
            form: startData.form,
        })

        // door ***************************************************/ 
        this._doorMesh = _M.createMesh({
            v: doorData.v,
            c: doorData.c,
            material: startData.material
        })
        this._doorMesh.position.z = this.W / 2 - (startData.w * 3)
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