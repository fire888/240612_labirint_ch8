import { _M } from './_m'

const H = 3
const W = 3

export const createStair = () => {
    const v = []
    const vC = []

    {
        vC.push(
            ..._M.createPolygon(
                [-W/2 + .1, 0, W/2],
                [W/2 - .1, H/2, W/2],
                [W/2 - .1, H/2, 0],
                [-W/2 + .1, 0, 0],
            )
        )

        vC.push(
            ..._M.createPolygon(
                [W/2 - .1, H/2, W/2],
                [W/2 + .5, H/2, W/2],
                [W/2 + .5, H/2, -W/2],
                [W/2 - .1, H/2, -W/2],
            )
        )

        vC.push(
            ..._M.createPolygon(
                [-W/2 + .1, H, 0],
                [W/2 - .1, H/2, 0],
                [W/2 - .1, H/2, -W/2],
                [-W/2 + .1, H, -W/2],
            )
        )
    }

    return {
        v,
        vC,
    }
}
