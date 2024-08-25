import { _M } from "./_m";
import { createLineGeom } from './lineGeomCrafted'


//export const createTileI = ({ w, n, forms = [], paths = [], colors = [] }) => {
export const createTileI = ({ w, n, forms, paths, colors }) => {
    // CREATE ARRAYS DATA

    const arrs = _M.interpolateArrays({ forms, paths, colors, n })

    
    // CREATE BUFFERS FROM ARRAYS

    const v = []
    const c = []

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

    return { v, c }
}
