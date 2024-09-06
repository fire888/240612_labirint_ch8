import { _M } from "./_m";
import { createLineGeom } from './lineGeomCrafted'


export const createTileU = ({ w, n, forms, paths, colors, key }) => {
    const v = []
    const c = []
    const vC = [
        ..._M.createPolygon(
            [-w * .5, 0, w * .5],
            [w * .5, 0, w * .5],
            [w * .5, 0, -w * .5],
            [-w * .5, 0, -w * .5],
        )
    ]

    const step = w / n

    {
        const arrs = _M.interpolateArrays({ forms, paths, colors, n: Math.floor(n / 2) })

        for (let i = 0; i < arrs.paths.length; ++i) {
            const b = createLineGeom({
                form: arrs.forms[i],
                path: arrs.paths[i],
                color: arrs.colors[i],
                isClosed: true,
            })

            if (key === 's') {
                _M.translateVertices(b.v, 0, 0, -i * step - step / 2 + w / 2)
            }

            if (key === 'n') {
                _M.translateVertices(b.v, 0, 0, +i * step + step / 2 - w / 2)
            }

            if (key === 'e') {
                _M.rotateVerticesY(b.v, -Math.PI / 2)
                _M.translateVertices(b.v, -i * step - step / 2 + w / 2, 0, 0)
            }

            if (key === 'w') {
                _M.rotateVerticesY(b.v, -Math.PI / 2)
                _M.translateVertices(b.v, i * step + step / 2 - w / 2, 0, 0)
            }

            v.push(...b.v)
            c.push(...b.c)
        }
    }

    {
        const N = 5
        const pathsEnd = []
        const colorsEnd = []
        const formsEnd = []
        const p = paths[paths.length - 1]
        for (let i = 0; i < N; ++i) {
            const newP = []
            for (let j = 0; j < p.length; ++j) {
                const phase = 1 - i / N
                newP.push([
                    p[j][0] * phase,
                    p[j][1] * phase + i / N,
                    p[j][2] * phase
                ])
            }
            pathsEnd.push(newP)
            colorsEnd.push(colors[colors.length - 1])
            formsEnd.push(forms[forms.length - 1])
        }

        for (let i = 0; i < pathsEnd.length; ++i) {
            const b = createLineGeom({
                path: pathsEnd[i],
                form: formsEnd[i],
                color: colorsEnd[i],
                isClosed: true
            })

            if (key === 's') {
                _M.translateVertices(b.v, 0, 0, -i * step)
            }

            if (key === 'n') {
                _M.translateVertices(b.v, 0, 0, +i * step)
            }

            if (key === 'e') {
                _M.rotateVerticesY(b.v, -Math.PI / 2)
                _M.translateVertices(b.v, -i * step, 0, 0)
            }

            if (key === 'w') {
                _M.rotateVerticesY(b.v, -Math.PI / 2)
                _M.translateVertices(b.v, i * step, 0, 0)
            }

            v.push(...b.v)
            c.push(...b.c)
        }
    }




    // // normal part
    // const r = createTileI({ w: w / 2 , n: Math.round(n / 2), forms, paths: paths, colors })
    // _M.translateVertices(r.v, -w / 4, 0, 0)
    // v.push(...r.v)
    // c.push(...r.c)
    //
    // // smaller part
    // const lastBuffer = createLineGeom({
    //     form: forms[forms.length - 1],
    //     path: paths[paths.length - 1],
    //     color: colors[colors.length - 1],
    //     isClosed: true,
    // })
    // _M.rotateVerticesY(lastBuffer.v, -Math.PI / 2)
    //
    // const nClose = 4
    // const xStep = (w / 2) / nClose
    // for (let i = 0; i < nClose; ++i) {
    //     const _v = [...lastBuffer.v]
    //     for (let j = 0; j < _v.length; ++j) {
    //         _v[j] *= (nClose - i) / nClose
    //     }
    //     _M.translateVertices(_v, xStep * i + xStep / 2, w / 2 * (i / nClose), 0)
    //     v.push(..._v)
    //     c.push(...lastBuffer.c)
    // }

    return { v, c, vC }
}
