import { createWall00 } from "./wall00";
import { createWall01 } from "./wall01";
import { _M } from "./_m";
import { createWall02_blocks  } from "./wall02_blocks";

import { 
    ROAD_HEIGHT, 
    ROAD_WIDTH,
    ELEMS_N,
    ELEM_W,
    W,
    WC,
    H,
    W_m_WC,
    PATH_ELEM,
} from "./constants";



export const createTileL = ({ w, h, wc }) => {
    const v = []

    const copyV = [...PATH_ELEM.v]
    _M.translateVertices(copyV, -WC, 0, 0)

    const aStep = Math.PI / 2 / ELEMS_N

    for (let i = 0; i < ELEMS_N + 1; ++i) {
        const copyN = [...copyV]
        _M.rotateVerticesY(copyN, -aStep * i)
        v.push(...copyN)
    }

    _M.translateVertices(v, WC, 0, WC)


    return { v }
}
