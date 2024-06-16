import { createBuffer00 } from "./buffer00"
import { _M } from "./_m"

export const createWall00 = ({
    w = 10,
    h = 7,
                             }) => {


    const v = []

    let currentH = 0
    let isNextH = true
    while (isNextH) {
        let newH = Math.random() * 2 + 1
        if (currentH + newH > h) {
            newH = h - currentH
            isNextH = false
        }

        let currentW = 0
        let isNextX = true
        while (isNextX) {
            let newW = Math.random() * 3 + 1
            if (currentW + newW > w) {
                isNextX = false
                newW = w - currentW
            }
            const r = createBuffer00({
                d: 1.24,
                w: newW,
                h: newH,
                border: .03,
                splitH: Math.floor(Math.random() * 15) + 5,
                splitHWidth: .01,
                splitHD: 0.02,
                splitW: Math.floor(Math.random() * 15),
                splitWD: 0.01,
                isCapBottom: false,
                isCapTop: true,
                isCapLeft: true,
                isCapRight: true,
            })

            _M.translateVertices(r.v, currentW, currentH, 0)
            v.push(...r.v)

            currentW += newW
        }
        currentH += newH
    }



    return {
        v
    }
}
