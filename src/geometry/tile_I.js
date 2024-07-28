//import { createWall00 } from "./wall00";
//import { createWall01 } from "./wall01";
import { createWall02_blocks  } from "./wall02_blocks";
import { createFloor02_blocks } from "./floor02_blocks"
import { _M } from "./_m";

export const createTileI = ({ w, h, wc }) => {
    const v = []

    // const rL = createWall00({ w, h })
    // _M.translateVertices(rL.v, -w / 2, 0, wc)
    // v.push(...rL.v)

    const rL = createWall02_blocks({ w, h })
    _M.translateVertices(rL.v, -w / 2, 0, -wc)
    v.push(...rL.v)

    // const rR = createWall00({ w, h })
    // _M.translateVertices(rR.v, -w / 2, 0, wc)
    // v.push(...rR.v)

    const rR = createWall02_blocks({ w, h })
    _M.translateVertices(rR.v, -w / 2, 0, wc)
    v.push(...rR.v)


    const floor = createFloor02_blocks({ w , wc, })
    _M.translateVertices(floor.v, -w / 2, 0, 0)
    v.push(...floor.v)

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
