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
        if (arrs.paths.length === 0) {
            continue;
        }
        const l = createLineGeom({
            form: arrs.forms[i],
            points: arrs.paths[i],
            color: arrs.colors[i],
            isClosed: true,
        })
        _M.rotateVerticesY(l.v, -Math.PI / 2)
        _M.translateVertices(l.v, -w / 2 + startX + i * xStep, 0, 0)
        v.push(...l.v)
        c.push(...l.c)
    }

    return { v, c }
}
