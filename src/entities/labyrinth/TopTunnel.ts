import { createTileI } from "geometry/tile_I_crafted"
import { _M, A3 } from "geometry/_m"
import { createRandomDataForLine } from "geometry/lineGeomCrafted"
import * as THREE from 'three'
import { createDoor } from "geometry/door"
import { Root } from "index"
import * as TWEEN from '@tweenjs/tween.js'

type TopTunnelStartData = {
    color: [number, number, number],
    form: number[],
    path: A3[],
    material: THREE.MeshBasicMaterial,
    collisionMaterial: THREE.MeshBasicMaterial,
    w: number,
}

type GeometryData = {
    v: number[],
    c?: number[],
    vC?: number[], 
}


export class TopTunnel {
    W = 60
    N = 140
    mesh: THREE.Mesh
    meshCollision: THREE.Object3D
    meshDoorCollision: THREE.Object3D
    _doorMesh: THREE.Mesh
    _doorDataOpened: GeometryData

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
            width: 5,
        })
        
        this._doorDataOpened = createDoor({
            color: startData.color,
            form: startData.form,
            width: .2,
        })
        _M.translateVertices(this._doorDataOpened.v, 0, 1, 0)

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

    async openDoor () {
        this.meshDoorCollision.position.y = -500000

        return new Promise((resolve, reject) => {
            const vZ: number[] = []
            const { array } = this._doorMesh.geometry.attributes.position

            const obj = { v: 0 }
            new TWEEN.Tween(obj)
                .easing(TWEEN.Easing.Exponential.InOut)
                .to({ v: 1 }, 1000)
                .onUpdate(() => {
                    const mV = []
                    for (let i = 0; i < array.length; ++i) {
                        mV.push(
                            array[i] + (this._doorDataOpened.v[i] - array[i]) * obj.v, 
                        )
                    }
                    this._doorMesh.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(mV), 3))
                    this._doorMesh.geometry.computeVertexNormals()
                    this._doorMesh.geometry.attributes.position.needsUpdate = true
                    //this._doorMesh.rotation.z = obj.v * Math.PI * 2
                })
                .onComplete(() => {
                    const { array } = this._doorMesh.geometry.attributes.position
                    const target: number[] = []

                    for (let i = 0; i < array.length; i += 3) {
                        target.push(
                            array[i],
                            0,
                            array[i + 2], 
                        )
                    }

                    const obj = { v: 0 }
                    new TWEEN.Tween(obj)
                        .easing(TWEEN.Easing.Exponential.InOut)
                        .to({ v: 1 }, 1000)
                        .onUpdate(() => {
                            const mV = []
                            for (let i = 0; i < array.length; ++i) {
                                mV.push(array[i] + (target[i] - array[i]) * obj.v,)
                            }
                            this._doorMesh.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(mV), 3))
                            this._doorMesh.geometry.computeVertexNormals()
                            this._doorMesh.geometry.attributes.position.needsUpdate = true
                            //this._doorMesh.rotation.y = obj.v * Math.PI * 2
                        })
                        .onComplete(() => {
                            this._doorMesh.position.y = -10000
                            resolve(true)
                        })
                        .start()
                })
                .start()
        })
    }

    destroy () {
        this.mesh.remove(this._doorMesh)
        this._doorMesh.geometry.dispose()
        this.mesh.geometry.dispose()
    }
}