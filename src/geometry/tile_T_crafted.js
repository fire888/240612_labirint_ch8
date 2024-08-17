import { color } from "three/examples/jsm/nodes/Nodes";
import { _M } from "./_m"

import { createLineGeom  } from "./lineGeomCrafted";


export const createTileT = ({ 
    w, 
    n,
    formS,
    formE,
    formW,
    pathS,
    pathE,
    pathW,
    colorS,
    colorW,
    colorE,
}) => {
    const v = []
    const c = []

    /* 
        |        | 
        |        | 
        | _______| <--!!!
    */

    {
        const p = createLineGeom({ points: pathS, form: formS, color: colorS, isClosed: true })
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
        const p = createLineGeom({ points: pathW, form: formW, color: colorW, isClosed: true })
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
        const p = createLineGeom({ points: pathE, form: formE, color: colorE, isClosed: true })
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
            const r = createLineGeom({ form: arrs.forms[i], points: arrs.paths[i], color: arrs.colors[i], isClosed: false })
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


    /*

            \ |   <-!!!!!  
            _
    */
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
                points: arrs.paths[i],
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
                points: arrs.paths[i],
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
