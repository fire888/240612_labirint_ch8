import { _M } from "./_m"

import { createLineGeom  } from "./lineGeomCrafted";


export const createTileT = ({ 
    w, 
    n,
    tile,
    // formS,
    // formE,
    // formW,
    // pathS,
    // pathE,
    // pathW,
    // colorS,
    // colorW,
    // colorE,
    key,
}) => {
    const v = []
    const c = []

    console.log(key)
    if (!key) {
        return { v, c }
    }


    if (key.includes('s-e')) {
        {
            /*

                    \ |   <-!!!!!  
                    _
            */

            const pathStart = [
                [0, 0, 0], 
                tile.s.path[0],
                tile.s.path[1],
                tile.s.path[2],
            ] 
            const pathEnd = [
                [0, 0, 0], 
                tile.e.path[0],
                tile.e.path[1],
                tile.e.path[2],
            ] 
    
            const nRot = Math.floor(n * 0.6) 
    
            const arrs = _M.interpolateArrays({ 
                paths: [pathStart, pathEnd], 
                forms: [tile.s.form, tile.e.form], 
                colors: [tile.s.color, tile.e.color],
                n: nRot,
            })
    
            console.log('HHH', arrs)
    
            const angleStep = Math.PI / 2 / (nRot + 1) 
            for (let i = 0; i < arrs.paths.length; ++i) {
                const r = createLineGeom({ 
                    path: arrs.paths[i],
                    form: arrs.forms[i],
                    color: arrs.colors[i],
                })
                _M.translateVertices(r.v, -w / 2, 0, 0)
                _M.rotateVerticesY(r.v, -angleStep * i - angleStep)
                _M.translateVertices(r.v, w / 2, 0, w / 2)
                v.push(...r.v)
                c.push(...r.c)
            }
    
    
            for (let i = 0; i < arrs.length; ++i) {
                _M.rotateVerticesY(arrs, -angleStep * i)
            }
        }
    }

    if (key.includes('w-s')) {
            /*
            
                | /   <-!!!!!  
                -- 
            */
        {

            const pathStart = [
                tile.s.path[2],
                tile.s.path[3],
                tile.s.path[4],
                [0, 0, 0], 
            ] 
            const pathEnd = [
                [...tile.w.path[2]],
                [...tile.w.path[1]],
                [...tile.w.path[0]],
                [0, 0, 0], 
            ] 
            
            for (let i = 0; i < pathEnd.length; ++i) {
                pathEnd[i][0] = -pathEnd[i][0] 
            }
            
            const nRot = Math.floor(n * 0.6) 
    
            const arrs = _M.interpolateArrays({ 
                paths: [pathStart, pathEnd], 
                forms: [tile.s.form, tile.w.form], 
                colors: [tile.s.color, tile.w.color],
                n: nRot,
            }) 
            
            const angleStep = Math.PI / 2 / (nRot + 1) 
            for (let i = 0; i < arrs.paths.length; ++i) {
                const r = createLineGeom({ 
                    path: arrs.paths[i],
                    form: arrs.forms[i],
                    color: arrs.colors[i],
                })
                _M.translateVertices(r.v, w / 2, 0, 0)
                _M.rotateVerticesY(r.v, angleStep * i + angleStep)
                _M.translateVertices(r.v, -w / 2, 0, w / 2)
                v.push(...r.v)
                c.push(...r.c)
            }
            
            
            for (let i = 0; i < arrs.length; ++i) {
                _M.rotateVerticesY(arrs, -angleStep * i)
            }
        }
    }


    if (key.includes('w-e')) {

        {
            /*
                ----------
                | | | | | <--!!!!
                |
                |          |
                |_________ | 

            */

            const pathStart = [
                [0, 0, 0], 
                tile.w.path[4], 
                tile.w.path[3], 
                tile.w.path[2], 
            ]
            const pathEnd = [
                [0, 0, 0], 
                tile.e.path[4], 
                tile.e.path[3], 
                tile.e.path[2], 
            ]
    
            const arrs = _M.interpolateArrays({ 
                paths: [pathStart, pathEnd], 
                forms: [tile.w.form, tile.e.form], 
                colors: [tile.w.color, tile.e.color],
                n,
            }) 
    
            const step = w / n
            for (let i = 0; i < arrs.paths.length; ++i) {
                const r = createLineGeom({ form: arrs.forms[i], path: arrs.paths[i], color: arrs.colors[i], isClosed: false })
                _M.rotateVerticesY(r.v, -Math.PI / 2)
                _M.translateVertices(r.v, -w / 2 + i * step + step / 2, 0, 0)
                v.push(...r.v) 
                c.push(...r.c) 
            }
        }
    }

    // if (key.includes('w-s')) {


    // /*
       
    //     | /   <-!!!!!  
    //        -- 
    // */
    //        {

    //         const pathStart = [
    //             pathS[2],
    //             pathS[3],
    //             pathS[4],
    //             [0, 0, 0], 
    //         ] 
    //         const pathEnd = [
    //             [...pathW[2]],
    //             [...pathW[1]],
    //             [...pathW[0]],
    //             [0, 0, 0], 
    //         ] 
    
    //         for (let i = 0; i < pathEnd.length; ++i) {
    //             pathEnd[i][0] = -pathEnd[i][0] 
    //         }
    
    //         const nRot = Math.floor(n * 0.6) 
    
    //         const arrs = _M.interpolateArrays({ 
    //             //paths: [pathStart, pathEnd], 
    //             paths: [pathStart, pathEnd], 
    //             forms: [formS, formW], 
    //             colors: [colorS, colorW],
    //             n: nRot,
    //         }) 
    
    //         const angleStep = Math.PI / 2 / (nRot + 1) 
    //         for (let i = 0; i < arrs.paths.length; ++i) {
    //             const r = createLineGeom({ 
    //                 path: arrs.paths[i],
    //                 form: arrs.forms[i],
    //                 color: arrs.colors[i],
    //             })
    //             _M.translateVertices(r.v, w / 2, 0, 0)
    //             _M.rotateVerticesY(r.v, angleStep * i + angleStep)
    //             _M.translateVertices(r.v, -w / 2, 0, w / 2)
    //             v.push(...r.v)
    //             c.push(...r.c)
    //         }
    
    
    //         for (let i = 0; i < arrs.length; ++i) {
    //             _M.rotateVerticesY(arrs, -angleStep * i)
    //         }
    //     }
    // }

    return { v, c }




    /* 
        |        | 
        |        | 
        | _______| <--!!!
    */

    {
        const p = createLineGeom({ path: pathS, form: formS, color: colorS, isClosed: true })
        _M.translateVertices(p.v, 0, 0, w / 2)
        v.push(...p.v)
        c.push(...p.c)
    }

    /* 
        | <-!    | 
        |        | 
        | _______| 
     */

    {
        const p = createLineGeom({ path: pathW, form: formW, color: colorW, isClosed: true })
        _M.rotateVerticesY(p.v, -Math.PI / 2)
        _M.translateVertices(p.v, -w / 2, 0, 0)
        v.push(...p.v)
        c.push(...p.c)
    }


    /* 
        |        | <-! 
        |        | 
        | _______| 
     */

    {
        const p = createLineGeom({ path: pathE, form: formE, color: colorE, isClosed: true })
        _M.rotateVerticesY(p.v, -Math.PI / 2)
        _M.translateVertices(p.v, w / 2, 0, 0)
        v.push(...p.v)
        c.push(...p.c)
    }

    /*
         ----------
        | | | | | <--!!!!
        |
        |          |
        |_________ | 

    */

    {
        const pathStart = [
            [0, 0, 0], 
            pathW[4], 
            pathW[3], 
            pathW[2], 
        ]
        const pathEnd = [
            [0, 0, 0], 
            pathE[4], 
            pathE[3], 
            pathE[2], 
        ]

        const arrs = _M.interpolateArrays({ 
            paths: [pathStart, pathEnd], 
            forms: [formW, formE], 
            colors: [colorW, colorE],
            n,
        }) 

        const step = w / n
        for (let i = 0; i < arrs.paths.length; ++i) {
            const r = createLineGeom({ form: arrs.forms[i], path: arrs.paths[i], color: arrs.colors[i], isClosed: false })
            _M.rotateVerticesY(r.v, -Math.PI / 2)
            _M.translateVertices(r.v, -w / 2 + i * step + step, 0, 0)
            v.push(...r.v) 
            c.push(...r.c) 
        }

    }
        /*
         ----------
        | | | | |  |
        |  ------  <--!!!!
        |          |
        |_________ | 

    */
        // {
        //     //[-.3, -.001, 0],
    
        //     const l = createLineGeom({ 
        //         form: FORM, points: [
        //             [-0.05 - STEP, 0, -.3], [0.05 + STEP, 0, -.3],
        //         ], 
        //         isClosed: false
        //     })
        //     v.push(...l.v)
        // }



    {

        const pathStart = [
            [0, 0, 0], 
            pathS[0],
            pathS[1],
            pathS[2],
        ] 
        const pathEnd = [
            [0, 0, 0], 
            pathE[0],
            pathE[1],
            pathE[2],
        ] 

        const nRot = Math.floor(n * 0.6) 

        const arrs = _M.interpolateArrays({ 
            paths: [pathStart, pathEnd], 
            forms: [formS, formE], 
            colors: [colorS, colorE],
            n: nRot,
        }) 

        const angleStep = Math.PI / 2 / (nRot + 1) 
        for (let i = 0; i < arrs.paths.length; ++i) {
            const r = createLineGeom({ 
                path: arrs.paths[i],
                form: arrs.forms[i],
                color: arrs.colors[i],
            })
            _M.translateVertices(r.v, -w / 2, 0, 0)
            _M.rotateVerticesY(r.v, -angleStep * i - angleStep)
            _M.translateVertices(r.v, w / 2, 0, w / 2)
            v.push(...r.v)
            c.push(...r.c)
        }


        for (let i = 0; i < arrs.length; ++i) {
            _M.rotateVerticesY(arrs, -angleStep * i)
        }
    }
 
    /*
       
        | /   <-!!!!!  
           -- 
    */
    {

        const pathStart = [
            pathS[2],
            pathS[3],
            pathS[4],
            [0, 0, 0], 
        ] 
        const pathEnd = [
            [...pathW[2]],
            [...pathW[1]],
            [...pathW[0]],
            [0, 0, 0], 
        ] 

        for (let i = 0; i < pathEnd.length; ++i) {
            pathEnd[i][0] = -pathEnd[i][0] 
        }

        const nRot = Math.floor(n * 0.6) 

        const arrs = _M.interpolateArrays({ 
            //paths: [pathStart, pathEnd], 
            paths: [pathStart, pathEnd], 
            forms: [formS, formW], 
            colors: [colorS, colorW],
            n: nRot,
        }) 

        const angleStep = Math.PI / 2 / (nRot + 1) 
        for (let i = 0; i < arrs.paths.length; ++i) {
            const r = createLineGeom({ 
                path: arrs.paths[i],
                form: arrs.forms[i],
                color: arrs.colors[i],
            })
            _M.translateVertices(r.v, w / 2, 0, 0)
            _M.rotateVerticesY(r.v, angleStep * i + angleStep)
            _M.translateVertices(r.v, -w / 2, 0, w / 2)
            v.push(...r.v)
            c.push(...r.c)
        }


        for (let i = 0; i < arrs.length; ++i) {
            _M.rotateVerticesY(arrs, -angleStep * i)
        }
    }


    return { v, c }
}
