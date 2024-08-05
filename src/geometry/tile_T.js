import { createWall00 } from "./wall00";
import { _M } from "./_m"

import {
    POINTS,
    PATH_ELEM,
    W,
    WF,
    WC,
    FORM,
    ELEMS_N,
    STEP,
    STEP_HALF,
} from './constants'
import { createLineGeom  } from "./lineGeom";


export const createTileT = ({ w, h, wc }) => {
    const v = []

    const copyV = [...PATH_ELEM.v]
    
    /* 
        |        | 
        |        | 
        | _______| <--!!!
     */
    
    {
        const cc = [...copyV]
        _M.translateVertices(cc, 0, 0, W - STEP_HALF)
        v.push(...cc)
    }

    /* 
        | <-!    | 
        |        | 
        | _______| 
     */

    {
        const cc = [...copyV]
        _M.rotateVerticesY(cc, -Math.PI / 2)
        _M.translateVertices(cc, -W + STEP_HALF, 0, 0)
        v.push(...cc)
    }

        /* 
        |        | <-! 
        |        | 
        | _______| 
     */

    {
        const c1 = [...copyV]
        _M.rotateVerticesY(c1, -Math.PI / 2)
        _M.translateVertices(c1, W - STEP_HALF, 0, 0)
        v.push(...c1)
    }

    /*
         ----------
        | | | | | <--!!!!
        |
        |          |
        |_________ | 

    */
    {
        const newPoints = [
            POINTS[2],
            POINTS[3],
            POINTS[4],
            [0, -.001, 0],
        ]

        const l = createLineGeom({ form: FORM, points: newPoints, isClosed: false})
        _M.rotateVerticesY(l.v, -Math.PI / 2)

        for (let i = 1; i < ELEMS_N - 1; ++i) {
            const copy = [...l.v]
            _M.translateVertices(copy, -W + STEP_HALF + i * STEP, 0, 0)
            v.push(...copy)
        }
    }


    /*

            \ |   <-!!!!!  
            _
    */

    let veer = []

    {
        const newPoints = [
            [0, 0, 0],
            POINTS[0],
            POINTS[1],
            POINTS[2],
        ]
        const l = createLineGeom({ form: FORM, points: newPoints, isClosed: false })
        _M.translateVertices(l.v, -1.2, 0, 0)
        
        const aStep = Math.PI / 2 / (ELEMS_N - 1)
        
        const _v = []
        for (let i = 1; i < ELEMS_N - 1; ++i) {
            const copyN = [...l.v]
            _M.rotateVerticesY(copyN, -aStep * i)
            _v.push(...copyN)
        }
        veer = [..._v]
        _M.translateVertices(_v, W - STEP_HALF, 0, W - STEP_HALF)
        v.push(..._v)
    }


    
    /*
       
        | /   <-!!!!!  
           -- 
    */
    {
        _M.rotateVerticesY(veer, -Math.PI / 2)
        _M.translateVertices(veer, .1, 0, -.1)
        
        _M.translateVertices(veer, -WC, 0, WC)
        v.push(...veer)

    }

    return { v }
}
