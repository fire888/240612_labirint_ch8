import { _M } from './_m'


export const createBuffer00 = ({
    w = 3,
    h = 5,
    d = .1,
    border = .2,
    splitH = 5,
    splitW = 5,
    splitWidth = .1,
    splitD = .1 - .03,
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

    {
        if (splitH) {
            const elem = [
                ..._M.createPolygon(
                    [border, splitWidth, splitD],
                    [w - border, splitWidth, splitD],
                    [w - border, splitWidth, 0],
                    [border, splitWidth, 0],
                ),
                ..._M.createPolygon(
                    [border, -splitWidth, splitD],
                    [w - border, -splitWidth, splitD],
                    [w - border, splitWidth, splitD],
                    [border, splitWidth, splitD],
                ),
                ..._M.createPolygon(
                    [border, -splitWidth, 0],
                    [w - border, -splitWidth, 0],
                    [w - border, -splitWidth, splitD],
                    [border, -splitWidth, splitD],
                ),
            ]

            const level = (h - 2 * border) / (splitH + 1)


            for (let i = 1; i <= splitH; ++i) {
                const copy = [...elem]
                _M.translateVertices(copy, 0, border + level * i, 0)
                v.push(...copy)
            }
        }

    }


    if (doubleSide) {
        const copy = [...v]
        _M.mirrorZ(copy)
        v.push(...copy)
    }

    return {
        v,
    }
}
