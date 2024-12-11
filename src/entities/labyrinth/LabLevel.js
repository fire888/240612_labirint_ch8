import * as THREE from 'three'
import { _M } from "../../geometry/_m";
import { createScheme04_crafted } from './scheme04';
import { createTileI } from '../../geometry/tile_I_crafted'
import { createTileL } from '../../geometry/tile_L_crafted'
import { createTileT } from '../../geometry/tile_T_crafted'
import { createTileU } from '../../geometry/tile_U_crafted'
import { createTileX } from '../../geometry/tile_X_crafted';
import { createStair } from "../../geometry/stair";



const EMPTY = 1
const TUNNEL = 3
const STAIR = 4



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




export class LabLevel {
    constructor () {
        this.collisionMech = null
    }

    async init (
        root, 
        { 
            material, 
            collisionMaterial,
            numTilesX, 
            numTilesZ, 
            posStart,
            posStartDir,
            dataForEnter,
            w,
            n,
        }
    ) {
        const W = w
        const N = n

        const shemeData = await createScheme04_crafted({
            width: numTilesX,
            height: numTilesZ,
            posStart,
            posStartDir,
            dataForEnter,
        })

        const {         
            maze,
            posEnd, 
            dirToPosEnd,
            pathToPosEnd,
            colorToPosEnd,
            formToPosEnd, 
        } = shemeData

        this.posStart = posStart
        this.posEnd = posEnd
        this.dirToPosEnd = dirToPosEnd
        this.pathToPosEnd = pathToPosEnd
        this.colorToPosEnd = colorToPosEnd
        this.formToPosEnd = formToPosEnd

        const v = []
        const c = []
        const vC = []

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
                !tile.e &&
                !tile.n &&
                !tile.w
            ) {
                if (
                    !tile.s ||
                    !checkArray(tile.s.path)
                ) {
                    continue;
                }

                typeTile = 'U'
                //angle = 0
                keyDir = 's'
            }

            if (
                !tile.s &&
                tile.e &&
                !tile.n &&
                !tile.w
            ) {
                if (
                    !tile.e ||
                    !checkArray(tile.e.path)
                ) {
                    continue;
                }

                typeTile = 'U'
                //angle = 0
                keyDir = 'e'
            }

            if (
                !tile.s &&
                !tile.e &&
                tile.n &&
                !tile.w
            ) {
                if (
                    !tile.n ||
                    !checkArray(tile.n.path)
                ) {
                    continue;
                }

                typeTile = 'U'
                //angle = 0
                keyDir = 'n'
            }

            if (
                !tile.s &&
                !tile.e &&
                !tile.n &&
                tile.w
            ) {
                if (
                    !tile.w ||
                    !checkArray(tile.w.path)
                ) {
                    continue;
                }

                typeTile = 'U'
                //angle = 0
                keyDir = 'w'
            }


            /////////////

            if (
                tile.s && 
                tile.n &&
                !tile.w &&
                !tile.e
            ) {
                typeTile = 'I'
                //angle = 0
                keyDir = 'sn'
            }
            if (
                tile.w && 
                tile.e &&
                !tile.s &&
                !tile.n
            ) {
                typeTile = 'I'
                keyDir = 'we'
                //angle = -Math.PI * .5
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
                //angle = 0
            }

            if (
                tile.n &&
                tile.w &&
                !tile.s &&
                !tile.e
            ) {
                typeTile = 'L'
                //angle = 0
                keyDir = 'nw' 
            }

            if (
                tile.w &&
                tile.s &&
                !tile.e &&
                !tile.n
            ) {
                typeTile = 'L'
                //angle = 0
                keyDir = 'ws' 
            }

            if (
                tile.n &&
                tile.e &&
                !tile.w &&
                !tile.s
            ) {
                typeTile = 'L'
                //angle = 0
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
                //angle = 0
                keyDir = 'w-e|w-s|s-e'
            }

            if (
                tile.s &&
                tile.e &&
                tile.n &&
                !tile.w
            ) {
                typeTile = 'T'
                //angle = 0
                keyDir = 's-n|s-e|n-e'
            }

            if (
                tile.e &&
                tile.n &&
                tile.w &&
                !tile.s
            ) {
                typeTile = 'T'
                //angle = 0
                keyDir = 'e-w|n-e|n-w'
            }

            if (
                tile.n &&
                tile.w &&
                tile.s &&
                !tile.e
            ) {
                typeTile = 'T'
                //angle = 0
                keyDir = 'n-s|w-s|n-w'
            }



            // create buffers

            let e = null

            if (typeTile === 'U') {
                e = createTileU({
                    paths: [tile[keyDir].path, tile[keyDir].path],
                    colors: [tile[keyDir].color, tile[keyDir].color],
                    forms: [tile[keyDir].form, tile[keyDir].form],
                    n: N,
                    w: W,
                    key: keyDir,
                })
            }


            if (typeTile === 'I' && keyDir === 'sn') {
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
                    key: keyDir,
                })
            }

            if (typeTile === 'I' && keyDir === 'we') {
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
                    key: keyDir,
                })
            }


            // if (typeTile === 'I' && angle === -Math.PI * .5) {
            //     if (
            //         !checkArray(tile.w.path) ||
            //         !checkArray(tile.e.path)
            //     ) {
            //         continue;
            //     }

            //     e = createTileI({ 
            //         paths: [tile.w.path, tile.e.path],
            //         colors: [tile.w.color, tile.e.color],
            //         forms: [tile.w.form, tile.e.form],
            //         n: N,
            //         w: W,
            //     })
            // }

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
                //_M.rotateVerticesY(e.v, angle)
                _M.translateVertices(e.v, +ij[0] * W, 0, +ij[1] * W)
                v.push(...e.v)
                c.push(...e.c)

                if (e.vC) {
                    //_M.rotateVerticesY(e.vC, angle)
                    _M.translateVertices(e.vC, +ij[0] * W, 0, +ij[1] * W)
                    vC.push(...e.vC)
                }
            }
        }

        this.mesh = _M.createMesh({ v, c, material })
        this.collisionMesh = _M.createMesh({ v: vC, material: collisionMaterial }) 
    }
}
