import { _M } from '../../geometry/_m'
import { createTileI } from '../../geometry/tile_I_crafted'
import { createTileU } from '../../geometry/tile_U_crafted'
import { createTileL } from '../../geometry/tile_L_crafted'
import { createTileT } from '../../geometry/tile_T_crafted'
import { createTileX } from "../../geometry/tile_X_crafted"
import { createStair } from "../../geometry/stair"
import { createMesh } from 'geometry/helperCreateMesh'
import { MeshBasicMaterial } from 'three'


export const createDeemoLongCorridor = () => {
    const color0 = [.5, .5, .5]
    const path0 = [
        [1.3, 0, 0],
        [0, 1.4, 0],
        [-1.3, 0, 0],
    ]
    const form0 = [
        0, 0.01, -0.01,
        0, 0.01, 0.01,
        0, 0, 0,
    ]

    const color1 = [1, 0, 1] 
    const path1 = [
        [1.3, 0, 0],
        [0, 2, 0],
        [-1, 0, 0],        
    ] 
    const form1 = [
        0, 0.2, -0.2,
        0, 0.2, 0.2,
        0, 0, 0,
    ]

    const arrs = _M.interpolateArrays({
        paths: [path0, path1],
        forms: [form0, form1],
        colors: [color0, color1],
        n: 10
    }) 

    const w = 3
    const n = 10

    const v = []
    const c = []

    for (let i = 1; i < arrs.paths.length; ++i) {
        const r = createTileI({
            paths: [arrs.paths[i - 1], arrs.paths[i]],
            forms: [arrs.forms[i - 1], arrs.forms[i]],
            colors: [arrs.colors[i - 1], arrs.colors[i]],
            n,
            w,
         })
         _M.translateVertices(r.v, i * w, 0, 0)
         v.push(...r.v)
         c.push(...r.c)
    }

    const m = createMesh({ 
        v, 
        c, 
        material: new MeshBasicMaterial({
            color: 0xffffff,
            vertexColors: true
        })
    })

    m.position.z = 39
    m.position.x = -40

    return m
}