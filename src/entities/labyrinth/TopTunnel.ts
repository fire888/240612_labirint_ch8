import { createTileI } from "geometry/tile_I_crafted"
import { _M } from "geometry/_m"
import { createRandomDataForLine } from "geometry/lineGeomCrafted"
import * as THREE from 'three'


export class TopTunnel {
    W = 60
    N = 140
    mesh: THREE.Object3D
    meshCollision: THREE.Object3D 

    init (data: any) {
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
        this.meshCollision = _M.createMesh({ v: e.v, c: e.c, material: data.collisionMaterial })
    }
}