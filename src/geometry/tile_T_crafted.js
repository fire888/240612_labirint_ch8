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
        // const newPoints = [
        //     POINTS[2],
        //     POINTS[3],
        //     POINTS[4],
        //     [-.3, -.001, 0],
        // ]

        // const l = createLineGeom({ form: FORM, points: newPoints, isClosed: false})
        // _M.rotateVerticesY(l.v, -Math.PI / 2)

        // for (let i = 1; i < ELEMS_N - 1; ++i) {
        //     const copy = [...l.v]
        //     _M.translateVertices(copy, -W + STEP_HALF + i * STEP, 0, 0)
        //     v.push(...copy)
        // }
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

    const veerRight = []
    {
        // const newPoints = [
        //     [-.01, 0, 0],
        //     POINTS[0],
        //     POINTS[1],
        //     POINTS[2],
        // ]
        // const l = createLineGeom({ form: FORM, points: newPoints, isClosed: false })
        // _M.translateVertices(l.v, -1.2, 0, 0)
        
        // const aStep = Math.PI / 2 / (ELEMS_N - 1)

        // for (let i = 1; i < ELEMS_N - 1; ++i) {
        //     const copyN = [...l.v]
        //     _M.rotateVerticesY(copyN, -aStep * i)
        //     veerRight.push(...copyN)
        // }
        // _M.translateVertices(veerRight, W - STEP_HALF, 0, W - STEP_HALF)
        // v.push(...veerRight)
    }


    
    /*
       
        | /   <-!!!!!  
           -- 
    */
    const leftPartsBottom = []
    const leftPartsTop = []

    //let veerLeft = [...veerRight]
    {
        // _M.rotateVerticesY(veerLeft, -Math.PI / 2)
        // v.push(...veerLeft)

    }



    /*
           --------
             ---
              -
     */

    {
        // const p = [0, 0, -1.2]
        // const aStep = Math.PI / 2 / (ELEMS_N - 1)
        // for (let i = 1; i < ELEMS_N - 1; ++i) {
        //     const copy_P = [...p]
        //     _M.rotateVerticesY(copy_P, -aStep * i)
        //     _M.translateVertices(copy_P, -1.2, 0, 1.2)

        //     const copy2_P = [...p]
        //     _M.rotateVerticesY(copy2_P, aStep * i)
        //     _M.translateVertices(copy2_P, 1.2, 0, 1.2)

        //     const l = createLineGeom({ form: FORM, points: [copy_P, copy2_P], isClosed: false })
        //     v.push(...l.v)
        // }
    }

    return { v, c }
}
