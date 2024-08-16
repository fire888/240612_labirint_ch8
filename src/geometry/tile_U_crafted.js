import { _M } from "./_m";
import { createTileI } from "./tile_I_crafted";
import { createLineGeom } from './lineGeomCrafted'


export const createTileU = ({ w, n, forms, paths, colors }) => {
    const v = []
    const c = []
    
    // normal part
    const r = createTileI({ w: w / 2 , n: Math.round(n / 2), forms, paths: paths, colors })
    _M.translateVertices(r.v, -w / 4, 0, 0)
    v.push(...r.v)
    c.push(...r.c)

    // smaller part 
    const lastBuffer = createLineGeom({ 
        form: forms[forms.length - 1], 
        points: paths[paths.length - 1], 
        color: colors[colors.length - 1],
        isClosed: true,
    })
    _M.rotateVerticesY(lastBuffer.v, -Math.PI / 2)

    const nClose = 4
    const xStep = (w / 2) / nClose
    for (let i = 0; i < nClose; ++i) {
        const _v = [...lastBuffer.v]
        for (let j = 0; j < _v.length; ++j) {
            _v[j] *= (nClose - i) / nClose
        }
        _M.translateVertices(_v, xStep * i + xStep / 2, w / 2 * (i / nClose), 0)
        v.push(..._v)
        c.push(...lastBuffer.c)
    }

    return { v, c }
}
