import { createWall00 } from "./wall00";
import { createWall01 } from "./wall01";
import { _M } from "./_m";
import {
    PATH_ELEM,
    WF,
    W,
    WC,
    N_GON,
    ELEMS_N,
    FORM,
    POINTS,
} from './constants'
import { createLineGeom } from './lineGeom'


export const createTileU = ({ w, h, wc }) => {
    const v = []

    const step = WF / ELEMS_N
    for (let i = 0; i < ELEMS_N / 2; ++i) {
        const copyV = [...PATH_ELEM.v]
        _M.translateVertices(copyV, 0, 0, step * i)
        v.push(...copyV)
    }


    const paths = [] 

    for (let i = 1; i < 4; ++i) {
         const nPath = []
         for (let j = 0; j < POINTS.length; ++j) {
             const pCopy = [...POINTS[j]]
             for (let k = 0; k < pCopy.length; ++k) {
                 pCopy[k] *= i / 4
             }
             nPath.push(pCopy)
        }
        paths.push(nPath)
    }

    for (let i = 0; i < paths.length; ++i) {
         const l = createLineGeom({ form: FORM, points: paths[i], isClosed: true })
         _M.translateVertices(l.v, 0, .4 - i * .2, (i * step) * .3 - step)
         v.push(...l.v) 
    }

    _M.rotateVerticesY(v, -Math.PI / 2)

    return { v }
}
