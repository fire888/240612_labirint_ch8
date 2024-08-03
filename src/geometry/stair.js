import { _M } from './_m'

const H = 3
const W = 3

export const createStair = (data) => {
    const { stairDataBottom, stairDataTop, W, WC, H } = data

    const v = []
    const vC = []

    // part enter
    {
        // enter right
        const p = _M.createPolygon(
            [0, 0, 0],
            [W * 0.2, 0, 0],
            [W * 0.2, H, 0],
            [0, H, 0],

        )
        _M.translateVertices(p, -W * 1.5, 0, -WC)

        // enter left
        const p1 = _M.createPolygon(
            [W * 0.2, 0, 0],
            [0, 0, 0],
            [0, H, 0],
            [W * 0.2, H, 0],

        )
        _M.translateVertices(p1, -W * 1.5, 0, WC)

        // enter bottom
        const b = _M.createPolygon(
            [-W * 1.5, 0, WC],
            [-W * 1.5 + W * 0.2, 0, WC],
            [-W * 1.5 + W * 0.2, 0, -WC],
            [-W * 1.5, 0, -WC],
        )

        const collisionEnter = _M.createPolygon(
            [-W * 1.5 + W * 0.2, 0, WC],
            [-W * .5, H * .5, WC],
            [-W * .5, H * .5, -WC],
            [-W * 1.5 + W * 0.2, 0, -WC],
        )

        const t = [...p, ...p1, ...b]

        // view stairs 
        const stair = _M.createBox(
            [-.05, 0, WC],
            [.05, 0, WC],
            [.05, .07, WC],
            [-.05, .07, WC],

            [-.05, 0, -WC],
            [.05, 0, -WC],
            [.05, .07, -WC],
            [-.05, .07, -WC],
        )
        const arrStair = []
        for (let i = 1; i < 7; ++i) {
            const sX = (-W * .5 - (-W * 1.5 + W * .2)) / 7
            const copyStair = [...stair.vArr]
            _M.translateVertices(copyStair, -W * 1.5 + W * 0.2 + i * sX, H * 0.5 / 7 * i, 0)
            arrStair.push(...copyStair) 
        }
        t.push(...arrStair)


        // collision
        const collisionEnterFull = [...b, ...collisionEnter]

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

        _M.rotateVerticesY(collisionEnterFull, r)
        vC.push(...collisionEnterFull)


        const ss = _M.createBox(
            [-.05, 0, WC],
            [.05, 0, WC],
            [.05, .07, WC],
            [-.05, .07, WC],

            [-.05, 0, -WC],
            [.05, 0, -WC],
            [.05, .07, -WC],
            [-.05, .07, -WC],
        )

        for (let i = 0; i < 7; ++i) {
            const copy = [...ss.vArr]
            _M.translateVertices(copy, W / 7 * i - W * .5, H * .5, 0)
            v.push(...copy)
        }

        const n = _M.createPolygon(
            [-W * .5, H * .5, W * .5],
            [W * .5, H * .5, W * .5],
            [W * .5, H * .5, -W * .5],
            [-W * .5, H * .5, -W * .5],
        )
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


        // view stairs 
        const stair = _M.createBox(
            [-.05, 0, WC],
            [.05, 0, WC],
            [.05, .07, WC],
            [-.05, .07, WC],

            [-.05, 0, -WC],
            [.05, 0, -WC],
            [.05, .07, -WC],
            [-.05, .07, -WC],
        )
        const arrStair = []
        for (let i = 1; i < 7; ++i) {
            const sX = (W * 1.5 + W * .2 - W * .5) / 7
            const copyStair = [...stair.vArr]
            _M.translateVertices(copyStair, W * 0.5 + sX * i, H * 0.5 / 7 * i + H * .5, 0)
            arrStair.push(...copyStair) 
        }

        const rr = [...arrStair]
        _M.rotateVerticesY(rr, r)
        v.push(...rr)

        const collisionExit = [...vT, ...vTT]
        _M.rotateVerticesY(collisionExit, r)
        vC.push(...collisionExit)
    }

    return {
        v,
        vC,
    }
}
