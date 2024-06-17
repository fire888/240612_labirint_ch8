import * as THREE from 'three'
import { createBuffer00 } from '../../geometry/buffer00'
import { _M } from "../../geometry/_m";
import { createWall00 } from "../../geometry/wall00"
import { createScheme } from './scheme02';

export const createMesh = ({

    v = [],
    uv = [],
    c = [],
    material = new THREE.MeshBasicMaterial({ color: 0x777777 })

                           }) => {

    const geometry = new THREE.BufferGeometry()
    const vF32 = new Float32Array(v)
    geometry.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
    geometry.computeVertexNormals()
    const uvF32 = new Float32Array(uv)
    //geometry.setAttribute('uv', new THREE.BufferAttribute(uvF32, 2))
    //const cF32 = new Float32Array(c)
    //geometry.setAttribute('color', new THREE.BufferAttribute(cF32, 3))
    return new THREE.Mesh(geometry, material)
}


export class Labyrinth {
    constructor() {

    }

    async init () {
        const maze = await createScheme(23, 23)
        console.log(maze)





        const v = []

        for (let i = 0; i < 23; ++i) {
            for (let j = 0; j < 23; ++j) {
                const { type, dir } = maze[i + ',' + j]

                if (type !== 0) {
                    continue
                }

                const tunnelV = []
                const rL = createWall00({ w: 2, h: 3 })
                _M.translateVertices(rL.v, -1, 0, .5)
                tunnelV.push(...rL.v)

                const rR = createWall00({ w: 2, h: 3 })
                _M.translateVertices(rR.v, -1, 0, -.5)
                tunnelV.push(...rR.v)

                const rT = createWall00({ w: 2, h: 1 })
                _M.rotateVerticesX(rT.v, Math.PI / 2)
                _M.translateVertices(rT.v, -1, 3, -.5)
                tunnelV.push(...rT.v)

                if (dir === 'n' || dir === 's') {
                    _M.rotateVerticesY(tunnelV, Math.PI / 2)
                }


                _M.translateVertices(tunnelV, i * 2, 0, j * 2)
                v.push(...tunnelV)
            }
        }


        // {
        //     const r = createWall00({ w: 10, h: 5 })
        //     v.push(...r.v)
        // }

        // {
        //     const r = createWall00({ w: 10, h: 10 })
        //     _M.translateVertices(r.v, 0, 0, -10)
        //     v.push(...r.v)
        // }

        // {
        //     const r = createWall00({ w: 10, h: 10 })
        //     _M.rotateVerticesY(r.v, Math.PI / 2)
        //     _M.translateVertices(r.v, 10, 0, 0)
        //     v.push(...r.v)
        // }
        // {
        //     const r = createWall00({ w: 10, h: 10 })
        //     _M.rotateVerticesY(r.v, Math.PI / 2)
        //     v.push(...r.v)
        // }

        const m = new THREE.MeshPhongMaterial({ color: 0xffffff })

        this.mesh = new THREE.Object3D()
        this.mesh.position.y = .2

        for (let i = 0; i < 1; ++i) {
            //for (let j = 0; j < 2; ++j) {
                const mesh = createMesh({
                    v,
                    material: m,
                })
                mesh.position.x += i * 12
                //mesh.position.z -= j * 12
                this.mesh.add(mesh)
            //}
        }
    }
}
