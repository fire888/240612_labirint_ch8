import * as THREE from 'three'
import { _M } from "../../geometry/_m";
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
    constructor() {}

    async init () {
        const WIDTH = 23
        const HEIGHT = 23
        const W = 3
        const H = 3

        const WC = W / 2 - .2

        this.mesh = new THREE.Object3D()
        this.mesh.position.y = .2
        this.mesh.position.z = -W * 23 / 2
        this.mesh.position.x = -W * 23 / 2

        let posEndLast = [11, 1]



        for (let i = 0; i < 3; ++i) {
            const {
                posStart,
                posEnd,
                markedMaze,
            } = await createScheme03({ width: WIDTH, height: HEIGHT, posStart: posEndLast })

            console.log('posStart', ...posStart)
            console.log('posEnd', ...posEnd)
            console.log('-------------------------')
            posEndLast = posEnd

            const v = []

            for (let i = 0; i < WIDTH; ++i) {
                for (let j = 0; j < HEIGHT; ++j) {
                    const { type, dir, model } = markedMaze[i + ',' + j]

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
            mesh.position.y = i * H

            {
                const b = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshPhongMaterial({ color: 0xff0000 })
                )
                b.position.x = W * posStart[0]
                b.position.z = W * posStart[1]
                mesh.add(b)
            }
            {
                const b = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshPhongMaterial({ color: 0xffff00 })
                )
                b.position.x = W * posEndLast[0]
                b.position.z = W * posEndLast[1]
                mesh.add(b)
            }


            this.mesh.add(mesh)
        }
    }
}
