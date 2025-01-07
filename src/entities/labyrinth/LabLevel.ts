import * as THREE from 'three'
import { _M, A3 } from "../../geometry/_m";
import { createScheme } from './scheme';
import { createTileI } from '../../geometry/tile_I'
import { createTileL } from '../../geometry/tile_L'
import { createTileT } from '../../geometry/tile_T'
import { createTileU } from '../../geometry/tile_U'
import { Root } from 'index';
import { PosesSleepEnds, Dir, DataToCreateLine } from './types';



const EMPTY = 1
const STAIR = 4

// export type PosesSleepEnds = {
//     xI: number, 
//     yI: number, 
//     x?: number, 
//     z?: number, 
//     y?: number,
// }[]



const checkArray = (arr: any) => {
    if (!arr) {
        return false
    }

    if (arr.length) {
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] === undefined) {
                return false
            }

            if (Array.isArray(arr[i]) && arr[i] === Object && arr[i].length) {
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



type LevelData = {
    material: THREE.MeshPhongMaterial, 
    collisionMaterial: THREE.MeshBasicMaterial,
    numTilesX: number, 
    numTilesZ: number, 
    posStart: [number, number],
    posStartDir: Dir,
    dataForEnter: DataToCreateLine,
    w: number,
    n: number,
}


export class LabLevel {
    collisionMesh: THREE.Mesh
    mesh: THREE.Mesh

    posStart: [number, number]
    posEnd: [number, number]
    dirToPosEnd: Dir
    pathToPosEnd: A3[]
    colorToPosEnd: A3
    formToPosEnd: number[]
    posesSleepEnds: PosesSleepEnds

    async init (
        root: Root, 
        levelData: LevelData,
    ) {


        const 
        material = levelData.material, 
        collisionMaterial = levelData.collisionMaterial,
        numTilesX = levelData.numTilesX, 
        numTilesZ = levelData.numTilesZ, 
        posStart = levelData.posStart,
        posStartDir = levelData.posStartDir,
        dataForEnter = levelData.dataForEnter,
        w = levelData.w,
        n = levelData.n



        const W = w
        const N = n

        const shemeData = await createScheme({
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
            posesSleepEnds,
        } = shemeData

        this.posStart = posStart
        this.posEnd = posEnd
        this.dirToPosEnd = dirToPosEnd
        this.pathToPosEnd = pathToPosEnd
        this.colorToPosEnd = colorToPosEnd
        this.formToPosEnd = formToPosEnd

        const v: number[] = []
        const c: number[] = []
        const vC: number[] = []

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
            }


            /////////////

            if (
                tile.s && 
                tile.n &&
                !tile.w &&
                !tile.e
            ) {
                typeTile = 'I'
                //keyDir = 'sn'
            }
            if (
                tile.w && 
                tile.e &&
                !tile.s &&
                !tile.n
            ) {
                typeTile = 'I'
                //keyDir = 'we'
            }

            ///////////////

            if (
                tile.s &&
                tile.e &&
                !tile.n &&
                !tile.w
            ) {
                typeTile = 'L'
                //keyDir = 'se'
            }

            if (
                tile.n &&
                tile.w &&
                !tile.s &&
                !tile.e
            ) {
                typeTile = 'L'
                //keyDir = 'nw' 
            }

            if (
                tile.w &&
                tile.s &&
                !tile.e &&
                !tile.n
            ) {
                typeTile = 'L'
                //keyDir = 'ws' 
            }

            if (
                tile.n &&
                tile.e &&
                !tile.w &&
                !tile.s
            ) {
                typeTile = 'L'
                //keyDir = 'ne' 
            }

            /////////

            if (
                tile.w &&
                tile.s &&
                tile.e &&
                !tile.n
            ) {
                typeTile = 'T'
                keyDir = 'w-e|w-s|s-e'
            }

            if (
                tile.s &&
                tile.e &&
                tile.n &&
                !tile.w
            ) {
                typeTile = 'T'
                keyDir = 's-n|s-e|n-e'
            }

            if (
                tile.e &&
                tile.n &&
                tile.w &&
                !tile.s
            ) {
                typeTile = 'T'
                keyDir = 'e-w|n-e|n-w'
            }

            if (
                tile.n &&
                tile.w &&
                tile.s &&
                !tile.e
            ) {
                typeTile = 'T'
                keyDir = 'n-s|w-s|n-w'
            }

            // create buffers

            let e = null

            if (typeTile === 'U') {
                //if (keyDir === 's' || keyDir === 'e' || keyDir === 'n' || keyDir === 'w') {
                    e = createTileU({
                        //paths: [tile[keyDir].path, tile[keyDir].path],
                        //colors: [tile[keyDir].color, tile[keyDir].color],
                        //forms: [tile[keyDir].form, tile[keyDir].form],
                        ...tile,
                        num: N,
                        width: W,
                    })
                //}
            }

            if (typeTile === 'I') {
            //     if (
            //         !checkArray(tile.w.path) ||
            //         !checkArray(tile.e.path)
            //     ) {
            //         continue;
            //     }

                e = createTileI({ 
                    // paths: [tile.w.path, tile.e.path],
                    // colors: [tile.w.color, tile.e.color],
                    // forms: [tile.w.form, tile.e.form],
                    ...tile,
                    num: N,
                    width: W,
                })
            }
            


            // if (typeTile === 'I' && keyDir === 'sn') {
            //     if (
            //         !checkArray(tile.s.path) ||
            //         !checkArray(tile.n.path)
            //     ) {
            //         continue;
            //     }

            //     e = createTileI({ 
            //         paths: [tile.s.path, tile.n.path],
            //         colors: [tile.s.color, tile.n.color],
            //         forms: [tile.s.form, tile.n.form],
            //         n: N,
            //         w: W,
            //         key: keyDir,
            //     })
            // }

            // if (typeTile === 'I' && keyDir === 'we') {
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
            //         key: keyDir,
            //     })
            // }

                if (typeTile === 'L') {
                    e = createTileL({
                        ...tile,
                        //paths: [tile.s.path, tile.e.path],
                        //colors: [tile.s.color, tile.e.color],
                        //forms: [tile.s.form, tile.e.form],
                        num: N,
                        width: W,
                        //key: 'se',
                    })
                }

        //     if (typeTile === 'L' && keyDir === 'se') {
        //         if (
        //             !checkArray(tile.s.path) ||
        //             !checkArray(tile.e.path)
        //         ) {
        //             continue;
        //         }

        //         e = createTileL({ 
        //             paths: [tile.s.path, tile.e.path],
        //             colors: [tile.s.color, tile.e.color],
        //             forms: [tile.s.form, tile.e.form],
        //             n: N,
        //             w: W,
        //             key: 'se',
        //         })
        //     }

        //     if (typeTile === 'L' && keyDir === 'nw') {
        //         if (
        //             !checkArray(tile.w.path) ||
        //             !checkArray(tile.n.path)
        //         ) {
        //             continue;
        //         }

        //         e = createTileL({ 
        //             paths: [tile.w.path, tile.n.path],
        //             colors: [tile.w.color, tile.n.color],
        //             forms: [tile.w.form, tile.n.form],
        //             n: N,
        //             w: W,
        //             key: 'nw',
        //         })
        //     }

        //     if (typeTile === 'L' && keyDir === 'ws') {
        //          if (
        //              !checkArray(tile.w.path) ||
        //              !checkArray(tile.s.path)
        //          ) {
        //              continue;
        //          }

        //         e = createTileL({ 
        //             paths: [tile.w.path, tile.s.path],
        //             colors: [tile.w.color, tile.s.color],
        //             forms: [tile.w.form, tile.s.form],
        //             n: N,
        //             w: W,
        //             key: 'ws',
        //         })
        //     }

        //     if (typeTile === 'L' && keyDir === 'ne') {
        //         if (
        //             !checkArray(tile.n.path) ||
        //             !checkArray(tile.e.path)
        //         ) {
        //             continue;
        //         }

        //        e = createTileL({ 
        //            paths: [tile.n.path, tile.e.path],
        //            colors: [tile.n.color, tile.e.color],
        //            forms: [tile.n.form, tile.e.form],
        //            n: N,
        //            w: W,
        //            key: 'ne',
        //        })
        //    }

           if (typeTile === 'T') {
                e = createTileT({ 
                    tile,
                    n: N,
                    w: W,
                    key: keyDir,
                })
           }

            if (e) {
                _M.translateVertices(e.v, +ij[0] * W, 0, +ij[1] * W)
                v.push(...e.v)
                c.push(...e.c)

                if (e.vC) {
                    _M.translateVertices(e.vC, +ij[0] * W, 0, +ij[1] * W)
                    vC.push(...e.vC)
                }
            }
        }

        this.posesSleepEnds = posesSleepEnds
        this.mesh = _M.createMesh({ 
            v, 
            c,
            material 
        })
        this.collisionMesh = _M.createMesh({ v: vC, material: collisionMaterial }) 
    }
}
