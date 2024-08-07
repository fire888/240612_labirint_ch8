import { _M } from './_m'
import {
    PATH_ELEM,
    W,
    WF,
    WC,
    H,
    ELEMS_N,
    STEP,
    STEP_HALF,
} from './constants'

import { createTileI } from './tile_I'
import { createTileL } from './tile_L'

export const createStair = (data) => {
    const { stairDataBottom, stairDataTop } = data

    const v = []
    const vC = []

    // part enter
    {
        // enter bottom
        const t = []


        /**                        /
                                 /
                               /
                 /-----------/ 
               /
             /  <--!!!!!
         */

        const copyC = [...PATH_ELEM.v]
        _M.rotateVerticesY(copyC, Math.PI / 2)
        const stepY = H / 2 / ELEMS_N
        
        for (let i = 0; i < ELEMS_N; ++i) {
            const c = [...copyC]
            _M.translateVertices(c, -WF * 1.5 + STEP * i + STEP_HALF, stepY * i, 0)
            t.push(...c)
        }


        // collision
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

        const collisionEnter = _M.createPolygon(
            [-WF - W , 0, WC],
            [-WC, H * .5, WC],
            [-WC, H * .5, -WC],
            [-WF - W, 0, -WC],
        )

        _M.rotateVerticesY(collisionEnter, r)
        vC.push(...collisionEnter)


    }


    /*
                      / 
                     /
                    /
          /--------/  <-!!!!
         /
        /
    */
    {

        const tI = createTileI({ })
        _M.translateVertices(tI.v, 0, H / 2, 0)
        v.push(...tI.v)

        const n = _M.createPolygon(
            [-W, H * .5, W],
            [W, H * .5, W],
            [W, H * .5, -W],
            [-W, H * .5, -W],
        )
        vC.push(...n)
    }

    // part Exit
    {

        /**                /  <--!!!!!
                         /
                        /
            /-----------/ 
            /
            /  
        */

        const arrStair = []

        const copyC = [...PATH_ELEM.v]
        _M.rotateVerticesY(copyC, Math.PI / 2)
        const stepY = H / 2 / ELEMS_N
             
        for (let i = 0; i < ELEMS_N; ++i) {
            const c = [...copyC]
            _M.translateVertices(c, WF * .5 + STEP * i + STEP_HALF, stepY * i + H / 2, 0)
            arrStair.push(...c)
        }

        const _vC = _M.createPolygon(
           [W, H * .5, WC],
           [W + WF, H, WC],
           [W + WF, H, -WC],
           [W, H * .5, -WC],
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

        const rr = [...arrStair]
        _M.rotateVerticesY(rr, r)
        v.push(...rr)

        _M.rotateVerticesY(_vC, r)
        vC.push(..._vC)
    }

    return {
        v,
        vC,
    }
}
