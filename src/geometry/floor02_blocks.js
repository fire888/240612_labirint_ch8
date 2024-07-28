
import { _M } from "./_m"

export const createFloor02_blocks = ({
    w = 1,
    wc = 1
                             }) => {

    const v = []


    const N = 5
    const step = w / N
    const xW = .045
    const hW = .05
    const zW = wc
    
    const l = [
        ..._M.createPolygon(         
            [-xW, 0, -zW],
            [-xW, 0, zW],
            [-xW, hW, zW],
            [-xW, hW, -zW],
        ),
        ..._M.createPolygon(         
            [-xW, hW, zW],
            [xW, hW, zW],
            [xW, hW, -zW],
            [-xW, hW, -zW],
        ),
        ..._M.createPolygon(         
            [xW, 0, zW],
            [xW, 0, -zW],
            [xW, hW, -zW],
            [xW, hW, zW],
        ),
        ..._M.createPolygon(         
            [xW, 0, zW],
            [-xW, 0, zW],
            [-xW, 0, -zW],
            [xW, 0, -zW],
        ),
    ]

    for (let i = 1; i < N; ++i) {
        const xC = i * step
        
        const copy = [...l]
        _M.translateVertices(copy, xC, 0, 0)
        v.push(...copy)
    }


    const side = [
        ..._M.createPolygon(         
            [0, 0, -zW],
            [0, 0, zW],
            [0, hW, zW],
            [0, hW, -zW],
        ),
        ..._M.createPolygon(         
            [0, hW, zW],
            [xW, hW, zW],
            [xW, hW, -zW],
            [0, hW, -zW],
        ),
        ..._M.createPolygon(         
            [xW, 0, zW],
            [xW, 0, -zW],
            [xW, hW, -zW],
            [xW, hW, zW],
        ),
        ..._M.createPolygon(         
            [xW, 0, zW],
            [-xW, 0, zW],
            [-xW, 0, -zW],
            [xW, 0, -zW],
        ),
    ]

    v.push(...side)

    _M.translateVertices(side, w - xW, 0, 0)
    v.push(...side)

    const road = [
        ..._M.createPolygon(
            [0, .07, .2],
            [w, .07, .2],
            [w, .07, -.2],
            [0, .07, -.2],
        ),
        ..._M.createPolygon(
            [0, 0, .2],
            [w, 0, .2],
            [w, .07, .2],
            [0, .07, .2],
        ),
        ..._M.createPolygon(
            [w, 0, -.2],
            [0, 0, -.2],
            [0, .07, -.2],
            [w, .07, -.2],
        ),
        ..._M.createPolygon(
            [w, 0, .2],
            [0, 0, .2],
            [0, 0, -.2],
            [w, 0, -.2],
        ),
        ..._M.createPolygon(
            [0, 0, -.2],
            [0, 0, .2],
            [0, 0.07, .2],
            [0, 0.07, -.2],
        ),
        ..._M.createPolygon(
            [w, 0, .2],
            [w, 0, -.2],
            [w, 0.07, -.2],
            [w, 0.07, .2],
        ),
    ]

    v.push(...road)


    return {
        v
    }
}
