//import { createWall00 } from "./wall00";
//import { createWall01 } from "./wall01";
//import { createWall02_blocks  } from "./wall02_blocks";
//import { createFloor02_blocks } from "./floor02_blocks"
import { _M } from "./_m";
import { 
    PATH_ELEM, 
    ELEMS_N,  
    WF,
    W,
} from './constants'

import { createLineGeom } from './lineGeomCrafted' 

//w: W, 
//h: H,
//n: 5,
//forms: [form1, form2],
//paths: [path1, path2],
//colors: [color1, color2],

const form1 = [
    0, .05, .05,
    0, .05, -.05,
    0, .0, .0,
]

const form2 = [
    0, .1, .1,
    0, .1, -.1,
    0, -.2, .0,
]

const form3 = [
    0, .05, .05,
    0, .05, -.05,
    0, .0, .0,
]


const path1 = [
    [.9, 0, 0],
    [1.2, 1.4, 0],
    [0, 2.5, 0],
    [-1.2, 1.4, 0],
    [-.9, 0, 0],
    // [.9, 0, 0],
    // [1.2, 1.4, 0],
    // [0, 2.5, 0],
    // [-1.2, 1.4, 0],
    // [-.9, 0, 0],
]

const path2 = [
    [.5, 0, 0],
    [1.7, 1.4, 0],
    [0, 2, 0],
    [-1, 1.4, 0],
    [-.5, 0, 0],
]

const color1 = [1, 0, 0]
const color2 = [0, 1, 0]

const forms = [form1, form2, form3]
const paths = [path1, path2]
const colors = [color1, color2]

const n = 10

//export const createTileI = ({ w, n, forms = [], paths = [], colors = [] }) => {
export const createTileI = ({ w }) => {
    const v = []

    const formsReal = []
    const pathsReal = []
    const colorsReal = []


    const xStep = w / n
    const startX = xStep / 2

    const nInForms = n / (forms.length - 1)
    for (let i = 0; i < n; ++i) {
        const prevFormIndex = Math.floor(i / nInForms) 
        const nextFormIndex = prevFormIndex + 1
        const phasePrevNext = i % nInForms / nInForms
        
        const prevForm = forms[prevFormIndex]
        const nextForm = forms[nextFormIndex] ? forms[nextFormIndex] : forms[forms.length - 1]

        const form = []
        for (let j = 0; j < prevForm.length; ++j) {
            form.push(prevForm[j] + phasePrevNext * (nextForm[j] - prevForm[j]))
        }
        formsReal.push(form)
    }

    for (let i = 0; i < n; ++i) {
        const l = createLineGeom({ form: formsReal[i], points: path1, isClosed: true })
        _M.rotateVerticesY(l.v, -Math.PI / 2)
        _M.translateVertices(l.v, -w / 2 + startX + i * xStep, 0, 0)
        v.push(...l.v)
    }
    







    //const step = WF / ELEMS_N 
    //for (let i = 0; i < ELEMS_N; ++i) {
    //    const copyV = [...PATH_ELEM.v]
    //    _M.translateVertices(copyV, 0, 0, i * step - W + step / 2)
    //    v.push(...copyV)
    //}

    //_M.rotateVerticesY(v, -Math.PI / 2)

    console.log('&&&&', v)

    return { v }
}
