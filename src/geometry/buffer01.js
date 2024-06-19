import { _M } from './_m'


export const createBuffer01 = ({
                                   w = 3,
                                   h = 5,
                                   d = .1,
                                   border = .2,
                                   splitH = 5,
                                   splitHWidth = .01,
                                   splitHD = .1 - .03,
                                   splitW = 5,
                                   splitWWidth = .01,
                                   splitWD = .1 - .032,
                                   doubleSide = true,
                                   isCapTop = true,
                                   isCapBottom = true,
                                   isCapLeft = true,
                                   isCapRight = true,
                               }) => {

    const v = []

    {
        const b = []

        b.push(
            ..._M.createPolygon(
                [w, 0, d],
                [w - border, border, d],
                [border, border, d],
                [0, 0, d],
            ),
            // bottom-top
            ..._M.createPolygon(
                [border, border, d],
                [w - border, border, d],
                [w - border, border, 0],
                [border, border, 0],
            )
        )

        b.push(
            ..._M.createPolygon(
                [w - border, border, d],
                [w, 0, d],
                [w, h, d],
                [w - border, h - border, d],
            ),
            ..._M.createPolygon(
                [w - border, border, 0],
                [w - border, border, d],
                [w - border, h - border, d],
                [w - border, h - border, 0],
            )
        )

        const copy = [...b]
        _M.rotateVerticesZ(copy, Math.PI)
        _M.translateVertices(copy, w, h, 0)



        v.push(
            ...b,
            ...copy,
        )
    }

    {
        if (isCapBottom) {
            v.push(
                ..._M.createPolygon(
                    [w, 0, d],
                    [0, 0, d],
                    [0, 0, 0],
                    [w, 0, 0],
                )
            )
        }
        if (isCapTop) {
            v.push(
                ..._M.createPolygon(
                    [0, h, d],
                    [w, h, d],
                    [w, h, 0],
                    [0, h, 0],
                )
            )
        }
        if (isCapLeft) {
            v.push(
                ..._M.createPolygon(
                    [0, h, d],
                    [0, h, 0],
                    [0, 0, 0],
                    [0, 0, d],
                )
            )
        }
        if (isCapRight) {
            v.push(
                ..._M.createPolygon(
                    [w, h, d],
                    [w, 0, d],
                    [w, 0, 0],
                    [w, h, 0],
                )
            )
        }
    }

    const N = 24
    const rMax = w / 2 - border - w * .1
    const rMin = w / 2 - border - .1  - w * .1
    const rC = .3
    {
        const vV = []
        for (let i = 0; i < N; ++i) {
            const a = i / N * Math.PI * 2
            const xa = Math.cos(a)
            const ya = Math.sin(a)
            vV.push([
                xa * rMin, ya * rMin,
                xa * rMax, ya * rMax,
                xa * rC, ya * rC,
            ])
        }

        const pp = []

        for (let i = 0; i < N; ++i) {
            const cur = vV[i]
            let prev
            if (i === 0) {
                prev = vV[vV.length - 1]
            } else {
                prev = vV[i - 1]
            }

            // inner circle
            pp.push(
                prev[4], prev[5], d,
                cur[4], cur[5], d,
                0, 0, d,
            )



            // outer circle
            pp.push(
                ..._M.createPolygon(
                    [cur[0], cur[1], d],
                    [prev[0], prev[1], d],
                    [prev[2], prev[3], d],
                    [cur[2], cur[3], d],
                )
            )
        }

        _M.translateVertices(pp, w / 2, w / 2, 0)

        v.push(...pp)
    }

    // connect
    const cW = .03
    v.push(
        ..._M.createPolygon(
            [w / 2 - cW, h / 2, d],
            [w / 2 + cW, h / 2, d],
            [w / 2 + cW, h, d],
            [w / 2 - cW, h, d],
        )
    )

    v.push(
        ..._M.createPolygon(
            [w / 2 - cW, h / 2, d],
            [w / 2 + cW, h / 2, d],
            [w / 2 + cW, h, d],
            [w / 2 - cW, h, d],
        )
    )





    if (doubleSide) {
        const copy = [...v]
        _M.mirrorZ(copy)
        v.push(...copy)
    }

    return {
        v,
    }
}
