import * as THREE from 'three'
import { _M } from "../../geometry/_m";
import { createScheme03 } from './scheme03';
import { createTileI } from '../../geometry/tile_I'
import { createTileL } from '../../geometry/tile_L'
import { createTileT } from '../../geometry/tile_T'
import { createTileU } from '../../geometry/tile_U'
import { createStair } from "../../geometry/stair";

const TUNNEL = 3


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
    //const uvF32 = new Float32Array(uv)
    //geometry.setAttribute('uv', new THREE.BufferAttribute(uvF32, 2))
    //const cF32 = new Float32Array(c)
    //geometry.setAttribute('color', new THREE.BufferAttribute(cF32, 3))
    return new THREE.Mesh(geometry, material)
}


export class Labyrinth {
    constructor() {
        this.collisionMech = null
    }

    async init () {
        const WIDTH = 23
        const HEIGHT = 23
        const W = 3
        const H = 3

        const WC = W / 2 - .2

        this.mesh = new THREE.Object3D()
        this.mesh.position.y = 0.08
        this.mesh.position.z = -W * 23 / 2
        this.mesh.position.x = -W * 23 / 2

        let posStartNext = [11, 1]

        const levelsData = []
        for (let i = 0; i < 4; ++i) {
            const {
                posStart,
                posEnd,
                markedMaze,
            } = await createScheme03({ width: WIDTH, height: HEIGHT, posStart: posStartNext })

            levelsData.push({ posStart, posEnd, markedMaze })

            posStartNext = posEnd
        }

        const collisionV = []

        for (let iFloor = 0; iFloor < levelsData.length; ++iFloor) {
            const { posStart, posEnd, markedMaze } = levelsData[iFloor]
            const v = []
            const vC = []

            for (let i = 0; i < WIDTH; ++i) {
                for (let j = 0; j < HEIGHT; ++j) {
                    if (!markedMaze[i + ',' + j]) {
                        continue;
                    }

                    const { type, dir, model } = markedMaze[i + ',' + j]

                    if (type !== TUNNEL) {
                        continue
                    }

                    const _v = []
                    const _vC = []


                    if (model === 'I') {
                        const r = createTileI({ w: W, h: H, wc: WC })
                        _v.push(...r.v)
                    }

                    if (model === 'L') {
                        const r = createTileL({ w: W, h: H, wc: WC })
                        _v.push(...r.v)
                    }

                    if (model === 'T') {
                        const r = createTileT({ w: W, h: H, wc: WC })
                        _v.push(...r.v)
                    }

                    if (model === 'U') {
                        const r = createTileU({ w: W, h: H, wc: WC })
                        _v.push(...r.v)
                    }

                    _M.rotateVerticesY(_v, dir)
                    _M.translateVertices(_v, i * W, 0, j * W)
                    v.push(..._v)


                    // collision
                    if (
                        model === 'I' ||
                        model === 'L' ||
                        model === 'T' ||
                        model === 'U' ||
                        model === 'X'
                    ) {
                        const y = .1
                        _vC.push(
                            ..._M.createPolygon(
                                [-W / 2, y, W / 2],
                                [W / 2, y, W / 2],
                                [W / 2, y, -W / 2],
                                [-W / 2, y, -W / 2],
                            )
                        )
                    }
                    _M.translateVertices(_vC, i * W, 0, j * W)
                    vC.push(..._vC)
                }
            }
            // make level




            let stairDataBottom = null
            for (let key in markedMaze) {
                if (markedMaze[key].model === 'END_ROOM') {
                    stairDataBottom = markedMaze[key]
                }
            }
            const { dir, i, j } = stairDataBottom
            let stairDataTop = null
            if (levelsData[iFloor + 1]) {
                const { markedMaze } = levelsData[iFloor + 1]
                for (let key in markedMaze) {
                    if (markedMaze[key].model === 'START_ROOM') {
                        stairDataTop = markedMaze[key]
                    }
                }
            }

            // stair /////////////////////
            if (stairDataBottom && stairDataTop) {
                console.log('****!!! ')
                const stair = createStair({ stairDataBottom, stairDataTop, W, WC, H })
                _M.translateVertices(stair.vC, W * i, 0, W * j)
                vC.push(...stair.vC)
                 _M.translateVertices(stair.v, W * i, 0, W * j)
                v.push(...stair.v)
            }

            const m = new THREE.MeshPhongMaterial({ color: 0xffffff })
            const mesh = createMesh({ v, material: m })
            mesh.position.y = iFloor * H

            // {
            //     const b = new THREE.Mesh(
            //         new THREE.BoxGeometry(H * 1.8, H * 1.8, H * 1.8),
            //         new THREE.MeshPhongMaterial({color: 0xff0000})
            //     )
            //     b.position.set(W * i, iFloor * H + H * .9, W * j)
            //     this.mesh.add(b)
            // }
            //
            {
                const b = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshPhongMaterial({ color: 0xff0000 })
                )
                b.position.x = W * posStart[0]
                b.position.z = W * posStart[1]
                mesh.add(b)
            }
            // {
            //     const b = new THREE.Mesh(
            //         new THREE.BoxGeometry(1, 1, 1),
            //         new THREE.MeshPhongMaterial({
            //             color: 0xffff00,
            //         })
            //     )
            //     b.position.x = W * posEnd[0]
            //     b.position.z = W * posEnd[1]
            //     mesh.add(b)
            // }





            this.mesh.add(mesh)

            _M.translateVertices(vC, 0, iFloor * H, 0)
            collisionV.push(...vC)
        }


        this.collisionMech = createMesh({
            v: collisionV,
            material: new THREE.MeshPhongMaterial({
                color: 0x0000ff,
                transparent: true,
                opacity: .2,
                side: THREE.DoubleSide
            })
        })
        this.collisionMech.position.z = -W * 23 / 2
        this.collisionMech.position.x = -W * 23 / 2
    }
}
