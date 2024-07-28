
import { _M } from "./_m"

export const createWall02_blocks = ({
                                 w = 10,
                                 h = 7,
                             }) => {

    const v = []

    const N = 5
    const step = w / N
    const xW = .05
    const zW = .05
    
    const stolb = [
        ..._M.createPolygon(         
            [-xW, 0, zW],
            [xW, 0, zW],
            [xW, h, zW],
            [-xW, h, zW],
        ),
        ..._M.createPolygon(         
            [xW, 0, zW],
            [xW, 0, -zW],
            [xW, h, -zW],
            [xW, h, zW],
        ),
        ..._M.createPolygon(         
            [xW, 0, -zW],
            [-xW, 0, -zW],
            [-xW, h, -zW],
            [xW, h, -zW],
        ),
        ..._M.createPolygon(         
            [-xW, 0, -zW],
            [-xW, 0, zW],
            [-xW, h, zW],
            [-xW, h, -zW],
        ),
    ]

    for (let i = 1; i < N; ++i) {
        const xC = i * step
        
        const copy = [...stolb]
        _M.translateVertices(copy, xC, 0, 0)
        v.push(...copy)
    }


    const smallStolb = [
        ..._M.createPolygon(
            [0, 0, zW],
            [xW, 0, zW],
            [xW, h, zW],
            [0, h, zW],
        ),
        ..._M.createPolygon(
            [xW, 0, zW],
            [xW, 0, -zW],
            [xW, h, -zW],
            [xW, h, zW],
        ),
        ..._M.createPolygon(
            [xW, 0, -zW],
            [0, 0, -zW],
            [0, h, -zW],
            [xW, h, zW],
        ),
        ..._M.createPolygon(
            [0, 0, -zW],
            [0, 0, zW],
            [0, h, zW],
            [0, h, -zW],
        ),
    ]

    v.push(...smallStolb)

    _M.translateVertices(smallStolb, w - xW, 0, 0)
    v.push(...smallStolb)


    return {
        v
    }
}
