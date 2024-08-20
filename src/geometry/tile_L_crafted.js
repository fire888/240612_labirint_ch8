import { _M } from "./_m";
import { createLineGeom } from './lineGeomCrafted'



export const createTileL = ({ w, n, forms, paths, colors }) => {
    // CREATE ARRAYS DATA

    const arrs = _M.interpolateArrays({ forms, paths, colors, n })

    // CREATE ARRAYS FROM 

    const v = []
    const c = []

    const stepAngle = -Math.PI / 2 / (n - 1) 
    
    for (let i = 0; i < n; ++i) {
        if (arrs.paths[i].length === 0) {
            continue;
        }
        const l = createLineGeom({
            form: arrs.forms[i],
            points: arrs.paths[i],
            color: arrs.colors[i],
            isClosed: true,
        })
        _M.translateVertices(l.v, -w / 2, 0, 0)
        _M.rotateVerticesY(l.v, stepAngle * i)
        v.push(...l.v)
        c.push(...l.c)
    }

    _M.translateVertices(v, w / 2, 0, w / 2)

    return { v, c }
}
