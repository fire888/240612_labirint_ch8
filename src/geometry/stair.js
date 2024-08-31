import { _M } from './_m'
import { createTileI } from './tile_I_crafted'
import { createTileL } from './tile_L_crafted'
import { createLineGeom } from './lineGeomCrafted'
import { createRandomDataForLine } from '../geometry/lineGeomCrafted'

export const createStair = (data) => {
    let { 
        stairDataBottom, 
        stairDataCenterB, 
        stairDataCenterT, 
        stairDataTop, 
        n, 
        w, 
        h = 3 
    } = data

    if (!n) {
        n = 10
    }
    if (!w) {
        w = 3
    }
    if (!stairDataCenterB) {
        stairDataCenterB = createRandomDataForLine()
    }
    if (!stairDataCenterT) {
        stairDataCenterT = createRandomDataForLine()
    }

    const v = []
    const c = []
    const vC = []

    // part enter
    {
        // enter bottom
        const t = []


        /**                        /
                                 /
                               /
                 /-----------/ 
               /
             /  <--!!!!!
         */

        const arr = _M.interpolateArrays({
            paths: [stairDataBottom.path, stairDataCenterB.path],
            forms: [stairDataBottom.form, stairDataCenterB.form],
            colors: [stairDataBottom.color, stairDataCenterB.color],
            n,
        })

        const stepX = w / n
        const stepY = h / 2 / n
        for (let i = 0; i < arr.paths.length; ++i) {
            const r = createLineGeom({ 
                path: arr.paths[i],
                form: arr.forms[i],
                color: arr.colors[i],
                isClosed: true,
            })

            if (stairDataBottom.dir === 'n') {
                _M.translateVertices(r.v, 0, stepY * i, -w * 1.5 + stepX * i + stepX / 2)
            }
            if (stairDataBottom.dir === 's') {
                _M.translateVertices(r.v, 0, stepY * i, w * 1.5 - stepX * i - stepX / 2)
            }
            if (stairDataBottom.dir === 'w') {
                _M.rotateVerticesY(r.v, Math.PI / 2)
                _M.translateVertices(r.v, -w - w / 2 + i * stepX, stepY * i, 0)
            }
            if (stairDataBottom.dir === 'e') {
                _M.rotateVerticesY(r.v, Math.PI / 2)
                _M.translateVertices(r.v, w + w / 2 - i * stepX, stepY * i, 0)
            }


            t.push(...r.v)
            c.push(...r.c)
        }

        v.push(...t)
    }


    // part Exit
    {
        /**
                             /  <--!!!!!
                            /
                           /
              /-----------/ 
             /
            /  
        */
        const t = []
        const arr = _M.interpolateArrays({
            paths: [stairDataCenterT.path, stairDataTop.path],
            forms: [stairDataCenterT.form, stairDataTop.form],
            colors: [stairDataCenterT.color, stairDataTop.color],
            n,
        })

        const stepX = w / n
        const stepY = h / 2 / n
        for (let i = 0; i < arr.paths.length; ++i) {
            const r = createLineGeom({ 
                path: arr.paths[i],
                form: arr.forms[i],
                color: arr.colors[i],
                isClosed: true,
            })
            if (stairDataTop.dir === 's') {
                _M.translateVertices(r.v, 0, stepY * i + h / 2, w * .5 + stepX * i + stepX / 2)
            }
            if (stairDataTop.dir === 'n') {
                _M.translateVertices(r.v, 0, stepY * i + h / 2, -w * .5 - stepX * i - stepX / 2)
            }
            if (stairDataTop.dir === 'e') {
                _M.rotateVerticesY(r.v, Math.PI / 2)
                _M.translateVertices(r.v, w / 2 + i * stepX, stepY * i + h / 2, 0)
            }
            if (stairDataTop.dir === 'w') {
                _M.rotateVerticesY(r.v, Math.PI / 2)
                _M.translateVertices(r.v, -w / 2 - i * stepX, stepY * i  + h / 2, 0)
            }

            t.push(...r.v)
            c.push(...r.c)
        }

        v.push(...t)
    }


    /*
                      / 
                     /
                    /
          /--------/  <-!!!!
         /
        /
    */
    {

        const arr = _M.interpolateArrays({
            paths: [stairDataCenterB.path, stairDataCenterT.path],
            forms: [stairDataCenterB.form, stairDataCenterT.form],
            colors: [stairDataCenterB.color, stairDataCenterT.color],
            n,
        })
        const step = w / n
        for (let i = 0; i < arr.paths.length; ++i) {
            const r = createLineGeom({ 
                path: arr.paths[i],
                form: arr.forms[i],
                color: arr.colors[i],
                isClosed: true,
            })

            if (stairDataBottom.dir === 'n' && stairDataTop.dir === 's') {
                _M.translateVertices(r.v, 0, h / 2, -w / 2 + step / 2 + step * i) 
            }

            if (stairDataBottom.dir === 's' && stairDataTop.dir === 'n') {
                _M.translateVertices(r.v, 0, h / 2, w / 2 - step / 2 - step * i) 
            }

            if (stairDataBottom.dir === 'w' && stairDataTop.dir === 'e') {
                _M.rotateVerticesY(r.v, Math.PI / 2)
                _M.translateVertices(r.v, -w / 2 + step / 2 + step * i, h / 2, 0) 
            }

            if (stairDataBottom.dir === 'e' && stairDataTop.dir === 'w') {
                _M.rotateVerticesY(r.v, Math.PI / 2)
                _M.translateVertices(r.v, w / 2 - step / 2 - step * i, h / 2, 0) 
            }

            if (stairDataBottom.dir === 'n' && stairDataTop.dir === 'w') {
                _M.translateVertices(r.v, w / 2, h / 2, 0)
                _M.rotateVerticesY(r.v, -Math.PI / 2 / n * i)
                _M.translateVertices(r.v, -w / 2, 0, -w / 2) 
            }

            if (stairDataBottom.dir === 'n' && stairDataTop.dir === 'e') {
                _M.translateVertices(r.v, -w / 2, h / 2, 0)
                _M.rotateVerticesY(r.v, Math.PI / 2 / n * i)
                _M.translateVertices(r.v, w / 2, 0, -w / 2) 
            }

            if (stairDataBottom.dir === 's' && stairDataTop.dir === 'e') {
                _M.translateVertices(r.v, -w / 2, h / 2, 0)
                _M.rotateVerticesY(r.v, -Math.PI / 2 / n * i)
                _M.translateVertices(r.v, w / 2, 0, w / 2) 
            }

            if (stairDataBottom.dir === 's' && stairDataTop.dir === 'w') {
                _M.translateVertices(r.v, w / 2, h / 2, 0)
                _M.rotateVerticesY(r.v, Math.PI / 2 / n * i)
                _M.translateVertices(r.v, -w / 2, 0, w / 2) 
            }

            if (stairDataBottom.dir === 'e' && stairDataTop.dir === 'n') {
                _M.translateVertices(r.v, -w / 2, h / 2, 0)
                _M.rotateVerticesY(r.v, Math.PI / 2 - Math.PI / 2 / n * i)
                _M.translateVertices(r.v, w / 2, 0, -w / 2) 
            }

            if (stairDataBottom.dir === 'e' && stairDataTop.dir === 's') {
                _M.translateVertices(r.v, w / 2, h / 2, 0)
                _M.rotateVerticesY(r.v, Math.PI / 2 + Math.PI / 2 / n * i)
                _M.translateVertices(r.v, w / 2, 0, w / 2) 
            }

            if (stairDataBottom.dir === 'w' && stairDataTop.dir === 'n') {
                _M.translateVertices(r.v, -w / 2, h / 2, 0)
                _M.rotateVerticesY(r.v, Math.PI / 2 + Math.PI / 2 / n * i)
                _M.translateVertices(r.v, -w / 2, 0, -w / 2) 
            }

            if (stairDataBottom.dir === 'w' && stairDataTop.dir === 's') {
                _M.translateVertices(r.v, w / 2, h / 2, 0)
                _M.rotateVerticesY(r.v, Math.PI / 2 - Math.PI / 2 / n * i)
                _M.translateVertices(r.v, -w / 2, 0, w / 2) 
            }

            v.push(...r.v)
            c.push(...r.c)
        }
    }



    return {
        v,
        vC,
        c,
    }
}
