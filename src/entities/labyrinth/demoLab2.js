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

    async init (root) {
        const WIDTH = 23
        const HEIGHT = 23
        const W = 3
        const N = 5
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
            let keyDir = null

            if (
                tile.s && 
                tile.n &&
                !tile.w &&
                !tile.e
            ) {
                typeTile = 'I'
                angle = 0
            }
            if (
                tile.w && 
                tile.e &&
                !tile.s &&
                !tile.n
            ) {
                typeTile = 'I'
                angle = -Math.PI * .5
            }

            ///////////////

            if (
                tile.s &&
                tile.e &&
                !tile.n &&
                !tile.w
            ) {
                typeTile = 'L'
                keyDir = 'se'
                angle = 0
            }

            if (
                tile.n &&
                tile.w &&
                !tile.s &&
                !tile.e
            ) {
                typeTile = 'L'
                angle = 0
                keyDir = 'nw' 
            }

            if (
                tile.w &&
                tile.s &&
                !tile.e &&
                !tile.n
            ) {
                typeTile = 'L'
                angle = 0
                keyDir = 'ws' 
            }

            if (
                tile.n &&
                tile.e &&
                !tile.w &&
                !tile.s
            ) {
                typeTile = 'L'
                angle = 0
                keyDir = 'ne' 
            }

            /////////

            if (
                tile.w &&
                tile.s &&
                tile.e &&
                !tile.n
            ) {
                typeTile = 'T'
                angle = 0
                keyDir = 'w-e|w-s|s-e'
            }

            if (
                tile.s &&
                tile.e &&
                tile.n &&
                !tile.w
            ) {
                typeTile = 'T'
                angle = 0
                keyDir = 's-n|s-e|n-e'
            }

            if (
                tile.e &&
                tile.n &&
                tile.w &&
                !tile.s
            ) {
                typeTile = 'T'
                angle = 0
                keyDir = 'e-w|n-e|n-w'
            }

            // if (
            //     tile.e &&
            //     tile.n &&
            //     tile.w &&
            //     !tile.s
            // ) {
            //     typeTile = 'T'
            //     angle = 0
            //     keyDir = 'n-s|w-s|n-w'
            // }



            // create buffers

            let e = null

            if (typeTile === 'I' && angle === 0) {
                if (
                    !checkArray(tile.s.path) ||
                    !checkArray(tile.n.path)
                ) {
                    continue;
                }

                e = createTileI({ 
                    paths: [tile.s.path, tile.n.path],
                    colors: [tile.s.color, tile.n.color],
                    forms: [tile.s.form, tile.n.form],
                    n: N,
                    w: W,
                })
            }

            if (typeTile === 'I' && angle === -Math.PI * .5) {
                if (
                    !checkArray(tile.w.path) ||
                    !checkArray(tile.e.path)
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

            if (typeTile === 'L' && keyDir === 'se') {
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
                    key: 'se',
                })
            }

            if (typeTile === 'L' && keyDir === 'nw') {
                if (
                    !checkArray(tile.w.path) ||
                    !checkArray(tile.n.path)
                ) {
                    continue;
                }

                e = createTileL({ 
                    paths: [tile.w.path, tile.n.path],
                    colors: [tile.w.color, tile.n.color],
                    forms: [tile.w.form, tile.n.form],
                    n: N,
                    w: W,
                    key: 'nw',
                })
            }

            if (typeTile === 'L' && keyDir === 'ws') {
                 if (
                     !checkArray(tile.w.path) ||
                     !checkArray(tile.s.path)
                 ) {
                     continue;
                 }

                e = createTileL({ 
                    paths: [tile.w.path, tile.s.path],
                    colors: [tile.w.color, tile.s.color],
                    forms: [tile.w.form, tile.s.form],
                    n: N,
                    w: W,
                    key: 'ws',
                })
            }

            if (typeTile === 'L' && keyDir === 'ne') {
                if (
                    !checkArray(tile.n.path) ||
                    !checkArray(tile.e.path)
                ) {
                    continue;
                }

               e = createTileL({ 
                   paths: [tile.n.path, tile.e.path],
                   colors: [tile.n.color, tile.e.color],
                   forms: [tile.n.form, tile.e.form],
                   n: N,
                   w: W,
                   key: 'ne',
               })
           }

           if (typeTile === 'T') {
                e = createTileT({ 
                    tile,
                    n: N,
                    w: W,
                    key: keyDir,
                })
           }

            if (e) {
                _M.rotateVerticesY(e.v, angle)
                _M.translateVertices(e.v, +ij[0] * W, 0, +ij[1] * W)
                v.push(...e.v)
                c.push(...e.c)
            }
        }

        const m = createMesh({ v, c, material: new THREE.MeshPhongMaterial({ 
            color: 0xFFFFFF, 
            vertexColors: true,
            envMap: root.loader.assets.sky,
            reflectivity: .6,
        }) })
        this.mesh = m
    }
}
