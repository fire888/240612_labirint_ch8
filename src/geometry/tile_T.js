import { createWall00 } from "./wall00";
import { _M } from "./_m";

export const createTileT = ({ w, h, wc }) => {
    const v = []

    const rL = createWall00({ w, h })
    _M.translateVertices(rL.v, - w / 2, 0, -wc)
    v.push(...rL.v)

    {
        const r = createWall00({ w: .3, h })
        _M.rotateVerticesY(r.v, Math.PI * 0.25)
        _M.translateVertices(r.v, wc, 0, w / 2)
        v.push(...r.v)
    }

    {
        const r = createWall00({ w: .3, h })
        _M.rotateVerticesY(r.v, Math.PI * 0.75)
        _M.translateVertices(r.v, -wc, 0, w / 2)
        v.push(...r.v)
    }


    return { v }
}
