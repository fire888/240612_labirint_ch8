import { _M, A3 } from "./_m";
import { createLineGeom } from './_lineGeom'
import { DataToCreateGeom } from '../entities/labyrinth/types'
import { vC_H } from "constants/CONSTANTS";


export const createTileU = (data: DataToCreateGeom) => {
    const { w, n, forms, paths, colors, key } = data

    const v = []
    const c = []
    const vC = []

    const h = w
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

        const _vC = [
            ..._M.createPolygon( // bottom
                [-w * .5, 0, w * .5],
                [w * .5, 0, w * .5],
                [w * .5, 0, -w * .2],
                [-w * .5, 0, -w * .2],
            ),
            ..._M.createPolygon( // left
                [-w * .5, 0, w * .5],
                [-w * .5, 0, -w *.2],
                [-w * .5, vC_H, -w *.2],
                [-w * .5, vC_H, w * .5],
            ),
            ..._M.createPolygon( // right
                [w * .5, 0, -w *.2],
                [w * .5, 0, w * .5],
                [w * .5, vC_H, w * .5],
                [w * .5, vC_H, -w *.2],
            ),
            ..._M.createPolygon( // back
              [-w * .5, 0, -w *.2],  
              [w * .5, 0, -w *.2],  
              [w * .5, vC_H, -w *.2],  
              [-w * .5, vC_H, -w *.2],  
            ),
        ]

        if (key === 's') {
        }
        if (key === 'n') {
            _M.rotateVerticesY(_vC, Math.PI)
        }
        if (key === 'e') {
            _M.rotateVerticesY(_vC, Math.PI * .5)
        }
        if (key === 'w') {
            _M.rotateVerticesY(_vC, Math.PI * 1.5)
        }
        vC.push(..._vC)
    }

    {
        const N = 5
        const pathsEnd: A3[][] = []
        const colorsEnd = []
        const formsEnd = []
        const p = paths[paths.length - 1]
        for (let i = 0; i < N; ++i) {
            const newP: A3[] = []
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

    return { v, c, vC }
}
