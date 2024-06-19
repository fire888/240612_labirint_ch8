import { createWall00 } from "./wall00";
import { createWall01 } from "./wall01";
import { _M } from "./_m";

export const createTileU = ({ w, h, wc }) => {
    const v = []

    const rL = createWall01({ w, h })
    _M.translateVertices(rL.v, -w / 2, 0, wc)
    v.push(...rL.v)

    const rR = createWall01({ w, h })
    _M.translateVertices(rR.v, -w / 2, 0, -wc)
    v.push(...rR.v)

    const rT = createWall01({ w: wc * 2, h })
    _M.rotateVerticesY(rT.v, Math.PI * 0.5)
    _M.translateVertices(rT.v, w / 2, 0, wc)
    v.push(...rT.v)
    //
    // // floor
    // v.push(..._M.createPolygon(
    //     [-w / 2, 0, wc],
    //     [w / 2, 0, wc],
    //     [w / 2, 0, -wc],
    //     [-w / 2, 0, -wc],
    // ))

    // // ceil
    // v.push(..._M.createPolygon(
    //     [-w / 2, h, -wc],
    //     [w / 2, h, -wc],
    //     [w / 2, h, wc],
    //     [-w / 2, h, wc],
    // ))




    return { v }
}
