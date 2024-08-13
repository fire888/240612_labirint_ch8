import { createLineGeom } from "./lineGeom"

export const ELEMS_N = 10
export const ELEM_W = .01

export const ROAD_WIDTH = .2
export const ROAD_HEIGHT = .07

export const WF = 3
export const W = WF / 2
export const W_m_WC = .2
export const WC = W - W_m_WC 
export const STEP = WF / ELEMS_N
export const STEP_HALF = STEP / 2

export const H = 3 



export const N_GON = 3


export const FORM = [
    0, -ELEM_W, -ELEM_W,
    0, -ELEM_W, ELEM_W,
    0, ELEM_W, ELEM_W,
    0, ELEM_W, -ELEM_W,
]
export const POINTS  = [
    [.9, 0, 0],
    [1.2, 1.4, 0],
    [0, 2.5, 0],
    [-1.2, 1.4, 0],
    [-.9, 0, 0],
] 

export const PATH_ELEM = createLineGeom({ form: FORM, points: POINTS, isClosed: true })
//v.push(...f.v)
