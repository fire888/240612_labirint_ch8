import { createWall00 } from "./wall00";
import { createWall01 } from "./wall01";
import { _M } from "./_m";
import { createWall02_blocks  } from "./wall02_blocks";

import { 
    ROAD_HEIGHT, 
    ROAD_WIDTH,
    ELEMS_N,
    ELEM_W,
    W,
    WC,
    H,
    W_m_WC,
    PATH_ELEM,
} from "./constants";



export const createTileL = ({ w, h, wc }) => {
    const v = []

    const copyV = [...PATH_ELEM.v]
    _M.translateVertices(copyV, -WC, 0, 0)

    const aStep = Math.PI / 2 / ELEMS_N

    for (let i = 0; i < ELEMS_N + 1; ++i) {
        const copyN = [...copyV]
        _M.rotateVerticesY(copyN, -aStep * i)
        v.push(...copyN)
    }

    _M.translateVertices(v, WC, 0, WC)

   // _M.rotateVerticesY(v, )

    

    
    // /*
    //     ------
    // */
    // const wall1 = createWall02_blocks({ w: W + WC, h })
    // _M.translateVertices(wall1.v, -WC, 0, -WC)
    // v.push(...wall1.v)

    // /*
    //     |
    //     |
    //     |
    //     |
    //     |
    // */

    // const wall2 = createWall02_blocks({ w: W + WC, h })
    // _M.rotateVerticesY(wall2.v, -Math.PI * .5)
    // _M.translateVertices(wall2.v, -WC, 0, -WC)
    // v.push(...wall2.v)


    // // bottom 

    // {
    //     /*
    //         ---------------
    //         |
    //         |
    //         |
    //         |
    //         |
    //         |           _|  <- !!!!!!!!!!!1
    //     */

    //     const d = .05 // depth elem

    //     const l = _M.createBox(
    //         [WC - d, 0, W],
    //         [WC + d, 0, W],
    //         [WC + d, d, W],
    //         [WC - d, d, W],

    //         [W, 0, WC - d],
    //         [W, 0, WC + d],
    //         [W, d, WC + d],
    //         [W, d, WC - d],
    //     )

    //     v.push(...l.vArr)

    //     /*
    //         ---------------
    //         |
    //         |      --------   <-!!!!!!
    //         |     /   
    //         |    /
    //         |   /        /
    //     */

    //     const l2 = _M.createBox(
    //         [-ROAD_WIDTH, 0, w / 2],
    //         [ROAD_WIDTH, 0, w / 2],
    //         [ROAD_WIDTH, ROAD_HEIGHT, w / 2],
    //         [-ROAD_WIDTH, ROAD_HEIGHT, w / 2],

    //         [w / 2, 0, -ROAD_WIDTH],
    //         [w / 2, 0, ROAD_WIDTH],
    //         [w / 2, ROAD_HEIGHT, ROAD_WIDTH],
    //         [w / 2, ROAD_HEIGHT, -ROAD_WIDTH],
    //     )

    //     v.push(...l2.vArr)

    //     /*
    //         ------------
    //         |\     
    //         |  \ 
    //         |    -   <-!!!!! 
    //         | -----
    //         |        

    //     */

    //     const stepZ = (w / 2 + wc) / ELEMS_N  
    //     for (let i = 1; i < ELEMS_N + 1; ++i) {
    //         const l = _M.createBox(
    //             [W - ELEM_W, 0, w / 2],
    //             [w / 2, 0, w / 2 - ELEM_W],
    //             [w / 2, ELEM_W, w / 2 - ELEM_W],
    //             [w / 2 - ELEM_W, ELEM_W, w / 2],

    //             [-wc, 0, w / 2 - i * stepZ + ELEM_W],
    //             [-wc, 0, w / 2 - i * stepZ - ELEM_W],
    //             [-wc, ELEM_W, w / 2 - i * stepZ - ELEM_W],
    //             [-wc, ELEM_W, w / 2 - i * stepZ + ELEM_W],
    //         )

    //         v.push(...l.vArr)
    //     }

    //     for (let i = 1; i < ELEMS_N; ++i) {
    //         const l = _M.createBox(
    //             [w / 2 - ELEM_W, 0, w / 2],
    //             [w / 2, 0, w / 2 - ELEM_W],
    //             [w / 2, ELEM_W, w / 2 - ELEM_W],
    //             [w / 2 - ELEM_W, ELEM_W, w / 2],

    //             [-wc + i * stepZ - ELEM_W, 0, -wc],
    //             [-wc + i * stepZ + ELEM_W, 0, -wc],
    //             [-wc + i * stepZ + ELEM_W, ELEM_W, -wc],
    //             [-wc + i * stepZ - ELEM_W, ELEM_W, -wc],
    //         )

    //         v.push(...l.vArr)
    //     }

    // }


    return { v }
}
