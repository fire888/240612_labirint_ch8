import { _M } from './_m'

const H = 3
const W = 3

export const createStair = (data) => {
    const { stairDataBottom, stairDataTop, W, WC, H } = data
    console.log('RRRR', stairDataBottom, stairDataTop)

    const v = []
    const vC = []

    // part enter
    {
        const p = _M.createPolygon(
            [0, 0, 0],
            [W * 0.2, 0, 0],
            [W * 0.2, H, 0],
            [0, H, 0],

        )
        _M.translateVertices(p, -W * 1.5, 0, -WC)
        const p1 = _M.createPolygon(
            [W * 0.2, 0, 0],
            [0, 0, 0],
            [0, H, 0],
            [W * 0.2, H, 0],

        )
        _M.translateVertices(p1, -W * 1.5, 0, WC)

        const b = _M.createPolygon(
            [-W * 1.5, 0, WC],
            [-W * 1.5 + W * 0.2, 0, WC],
            [-W * 1.5 + W * 0.2, 0, -WC],
            [-W * 1.5, 0, -WC],
        )

        const tt = _M.createPolygon(
            [-W * 1.5 + W * 0.2, 0, WC],
            [-W * .5, H * .5, WC],
            [-W * .5, H * .5, -WC],
            [-W * 1.5 + W * 0.2, 0, -WC],
        )

        const t = [...p, ...p1, ...b, ...tt]

        const cT = [...b, ...t]

        let r = 0
        if (stairDataBottom.dir === 'n') {
            r = Math.PI * 1.5
        }
        if (stairDataBottom.dir === 'e') {
            r = Math.PI
        }
        if (stairDataBottom.dir === 's') {
            r = Math.PI * .5
        }
        _M.rotateVerticesY(t, r)

        v.push(...t)

        _M.rotateVerticesY(cT, r)
        vC.push(...cT)



        const n = _M.createPolygon(
            [-W * .5, H * .5, W * .5],
            [W * .5, H * .5, W * .5],
            [W * .5, H * .5, -W * .5],
            [-W * .5, H * .5, -W * .5],
        )
        v.push(...n)
        vC.push(...n)
    }

    // part Exit
    {
        const vT = _M.createPolygon(
           [W * .5, H * .5, WC],
           [W * 1.5 - W * .2, H, WC],
           [W * 1.5 - W * .2, H, -WC],
           [W * .5, H * .5, -WC],
        )

        const vTT = _M.createPolygon(
            [W * 1.5 - W * .2, H, WC],
            [W * 1.5, H, WC],
            [W * 1.5, H, -WC],
            [W * 1.5  - W * .2, H, -WC],
        )

        let r = 0
        if (stairDataTop.dir === 'n') {
            r = Math.PI * .5
        }
        if (stairDataTop.dir === 'w') {
            r = Math.PI
        }
        if (stairDataTop.dir === 's') {
            r = Math.PI * 1.5
        }

        const rr = [...vT, ...vTT]
        _M.rotateVerticesY(rr, r)
        v.push(...rr)
        vC.push(...rr)
    }



    //
    // {
    //     vC.push(
    //         ..._M.createPolygon(
    //             [-W/2 + .1, 0, W/2],
    //             [W/2 - .1, H/2, W/2],
    //             [W/2 - .1, H/2, 0],
    //             [-W/2 + .1, 0, 0],
    //         )
    //     )
    //
    //     vC.push(
    //         ..._M.createPolygon(
    //             [W/2 - .1, H/2, W/2],
    //             [W/2 + .5, H/2, W/2],
    //             [W/2 + .5, H/2, -W/2],
    //             [W/2 - .1, H/2, -W/2],
    //         )
    //     )
    //
    //     vC.push(
    //         ..._M.createPolygon(
    //             [-W/2 + .1, H, 0],
    //             [W/2 - .1, H/2, 0],
    //             [W/2 - .1, H/2, -W/2],
    //             [-W/2 + .1, H, -W/2],
    //         )
    //     )
    // }

    return {
        v,
        vC,
    }
}
