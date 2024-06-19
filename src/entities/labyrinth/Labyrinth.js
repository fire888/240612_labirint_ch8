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
        const W = 3
        const H = 3

        const WC = W / 2 - .2

        this.mesh = new THREE.Object3D()
        this.mesh.position.y = .2
        this.mesh.position.z = -W * 23 / 2
        this.mesh.position.x = -W * 23 / 2

        {
            const maze = await createScheme03(23, 23)

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


                    _M.rotateVerticesY(tunnelV, dir)
                    _M.translateVertices(tunnelV, i * W, 0, j * W)
                    v.push(...tunnelV)
                }
            }

            const m = new THREE.MeshPhongMaterial({ color: 0xffffff })

            const mesh = createMesh({ v, material: m })
            this.mesh.add(mesh)

        }

        {
            const maze = await createScheme03(23, 23)


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


                    _M.rotateVerticesY(tunnelV, dir)
                    _M.translateVertices(tunnelV, i * W, 0, j * W)
                    v.push(...tunnelV)
                }
            }

            const m = new THREE.MeshPhongMaterial({ color: 0xffffff })

            const mesh = createMesh({ v, material: m })
            mesh.position.y = 3
            this.mesh.add(mesh)
        }

        {
            const maze = await createScheme03(23, 23)


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


                    _M.rotateVerticesY(tunnelV, dir)
                    _M.translateVertices(tunnelV, i * W, 0, j * W)
                    v.push(...tunnelV)
                }
            }

            const m = new THREE.MeshPhongMaterial({ color: 0xffffff })

            const mesh = createMesh({ v, material: m })
            mesh.position.y = 6
            this.mesh.add(mesh)
        }
    }
}
