import * as THREE from 'three'
import { _M } from "../../geometry/_m";
import { createScheme03 } from './scheme03';
import { createTileI } from '../../geometry/tile_I_crafted'
import { createTileL } from '../../geometry/tile_L_crafted'
import { createTileT } from '../../geometry/tile_T_crafted'
import { createTileU } from '../../geometry/tile_U_crafted'
import { createTileX } from '../../geometry/tile_X_crafted';
import { createStair } from "../../geometry/stair";

import { createDemoTiles } from './demoTiles';

import { createLineGeom  } from 'geometry/lineGeom';

import {
    createMesh,
} from '../../geometry/helperCreateMesh'


const form1 = [
    0, .05, .05,
    0, .05, -.05,
    0, .0, .0,
]

const form2 = [
    0, .03, .03,
    0, .03, -.03,
    0, .0, .0,
]

const form3 = [
    0, .05, .05,
    0, .05, -.05,
    0, .0, .0,
]

const form4 = [
    0, .05, .05,
    0, .05, -.05,
    0, .01, .0,
]


const path1 = [
    [.9, 0, 0],
    [1.2, 1.4, 0],
    [0, 2.5, 0],
    [-1.2, 1.4, 0],
    [-.9, 0, 0],
]

const path2 = [
    [.9, .2, 0],
    [1.2, 1.3, 0],
    [0, 2.2, 0],
    [-2, 1.3, 0],
    [-.9, .2, 0],
]

const path3 = [
    [.5, 0, 0],
    [1.7, 1.4, 0],
    [0, 2, 0],
    [-1, 1.4, 0],
    [-.5, 0, 0],
]

const color1 = [1, 1, 1]
const color2 = [.3, 1, 1]
const color3 = [0, 0, 1]
const color4 = [0, 1, 1]

const forms = [form1, form2, form3, form4]
const paths = [path1, path2, path3, path1]
const colors = [color1, color2, color3, color4]

const n = 20



const TUNNEL = 3
const N_FLOORS = 5

export class Labyrinth {
    constructor () {
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

        const material = new THREE.MeshPhongMaterial({ color: 0xffffff, vertexColors: true })

        this.collisionMesh = new THREE.Object3D()
        this.collisionMesh.position.z = -W * 23 / 2
        this.collisionMesh.position.x = -W * 23 / 2
        this.collideMat = new THREE.MeshPhongMaterial({ color: 0xFF0000 })


        this.exitPoint = []
        this.exitDir = null


        // test demo debug
        const meshDemoTiles = createDemoTiles({ W, H, WC })
        this.mesh.add(meshDemoTiles)


        let posStartNext = [11, 1]

        const levelsData = []
        let nextStartDirection = 's'
        for (let i = 0; i < 4; ++i) {
            const {
                posStart,
                posEnd,
                markedMaze,
                endDir
            } = await createScheme03({ width: WIDTH, height: HEIGHT, posStart: posStartNext, startDirection: nextStartDirection, })

            levelsData.push({ posStart, posEnd, markedMaze })

            posStartNext = posEnd

            let arr = ['e', 'n', 'w', 's']
            // check not same direction in stair
            arr = arr.filter(e => e !== endDir) 
            // check end side of level
            if (posEnd[0] < 3) {
                arr = arr.filter(e => e !== 'w')
            } 
            if (posEnd[0] > WIDTH - 3) {
                arr = arr.filter(e => e !== 'e')
            } 
            if (posEnd[1] < 3) {
                arr = arr.filter(e => e !== 'n')
            } 
            if (posEnd[1] > WIDTH - 3) {
                arr = arr.filter(e => e !== 's')
            } 
            nextStartDirection = arr[Math.floor(Math.random() * arr.length)]
        }

        console.log('Levels: ', levelsData)



        // create start stair
        {
            const stair = createStair({ stairDataBottom: { dir: 'n' }, stairDataTop: { dir: 's' }, W, WC, H })
            const m = createMesh({ v: stair.v, material: material })
            m.position.x = Math.floor(WIDTH / 2) * W
            m.position.z = 1 * W
            this.mesh.add(m)

            const meshCollide = createMesh({ v: stair.vC, material: this.collideMat })
            meshCollide.position.x = Math.floor(WIDTH / 2) * W
            meshCollide.position.z = 1 * W
            meshCollide.visible = false
            this.collisionMesh.add(meshCollide)
        }



        for (let iFloor = 0; iFloor < levelsData.length; ++iFloor) {
            const { markedMaze } = levelsData[iFloor]
            const v = []
            const c = []
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
                        //const r = createTileI({ w: W, h: H, wc: WC })
                        const r = createTileI({             
                            w: W, 
                            n: 10,
                            forms: [form1, form2, form1],
                            paths: [path1, path2, path1],
                            colors: [color1, color2, color1]
                        })
                        c.push(...r.c)
                        _v.push(...r.v)
                    }

                    if (model === 'L') {
                        //const r = createTileL({ w: W, h: H, wc: WC })
                        const r = createTileL({
                            w: W, 
                            n: 10,
                            forms: [form1, form2, form1],
                            paths: [path1, path2, path1],
                            colors: [color1, color2, color1],
                        })
                        c.push(...r.c)
                        _v.push(...r.v)
                    }

                    if (model === 'T') {
                        const 
                        w = W, 
                        n = 7,
                        formS = forms[0],
                        formE = forms[1],
                        formW = forms[2],
                        pathS = paths[0],
                        pathE = paths[1],
                        pathW = paths[2],
                        colorS = colors[0],
                        colorW = colors[1],
                        colorE = colors[2]
            
            
                        const r = createTileT({ 
                            w, 
                            n,
                            formS: form1,
                            formE: form1,
                            formW: form1,
                            pathS: path1,
                            pathE: path1,
                            pathW: path1,
                            colorS: color1,
                            colorW: color1,
                            colorE: color1,
                        })
                       c.push(...r.c)
                       _v.push(...r.v)
                    }

                    if (model === 'U') {
                        const r = createTileU({
                            w: W,
                            n: 5,
                            forms: [form1, form2],
                            paths: [path1, path2],
                            colors: [color1, color2],
                        })
                        c.push(...r.c)
                        _v.push(...r.v)
                    }

                    if (model === 'X') {
                        const
                            w = W,
                            n = 7,
                            formS = forms[0],
                            formE = forms[1],
                            formW = forms[2],
                            formN = forms[3],
                            pathS = paths[0],
                            pathE = paths[1],
                            pathW = paths[2],
                            pathN = paths[3],
                            colorS = colors[0],
                            colorW = colors[1],
                            colorE = colors[2],
                            colorN = colors[3]

                        const r = createTileX({
                            w,
                            n,
                            formS,
                            formE,
                            formW,
                            formN,
                            pathS,
                            pathE,
                            pathW,
                            pathN,
                            colorS,
                            colorW,
                            colorE,
                            colorN,
                        })
                        c.push(...r.c)
                        _v.push(...r.v)
                    }

                    _M.rotateVerticesY(_v, dir)
                    _M.translateVertices(_v, i * W, 0, j * W)
                    v.push(..._v)


                    // collision
                    // TODO: MOVE TO TILE
                    {
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
            }

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

            // top stair
            if (!stairDataTop && iFloor === levelsData.length - 1) {
                let arr = ['e', 'n', 'w', 's']
                // check not same direction in stair

                arr = arr.filter(e => e !== stairDataBottom.dir) 
                // check end side of level
                if (i < 3) {
                    arr = arr.filter(e => e !== 'w')
                } 
                if (i > WIDTH - 3) {
                    arr = arr.filter(e => e !== 'e')
                } 
                if (j < 3) {
                    arr = arr.filter(e => e !== 'n')
                }
                if (j > WIDTH - 3) {
                    arr = arr.filter(e => e !== 's')
                } 
                nextStartDirection = arr[Math.floor(Math.random() * arr.length)]
                stairDataTop = { dir: nextStartDirection }

                this.exitPoint = [i, j]
                this.exitDir = nextStartDirection
            }

            if (stairDataBottom && stairDataTop) {
                const stair = createStair({ stairDataBottom, stairDataTop, W, WC, H })
                _M.translateVertices(stair.vC, W * i, 0, W * j)
                vC.push(...stair.vC)
                _M.translateVertices(stair.v, W * i, 0, W * j)
            }

            const mesh = createMesh({ v, c, material: material })
            mesh.position.y = iFloor * H + H

            const meshCollide = createMesh({ v: vC, material: this.collideMat })
            meshCollide.visible = false
            meshCollide.position.y = iFloor * H + H

            this.mesh.add(mesh)
            this.collisionMesh.add(meshCollide)
        }
    }
}
