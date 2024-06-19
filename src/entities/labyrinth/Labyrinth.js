import * as THREE from 'three'
import { createBuffer00 } from '../../geometry/buffer00'
import { _M } from "../../geometry/_m";
import { createWall00 } from "../../geometry/wall00"
import { createScheme } from './scheme02';
import { createScheme03 } from './scheme03';
import { createTileI } from '../../geometry/tile_I'
import { createTileL } from '../../geometry/tile_L'
import { createTileT } from '../../geometry/tile_T'
import { createTileU } from '../../geometry/tile_U'

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
        const maze = await createScheme03(23, 23)
        console.log('markedMaze', maze)

        const W = 3
        const H = 3

        const WC = W / 2 - .2


        const v = []

        for (let i = 0; i < 23; ++i) {
            for (let j = 0; j < 23; ++j) {
                const { type, dir, model } = maze[i + ',' + j]

                if (type !== 3) {
                    continue
                }

                const tunnelV = []

                if (model === 'I') {
                    const r = createTileI({ w: W, h: H, wc: WC })
                    tunnelV.push(...r.v)
                }

                if (model === 'L') {
                    const r = createTileL({ w: W, h: H, wc: WC })
                    tunnelV.push(...r.v)
                }

                if (model === 'T') {
                    const r = createTileT({ w: W, h: H, wc: WC })
                    tunnelV.push(...r.v)
                }

                if (model === 'U') {
                    const r = createTileU({ w: W, h: H, wc: WC })
                    tunnelV.push(...r.v)
                }
                //
                // if (model === 'U') {
                //     const rL = createWall00({ w: W, h: H })
                //     _M.translateVertices(rL.v, -1, 0, .5)
                //     tunnelV.push(...rL.v)
                //
                //     const rR = createWall00({ w: W, h: H })
                //     _M.translateVertices(rR.v, -1, 0, -.5)
                //     tunnelV.push(...rR.v)
                //
                //     const rC = createWall00({ w: W, h: H })
                //     _M.rotateVerticesY(rC.v, Math.PI * .5)
                //     _M.translateVertices(rC.v, -1, 0, .5)
                //     tunnelV.push(...rC.v)
                // }
                //
                // if (model === 'L') {
                //     const rInner1 = createWall00({ w: .3, h: H })
                //     _M.translateVertices(rInner1.v, .3, 0, .5)
                //     tunnelV.push(...rInner1.v)
                //
                //     const rInner2 = createWall00({ w: .3, h: H })
                //     _M.rotateVerticesY(rInner2.v, Math.PI * .5)
                //     _M.translateVertices(rInner2.v, .3, 0, .8)
                //     tunnelV.push(...rInner2.v)
                //
                //     const rOuter1 = createWall00({ w: 1.5, h: H })
                //     _M.translateVertices(rOuter1.v, -0.8, 0, -.5)
                //     tunnelV.push(...rOuter1.v)
                //
                //     const rOuter2 = createWall00({ w: 1.5, h: H })
                //     _M.rotateVerticesY(rOuter2.v, Math.PI * .5)
                //     _M.translateVertices(rOuter2.v, -0.8, 0, .8)
                //     tunnelV.push(...rOuter2.v)
                // }
                //
                // if (model === 'T') {
                //     const rL = createWall00({ w: W, h: H })
                //     _M.translateVertices(rL.v, -1, 0, -.5)
                //     tunnelV.push(...rL.v)
                // }


                _M.rotateVerticesY(tunnelV, dir)
                _M.translateVertices(tunnelV, i * W, 0, j * W)
                v.push(...tunnelV)
            }
        }

        const m = new THREE.MeshPhongMaterial({ color: 0xffffff })

        this.mesh = new THREE.Object3D()
        this.mesh.position.y = .2
        const mesh = createMesh({ v, material: m })
        this.mesh.add(mesh)
    }
}
