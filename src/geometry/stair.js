import { _M } from './_m'
import { createTileI } from './tile_I_crafted'
import { createTileL } from './tile_L_crafted'
import { createLineGeom } from './lineGeomCrafted'

//const 
//W = 3,
//WF = ,
//WC,
//H,


export const createStair = (data) => {
    let { stairDataBottom, stairDataTop, n, w, h = 3 } = data

    if (!n) {
        n = 10
    }
    if (!w) {
        w = 3
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
            paths: [stairDataBottom.path, stairDataBottom.path],
            forms: [stairDataBottom.form, stairDataBottom.form],
            colors: [stairDataBottom.color, stairDataBottom.color],
            n: 10,
        })

        const stepX = w / n
        const stepY = 3 * .5 / n
        for (let i = 0; i < arr.paths.length; ++i) {
            const r = createLineGeom({ 
                points: arr.paths[i],
                form: arr.forms[i],
                color: arr.colors[i],
                isClosed: true,
            })
            _M.rotateVerticesY(r.v, Math.PI / 2)
            _M.translateVertices(
                r.v, 
                -w * 1.5 + stepX * i + stepX / 2, 
                stepY * i,
                0,
            )
            t.push(...r.v)
            c.push(...r.c)
        }

    
        // collision
        let r = 0
        if (stairDataBottom.dir === 'n') {
            r = Math.PI * 1.5
        }
        if (stairDataBottom.dir === 'e') {
            r = Math.PI
        }
        if (stairDataBottom.dir === 's') {
            r = Math.PI * .5
        }
        _M.rotateVerticesY(t, r)
        v.push(...t)

        const collisionEnter = _M.createPolygon(
            [-w -w , 0, w],
            [-w, h * .5, w],
            [-w, h * .5, -w],
            [-w -w, 0, -w],
        )

        _M.rotateVerticesY(collisionEnter, r)
        vC.push(...collisionEnter)
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
            type = 'I'
            rot = Math.PI * .5
        }
        if (stairDataBottom.dir === 'n' && stairDataTop.dir === 's') {
            type = 'I'
            rot = Math.PI * .5
        }
        if (stairDataBottom.dir === 'e' && stairDataTop.dir === 'w') {
            type = 'I'
            rot = Math.PI
        }
        if (stairDataBottom.dir === 'w' && stairDataTop.dir === 'e') {
            type = 'I'
            rot = Math.PI
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
            const res = createTileI({ 
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
            paths: [stairDataTop.path, stairDataTop.path],
            forms: [stairDataTop.form, stairDataTop.form],
            colors: [stairDataTop.color, stairDataTop.color],
            n: 10,
        })

        const stepX = w / n
        const stepY = 3 * .5 / n
        for (let i = 0; i < arr.paths.length; ++i) {
            const r = createLineGeom({ 
                points: arr.paths[i],
                form: arr.forms[i],
                color: arr.colors[i],
                isClosed: true,
            })
            _M.rotateVerticesY(r.v, Math.PI / 2)
            _M.translateVertices(
                r.v, 
                w * .5 + stepX * i + stepX / 2, 
                stepY * i + 3 * .5,
                0,
            )
            t.push(...r.v)
            c.push(...r.c)
        }

        const _vC = _M.createPolygon(
           [w, h * .5, w],
           [w + w, h, w],
           [w + w, h, -w],
           [w, h * .5, -w],
        )

        let r = 0
        if (stairDataTop.dir === 'n') {
            r = Math.PI * .5
        }
        if (stairDataTop.dir === 'w') {
            r = Math.PI
        }
        if (stairDataTop.dir === 's') {
            r = Math.PI * 1.5
        }

        _M.rotateVerticesY(t, r)
        v.push(...t)

        _M.rotateVerticesY(_vC, r)
        vC.push(..._vC)
    }

    return {
        v,
        vC,
        c,
    }
}
