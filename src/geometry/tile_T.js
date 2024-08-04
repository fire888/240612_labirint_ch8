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
} from './constants'
import { createLineGeom  } from "./lineGeom";


export const createTileT = ({ w, h, wc }) => {
    const v = []

    const copyV = [...PATH_ELEM.v]
    {
        const cc = [...copyV]
        _M.translateVertices(cc, 0, 0, WC)
        v.push(...cc)
    }

    {
        const cc = [...copyV]
        _M.rotateVerticesY(cc, Math.PI / 2)
        _M.translateVertices(cc, -WC, 0, 0)
        v.push(...cc)
    }

    {
        const c1 = [...copyV]
        _M.rotateVerticesY(c1, Math.PI / 2)
        _M.translateVertices(c1, WC, 0, 0)
        v.push(...c1)
    }

    /*
        
         |   |   |   | <--!!!!






    */
    {
        const newPoints = [
            POINTS[POINTS.length - 1],
            POINTS[POINTS.length - 2],
            POINTS[POINTS.length - 3],
        ]

        const l = createLineGeom({ form: FORM, points: newPoints, isClosed: false })
        _M.rotateVerticesY(l.v, -Math.PI / 2)

        const step = WF / ELEMS_N
        for (let i = 0; i < ELEMS_N; ++i) {
            const copy = [...l.v]
            _M.translateVertices(copy, i * step - WC, 0, 0)
            v.push(...copy)
        }


        //v.push(...l.v)
    }


    /*

            \ |   <-!!!!!  
            _
    */

    {
        const newPoints = [
            POINTS[0],
            POINTS[1],
            POINTS[2],
        ]
        const l = createLineGeom({ form: FORM, points: newPoints, isClosed: false })
        _M.translateVertices(l.v, -WC, 0, 0)
        
        const aStep = Math.PI / 2 / ELEMS_N
        
        const _v = []
        for (let i = 0; i < ELEMS_N + 1; ++i) {
            const copyN = [...l.v]
            _M.rotateVerticesY(copyN, -aStep * i)
            _v.push(...copyN)
        }
        
        _M.translateVertices(_v, WC, 0, WC)
        v.push(..._v)
    }


    
    /*
       
        | /   <-!!!!!  
           -- 
    */
    {
        const newPoints = [
            POINTS[0],
            POINTS[1],
            POINTS[2],
        ]
        const l = createLineGeom({ form: FORM, points: newPoints, isClosed: false })
        _M.rotateVerticesY(l.v, Math.PI)
        _M.translateVertices(l.v, WC, 0, 0)
        
        const aStep = Math.PI / 2 / ELEMS_N

        const _v = []
        for (let i = 0; i < ELEMS_N + 1; ++i) {
            const copyN = [...l.v]
            _M.rotateVerticesY(copyN, aStep * i)
            _v.push(...copyN)
        }
        
        _M.translateVertices(_v, -WC, 0, WC)
        v.push(..._v)

    }



    //const rL = createWall00({ w, h })
    //_M.translateVertices(rL.v, - w / 2, 0, -wc)
    //v.push(...rL.v)

    // {
    //     const r = createWall00({ w: .3, h })
    //     _M.rotateVerticesY(r.v, Math.PI * 0.25)
    //     _M.translateVertices(r.v, wc, 0, w / 2)
    //     v.push(...r.v)
    // }

    // {
    //     const r = createWall00({ w: .3, h })
    //     _M.rotateVerticesY(r.v, Math.PI * 0.75)
    //     _M.translateVertices(r.v, -wc, 0, w / 2)
    //     v.push(...r.v)
    // }


    return { v }
}
