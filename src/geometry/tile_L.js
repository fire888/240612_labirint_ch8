import { createWall00 } from "./wall00";
import { _M } from "./_m";

export const createTileL = ({ w, h, wc }) => {
    const v = []

    const rInner1 = createWall00({ w: .3, h })
    _M.translateVertices(rInner1.v, wc, 0, wc)
    v.push(...rInner1.v)

    const rInner2 = createWall00({ w: .3, h })
    _M.rotateVerticesY(rInner2.v, -Math.PI * .5)
    _M.translateVertices(rInner2.v, wc, 0, wc)
    v.push(...rInner2.v)

    const rOuter1 = createWall00({ w: wc + w / 2, h })
    _M.translateVertices(rOuter1.v, -wc, 0, -wc)
    v.push(...rOuter1.v)

    const rOuter2 = createWall00({ w: wc + w / 2, h })
    _M.rotateVerticesY(rOuter2.v, -Math.PI * .5)
    _M.translateVertices(rOuter2.v, -wc, 0, -wc)
    v.push(...rOuter2.v)

    return { v }
}
