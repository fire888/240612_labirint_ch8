import { createBuffer01 } from "./buffer01"
import { _M } from "./_m"

export const createWall01 = ({
                                 w = 10,
                                 h = 7,
                             }) => {

    const v = []

    let currentH = 0

    const r = createBuffer01({
        d: 0.05,
        w: w,
        h: h,
        border: .03,
        splitH: 0,
        splitHWidth: .01,
        splitHD: 0.02,
        splitW: 0,
        splitWD: 0.01,
        isCapBottom: false,
        isCapTop: true,
        isCapLeft: true,
        isCapRight: true,
    })

    v.push(...r.v)


    return {
        v
    }
}
