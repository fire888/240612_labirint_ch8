import { createWall00 } from "./wall00";
import { _M } from "./_m";

export const createTileU = ({ w, h, wc }) => {
    const v = []

    const rL = createWall00({ w, h })
    _M.translateVertices(rL.v, -w / 2, 0, wc)
    v.push(...rL.v)

    const rR = createWall00({ w, h })
    _M.translateVertices(rR.v, -w / 2, 0, -wc)
    v.push(...rR.v)

    const rT = createWall00({ w: wc * 2, h })
    _M.rotateVerticesY(rT.v, Math.PI * 0.5)
    _M.translateVertices(rT.v, w / 2, 0, wc)
    v.push(...rT.v)

    return { v }
}
