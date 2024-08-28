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
            n: 10,
        })

        const stepX = w / n
        const stepY = 3 * .5 / n
        for (let i = 0; i < arr.paths.length; ++i) {
            const r = createLineGeom({ 
                path: arr.paths[i],
                form: arr.forms[i],
                color: arr.colors[i],
                isClosed: true,
            })
            //_M.rotateVerticesY(r.v, Math.PI / 2)
            _M.translateVertices(
                r.v, 
                0,
                stepY * i,
                -w * 1.5 + stepX * i + stepX / 2,
            )
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
        let type = null
        let rot = 0 

        if (stairDataBottom.dir === 's' && stairDataTop.dir === 'n') {

        }
        if (stairDataBottom.dir === 'n' && stairDataTop.dir === 's') {
            const res = createTileI({ 
                forms: [stairDataCenterT.form, stairDataCenterB.form],
                paths: [stairDataCenterT.path, stairDataCenterB.path],
                colors: [stairDataCenterT.color, stairDataCenterB.color],
                n: 10,
                w: 3,  
            }) 
            _M.translateVertices(res.v, 0, h / 2, 0)
            v.push(...res.v)
            c.push(...res.c)
        }
        if (stairDataBottom.dir === 'e' && stairDataTop.dir === 'w') {
            type = 'I'
            rot = Math.PI * .5
        }
        if (stairDataBottom.dir === 'w' && stairDataTop.dir === 'e') {
            type = 'I'
            rot = Math.PI * .5
        }


        if (stairDataBottom.dir === 's' && stairDataTop.dir === 'e' ) {
            type = 'L'
            rot = 0
        }
        if (stairDataBottom.dir === 's' && stairDataTop.dir === 'w' ) {
            type = 'L'
            rot = Math.PI * 1.5
        }
        if (stairDataBottom.dir === 'e' && stairDataTop.dir === 'n' ) {
            type = 'L'
            rot = Math.PI * .5
        }
        if (stairDataBottom.dir === 'e' && stairDataTop.dir === 's' ) {
            type = 'L'
            rot = 0
        }
        if (stairDataBottom.dir === 'n' && stairDataTop.dir === 'w' ) {
            type = 'L'
            rot = Math.PI
        }
        if (stairDataBottom.dir === 'n' && stairDataTop.dir === 'e' ) {
            type = 'L'
            rot = Math.PI * .5
        }
        if (stairDataBottom.dir === 'w' && stairDataTop.dir === 's' ) {
            type = 'L'
            rot = Math.PI * 1.5
        }
        if (stairDataBottom.dir === 'w' && stairDataTop.dir === 'n' ) {
            type = 'L'
            rot = Math.PI
        }



        if (type === 'L') {
            const res = createTileL({ 
                forms: [stairDataBottom.form, stairDataTop.form],
                paths: [stairDataBottom.path, stairDataTop.path],
                colors: [stairDataBottom.color, stairDataTop.color],
                n: 10,
                w: 3,  
            }) 
            _M.rotateVerticesY(res.v, rot)
            _M.translateVertices(res.v, 0, h / 2, 0)
            v.push(...res.v)
            c.push(...res.c)
        }

        if (type === 'I') {

        }


        const n = _M.createPolygon(
            [-w, h * .5, w],
            [w, h * .5, w],
            [w, h * .5, -w],
            [-w, h * .5, -w],
        )
        vC.push(...n)
    }

    // part Exit
    {

        /**                /  <--!!!!!
                         /
                        /
            /-----------/ 
            /
            /  
        */

        //const arrStair = []

        const t = []
        const arr = _M.interpolateArrays({
            paths: [stairDataCenterT.path, stairDataTop.path],
            forms: [stairDataCenterT.form, stairDataTop.form],
            colors: [stairDataCenterT.color, stairDataTop.color],
            n: 10,
        })

        const stepX = w / n
        const stepY = 3 * .5 / n
        for (let i = 0; i < arr.paths.length; ++i) {
            const r = createLineGeom({ 
                path: arr.paths[i],
                form: arr.forms[i],
                color: arr.colors[i],
                isClosed: true,
            })
            //_M.rotateVerticesY(r.v, Math.PI / 2)
            _M.translateVertices(
                r.v, 
                0,
                stepY * i + 3 * .5,
                w * .5 + stepX * i + stepX / 2,
            )
            t.push(...r.v)
            c.push(...r.c)
        }

        v.push(...t)

       // vC.push(..._vC)
    }

    return {
        v,
        vC,
        c,
    }
}
