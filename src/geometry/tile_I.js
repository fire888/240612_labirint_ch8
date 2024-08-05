//import { createWall00 } from "./wall00";
//import { createWall01 } from "./wall01";
import { createWall02_blocks  } from "./wall02_blocks";
import { createFloor02_blocks } from "./floor02_blocks"
import { _M } from "./_m";
import { 
    PATH_ELEM, 
    ELEMS_N,  
    WF,
    W,
} from './constants'

export const createTileI = ({ w, h, wc }) => {
    const v = []

    const step = WF / ELEMS_N 
    for (let i = 0; i < ELEMS_N; ++i) {
        const copyV = [...PATH_ELEM.v]
        _M.translateVertices(copyV, 0, 0, i * step - W + step / 2)
        v.push(...copyV)
    }

    _M.rotateVerticesY(v, -Math.PI / 2)

    return { v }
}
