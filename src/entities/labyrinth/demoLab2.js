import * as THREE from 'three'
import { _M } from "../../geometry/_m";
import { createScheme04_crafted } from './scheme04';
import { createTileI } from '../../geometry/tile_I_crafted'
import { createTileL } from '../../geometry/tile_L_crafted'
import { createTileT } from '../../geometry/tile_T_crafted'
import { createTileU } from '../../geometry/tile_U_crafted'
import { createTileX } from '../../geometry/tile_X_crafted';
import { createStair } from "../../geometry/stair";

import {
    createMesh,
} from '../../geometry/helperCreateMesh'


const EMPTY = 1
const TUNNEL = 3
const STAIR = 4

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


const checkArray = arr => {
    if (!arr) {
        return false
    }

    if (arr.length) {
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] === undefined) {
                return false
            }

            if (typeof arr[i] === Object && arr[i].length) {
                for (let j = 0; j < arr[i].length; j ++) {
                    if (arr[i][j] === undefined) {
                        return false
                    }
                }
            }
        }
    }

    return true
}




export class Labyrinth02 {
    constructor () {
        this.collisionMech = null
    }

    async init () {
        const WIDTH = 23
        const HEIGHT = 23
        const W = 3
        const N = 10
        const H = 3

        const WC = W / 2 - .2

        this.mesh = new THREE.Object3D()
        this.mesh.position.y = 0.08
        this.mesh.position.z = -W * 23 / 2
        this.mesh.position.x = -W * 23 / 2

        const material = new THREE.MeshPhongMaterial({color: 0xffffff, vertexColors: true})

        const { maze } = await createScheme04_crafted({})

        const v = []
        const c = []

        for (let key in maze) {
            const tile = maze[key]
            
            if (
                tile.type === EMPTY ||
                tile.type === STAIR
            ) {
                continue;
            }

            const ij = key.split(',')
             

            let typeTile = null
            let angle = null

            if (
                tile.w && 
                tile.e &&
                !tile.n &&
                !tile.s
            ) {
                typeTile = 'I'
                angle = 0
            }
            if (
                tile.n && 
                tile.s &&
                !tile.e &&
                !tile.w
            ) {
                typeTile = 'I'
                angle = -Math.PI / 2
            }


            if (
                tile.s &&
                tile.e &&
                !tile.n &&
                !tile.w
            ) {
                typeTile = 'L'
                angle = 0
            }

            // if (
            //     tile.e &&
            //     tile.n &&
            //     !tile.w &&
            //     !tile.s
            // ) {
            //     typeTile = 'L'
            //     angle = 0
            // }

            // if (
            //     tile.n &&
            //     tile.w &&
            //     !tile.s &&
            //     !tile.e
            // ) {
            //     typeTile = 'L'
            //     angle = Math.PI * .5
            // }


            // if (
            //     tile.e &&
            //     tile.s &&
            //     tile.w &&
            //     !tile.n
            // ) {
            //     typeTile = 'T'
            //     angle = Math.PI
            // }

            // if (
            //     tile.s &&
            //     tile.e &&
            //     tile.n &&
            //     !tile.w
            // ) {
            //     typeTile = 'T'
            //     angle = Math.PI * 1.5
            // }

            // if (
            //     tile.e &&
            //     tile.n &&
            //     tile.w &&
            //     !tile.s
            // ) {
            //     typeTile = 'T'
            //     angle = 0
            // }
            

            
            // if (
            //     tile.n &&
            //     tile.w &&
            //     tile.s &&
            //     !tile.e
            // ) {
            //     typeTile = 'T'
            //     angle = Math.PI * .5
            // }




            // create buffers

            let e = null

            if (typeTile === 'I' && angle === 0) {
                if (
                    !checkArray(tile.w.path) ||
                    !checkArray(tile.e.path) ||
                    !checkArray(tile.w.color) ||
                    !checkArray(tile.e.color) ||
                    !checkArray(tile.w.form) ||
                    !checkArray(tile.e.form) 
                ) {
                    continue;
                }

                e = createTileI({ 
                    paths: [tile.w.path, tile.e.path],
                    colors: [tile.w.color, tile.e.color],
                    forms: [tile.w.form, tile.e.form],
                    n: N,
                    w: W,
                })
            }

            if (typeTile === 'I' && angle === -Math.PI / 2) {
                if (
                    !checkArray(tile.n.path) ||
                    !checkArray(tile.s.path) ||
                    !checkArray(tile.n.color) ||
                    !checkArray(tile.s.color) ||
                    !checkArray(tile.n.form) ||
                    !checkArray(tile.s.form) 
                ) {
                    continue;
                }

                e = createTileI({ 
                    paths: [tile.n.path, tile.s.path],
                    colors: [tile.n.color, tile.s.color],
                    forms: [tile.n.form, tile.s.form],
                    n: N,
                    w: W,
                })
            }

            if (typeTile === 'L' && angle === 0) {
                if (
                    !checkArray(tile.s.path) ||
                    !checkArray(tile.e.path)
                ) {
                    continue;
                }

                e = createTileL({ 
                    paths: [tile.s.path, tile.e.path],
                    colors: [tile.s.color, tile.e.color],
                    forms: [tile.s.form, tile.e.form],
                    n: N,
                    w: W,
                })
            }

            // if (typeTile === 'L' && angle === 0) {
            //     if (
            //         !checkArray(tile.e.path) ||
            //         !checkArray(tile.n.path)
            //     ) {
            //         continue;
            //     }

            //     e = createTileL({ 
            //         paths: [tile.e.path, tile.n.path],
            //         colors: [tile.e.color, tile.n.color],
            //         forms: [tile.e.form, tile.n.form],
            //         n: N,
            //         w: W,
            //     })
            // }

            // if (typeTile === 'L' && angle === Math.PI * .5) {
            //      if (
            //          !checkArray(tile.n.path) ||
            //          !checkArray(tile.w.path)
            //      ) {
            //          continue;
            //      }

            //     e = createTileL({ 
            //         paths: [tile.n.path, tile.w.path],
            //         colors: [tile.n.color, tile.w.color],
            //         forms: [tile.n.form, tile.w.form],
            //         n: N,
            //         w: W,
            //     })
            // }


            // if (typeTile === 'T' && angle === Math.PI) {
            //     if (
            //         !checkArray(tile.w.path) ||
            //         !checkArray(tile.s.path) ||
            //         !checkArray(tile.e.path)
            //     ) {
            //         continue;
            //     }

            //     e = createTileT({ 
            //         formW: tile.w.form,
            //         pathW: tile.w.path,
            //         colorW: tile.w.color,

            //         formS: tile.s.form,
            //         pathS: tile.s.path,
            //         colorS: tile.s.color,

            //         formE: tile.e.form,
            //         pathE: tile.e.path,
            //         colorE: tile.e.color,

            //         n: N,
            //         w: W,
            //     })
            // }

            // if (typeTile === 'T' && angle === Math.PI * 1.5) {
            //     if (
            //         !checkArray(tile.s.path) ||
            //         !checkArray(tile.e.path) ||
            //         !checkArray(tile.n.path)
            //     ) {
            //         continue;
            //     }

            //     e = createTileT({ 
            //         formW: tile.s.form,
            //         pathW: tile.s.path,
            //         colorW: tile.s.color,

            //         formS: tile.e.form,
            //         pathS: tile.e.path,
            //         colorS: tile.e.color,

            //         formE: tile.n.form,
            //         pathE: tile.n.path,
            //         colorE: tile.n.color,

            //         n: N,
            //         w: W,
            //     })
            // }

            
            // if (typeTile === 'T' && angle === 0) {
            //     if (
            //         !checkArray(tile.e.path) ||
            //         !checkArray(tile.n.path) ||
            //         !checkArray(tile.w.path)
            //     ) {
            //         continue;
            //     }

            //     e = createTileT({ 
            //         formW: tile.e.form,
            //         pathW: tile.e.path,
            //         colorW: tile.e.color,

            //         formS: tile.n.form,
            //         pathS: tile.n.path,
            //         colorS: tile.n.color,

            //         formE: tile.w.form,
            //         pathE: tile.w.path,
            //         colorE: tile.w.color,

            //         n: N,
            //         w: W,
            //     })
            // }

            // if (typeTile === 'T' && angle === .5) {
            //     if (
            //         !checkArray(tile.n.path) ||
            //         !checkArray(tile.w.path) ||
            //         !checkArray(tile.s.path)
            //     ) {
            //         continue;
            //     }

            //     e = createTileT({ 
            //         formW: tile.n.form,
            //         pathW: tile.n.path,
            //         colorW: tile.n.color,

            //         formS: tile.w.form,
            //         pathS: tile.w.path,
            //         colorS: tile.w.color,

            //         formE: tile.s.form,
            //         pathE: tile.s.path,
            //         colorE: tile.s.color,

            //         n: N,
            //         w: W,
            //     })
            // }

            if (e) {
                _M.rotateVerticesY(e.v, angle)
                _M.translateVertices(e.v, +ij[0] * W, 0, +ij[1] * W)
                v.push(...e.v)
                c.push(...e.c)
            }
        }

        const m = createMesh({ v, c, material: new THREE.MeshPhongMaterial({ color: 0xFFFFFF, vertexColors: true }) })
        this.mesh = m
    }
}
