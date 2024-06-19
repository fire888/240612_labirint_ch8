import { createWall00 } from "./wall00";
import { _M } from "./_m";

export const createTileI = ({ w, h, wc }) => {
    const v = []

    const rL = createWall00({ w, h })
    _M.translateVertices(rL.v, -w / 2, 0, wc)
    v.push(...rL.v)

    const rR = createWall00({ w, h })
    _M.translateVertices(rR.v, -w / 2, 0, -wc)
    v.push(...rR.v)

    return { v }
}
