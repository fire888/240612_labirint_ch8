import * as THREE from 'three'
import { _M } from "../../geometry/_m";
import { createScheme03 } from './scheme03';
import { createTileI } from '../../geometry/tile_I'
import { createTileL } from '../../geometry/tile_L'
import { createTileT } from '../../geometry/tile_T'
import { createTileU } from '../../geometry/tile_U'
import { createStair } from "../../geometry/stair";

import { createLineGeom  } from 'geometry/lineGeom';

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


const makeCreaterSquare = ({ w }) => {
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })
    const linePoints = [
        new THREE.Vector3(-w / 2, 0, -w / 2),
        new THREE.Vector3(-w / 2, 0, w / 2),
        new THREE.Vector3(w / 2, 0, w / 2),
        new THREE.Vector3(w / 2, 0, -w / 2),
        new THREE.Vector3(-w / 2, 0, -w / 2),
    ]
    const geometry = new THREE.BufferGeometry().setFromPoints(linePoints)

    return () => {
        return new THREE.Line(geometry, lineMaterial)
    }
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

        this.collisionMech = new THREE.Object3D()
        this.collisionMech.position.z = -W * 23 / 2
        this.collisionMech.position.x = -W * 23 / 2
        this.collideMat = new THREE.MeshPhongMaterial({ color: 0xFF0000 })


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

        console.log('Levels: ', levelsData)


        // demo tiles

        const makeScuare = makeCreaterSquare({ w: W })

        const _v = []
        {
            const r = createTileI({ w: W, h: H, wc: WC })
            _v.push(...r.v)

            const line = makeScuare() 
            line.position.z = 15
            line.position.y = 15
            this.mesh.add(line)
        }

        {
            const r = createTileL({ w: W, h: H, wc: WC })
            _M.translateVertices(r.v, W * 2, 0, 0)
            _v.push(...r.v)

            const line = makeScuare() 
            line.position.z = 15
            line.position.y = 15
            line.position.x = W * 2
            this.mesh.add(line)
        }

        {
            const r = createTileT({ w: W, h: H, wc: WC })
            _M.translateVertices(r.v, W * 4, 0, 0)
            _v.push(...r.v)

            const line = makeScuare() 
            line.position.z = 15
            line.position.y = 15
            line.position.x = W * 4
            this.mesh.add(line)
        }

        {
            const r = createTileU({ w: W, h: H, wc: WC })
            _M.translateVertices(r.v, W * 6, 0, 0)
            _v.push(...r.v)

            const line = makeScuare() 
            line.position.z = 15
            line.position.y = 15
            line.position.x = W * 6
            this.mesh.add(line)
        }

        const m = createMesh({ v: _v, material: this.collideMat })
        m.position.z = 15
        m.position.y = 15
        this.mesh.add(m)


        // / demo tiles



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



            // stair /////////////////////
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
            if (stairDataBottom && stairDataTop) {
                const stair = createStair({ stairDataBottom, stairDataTop, W, WC, H })
                _M.translateVertices(stair.vC, W * i, 0, W * j)
                vC.push(...stair.vC)
                 _M.translateVertices(stair.v, W * i, 0, W * j)
                v.push(...stair.v)
            }

            console.log('&&&&', v.length)

            const m = new THREE.MeshPhongMaterial({ color: 0xffffff })
            const mesh = createMesh({ v, material: m })
            mesh.position.y = iFloor * H

            const meshCollide = createMesh({ v: vC, material: this.collideMat })
            meshCollide.visible = false
            meshCollide.position.y = iFloor * H


            // {
            //     const b = new THREE.Mesh(
            //         new THREE.BoxGeometry(1, 1, 1),
            //         new THREE.MeshPhongMaterial({ color: 0xff0000 })
            //     )
            //     b.position.x = W * posStart[0]
            //     b.position.z = W * posStart[1]
            //     mesh.add(b)
            // }
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
            this.collisionMech.add(meshCollide)
        }
    }
}
