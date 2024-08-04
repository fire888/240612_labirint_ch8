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


    // const rL = createWall00({ w, h })
    // _M.translateVertices(rL.v, -w / 2, 0, wc)
    // v.push(...rL.v)

    //const rL = createWall02_blocks({ w, h })
    //_M.translateVertices(rL.v, -w / 2, 0, -wc)
    //v.push(...rL.v)

    // const rR = createWall00({ w, h })
    // _M.translateVertices(rR.v, -w / 2, 0, wc)
    // v.push(...rR.v)

    //const rR = createWall02_blocks({ w, h })
    //_M.translateVertices(rR.v, -w / 2, 0, wc)
    //v.push(...rR.v)


    //const floor = createFloor02_blocks({ w , wc, })
    //_M.translateVertices(floor.v, -w / 2, 0, 0)
    //v.push(...floor.v)

    // // floor
    // v.push(..._M.createPolygon(
    //     [-w / 2, 0, wc],
    //     [w / 2, 0, wc],
    //     [w / 2, 0, -wc],
    //     [-w / 2, 0, -wc],
    // ))
    //
    // // ceil
    // v.push(..._M.createPolygon(
    //     [-w / 2, h, -wc],
    //     [w / 2, h, -wc],
    //     [w / 2, h, wc],
    //     [-w / 2, h, wc],
    // ))

    return { v }
}
