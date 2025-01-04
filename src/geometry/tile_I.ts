import { _M } from "./_m";
import { createLineGeom } from './lineGeom'

import { DataToCreateGeom } from '../entities/labyrinth/types'


export const createTileI = (data: DataToCreateGeom) => {
    const { w, n, forms, paths, colors, key } = data

    // CREATE ARRAYS DATA

    const arrs = _M.interpolateArrays({ forms, paths, colors, n })

    
    // CREATE BUFFERS FROM ARRAYS

    const v = []
    const c = []
    const vC = []

    const xStep = w / n
    const startX = xStep / 2

    for (let i = 0; i < arrs.paths.length; ++i) {
        const l = createLineGeom({
            form: arrs.forms[i],
            path: arrs.paths[i],
            color: arrs.colors[i],
            isClosed: true,
        })
        _M.translateVertices(l.v, 0 , 0, w / 2 - startX - i * xStep)
        v.push(...l.v)
        c.push(...l.c)
    }


    vC.push(
        ..._M.createPolygon(
            [-w * .5, 0, w * .5],
            [w * .5, 0, w * .5],
            [w * .5, 0, -w * .5],
            [-w * .5, 0, -w * .5],
        ),
        ..._M.createPolygon(
            [-w * .5, 0, w * .5],
            [-w * .5, 0, -w * .5],
            [-w * .5, 3, -w * .5],
            [-w * .5, 3, w * .5],
        ),
        ..._M.createPolygon(
            [w * .5, 0, -w * .5],
            [w * .5, 0, w * .5],
            [w * .5, 3, w * .5],
            [w * .5, 3, -w * .5],
        ),
    )

    if (key === 'we') {
        _M.rotateVerticesY(v, -Math.PI * .5)
        _M.rotateVerticesY(vC, -Math.PI * .5)
    }


    return { v, c, vC }
}
