import { _M } from "./_m";
import { createLineGeom } from './lineGeomCrafted'



export const createTileL = ({ w, n, forms, paths, colors, key }) => {
    // CREATE ARRAYS DATA

    // const p0 = JSON.parse(JSON.stringify(paths[0]))
    // for (let i = 0; i < p0.length; ++i) {
    //     p0[i][0] = -p0[i][0]
    // }

    // const p = [p0, paths[1]]
    const arrs = _M.interpolateArrays({ forms, paths, colors, n })

    // CREATE ARRAYS FROM 

    const v = []
    const c = []

    if (key === 'se') {
        const stepAngle = -Math.PI / 2 / n

        for (let i = 0; i < n; ++i) {
            if (arrs.paths[i].length === 0) {
                continue;
            }
            const l = createLineGeom({
                form: arrs.forms[i],
                path: arrs.paths[i],
                color: arrs.colors[i],
                isClosed: true,
            })
            _M.translateVertices(l.v, -w / 2, 0, 0)
            _M.rotateVerticesY(l.v, stepAngle * i)
            v.push(...l.v)
            c.push(...l.c)
        }
    
        _M.translateVertices(v, w / 2, 0, w / 2)
    }




    if (key === 'nw') {
        const stepAngle = Math.PI / 2 / n

        for (let i = 0; i < n; ++i) {
            if (arrs.paths[i].length === 0) {
                continue;
            }
            const l = createLineGeom({
                form: arrs.forms[i],
                path: arrs.paths[i],
                color: arrs.colors[i],
                isClosed: true,
            })
            _M.rotateVerticesY(l.v, -Math.PI / 2)
            _M.translateVertices(l.v, 0, 0, w / 2)
            _M.rotateVerticesY(l.v, stepAngle * i)
            v.push(...l.v)
            c.push(...l.c)
        }
        _M.translateVertices(v, -w / 2, 0, -w / 2)
    }


    if (key === 'ws') {
        const stepAngle = -Math.PI / 2 / n

        for (let i = 0; i < n; ++i) {
            if (arrs.paths[i].length === 0) {
                continue;
            }
            const l = createLineGeom({
                form: arrs.forms[i],
                path: arrs.paths[i],
                color: arrs.colors[i],
                isClosed: true,
            })
            _M.rotateVerticesY(l.v, -Math.PI / 2)
            _M.translateVertices(l.v, 0, 0, -w / 2)
            _M.rotateVerticesY(l.v, stepAngle * i)
            v.push(...l.v)
            c.push(...l.c)
        }
        _M.translateVertices(v, -w / 2, 0, w / 2)
    }



    return { v, c }
}
