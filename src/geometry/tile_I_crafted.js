import { _M } from "./_m";
import { createLineGeom } from './lineGeomCrafted'

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
]

const path2 = [
    [.5, 0, 0],
    [1.7, 1.4, 0],
    [0, 3, 0],
    [-1, 1.4, 0],
    [-.5, 0, 0],
]

const path3 = [
    [.5, 0, 0],
    [1.7, 1.4, 0],
    [0, 2, 0],
    [-1, 1.4, 0],
    [-.5, 0, 0],
]

const color1 = [1, 0, 0]
const color2 = [0, 1, 0]
const color3 = [0, 0, 1]
const color4 = [0, 0, 0]

const forms = [form1, form2, form3]
const paths = [path1, path2, path3]
const colors = [color1, color4, color2, color3]

const n = 20

//export const createTileI = ({ w, n, forms = [], paths = [], colors = [] }) => {
export const createTileI = ({ w }) => {
    const formsReal = []
    const pathsReal = []
    const colorsReal = []


    const xStep = w / n
    const startX = xStep / 2

    const nInForms = n / (forms.length - 1)
    const nInPaths = n / (paths.length - 1)
    const nInColors = n / (colors.length - 1)

    for (let i = 0; i < n; ++i) {
        {  // create forms
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

        { // create paths
            const prevPathIndex = Math.floor(i / nInPaths)
            const nextPathIndex = prevPathIndex + 1
            const phasePrevNext = i % nInPaths / nInPaths

            const prevPath = paths[prevPathIndex]
            const nextPath = paths[nextPathIndex] ? paths[nextPathIndex] : paths[paths.length - 1]

            const path = []
            if (!nextPath.length) {
                pathsReal.push(path)
                continue;
            }

            for (let j = 0; j < prevPath.length; ++j) {
                const p = []
                for (let k = 0; k < prevPath[j].length; ++k) {
                    p.push(prevPath[j][k] + phasePrevNext * (nextPath[j][k] - prevPath[j][k]))
                }
                path.push(p)
            }
            pathsReal.push(path)
        }

        { // create colors
            const prevCIndex = Math.floor(i / nInColors)
            const nextCIndex = prevCIndex + 1
            const phasePrevNext = (i % nInColors) / nInColors

            const prevC = colors[prevCIndex]
            const nextC = colors[nextCIndex] ? colors[nextCIndex] : colors[colors.length - 1]

            const color = []

            for (let j = 0; j < prevC.length; ++j) {
                color.push(prevC[j] + phasePrevNext * (nextC[j] - prevC[j]))
            }
            colorsReal.push(color)
        }
    }

    const v = []
    const c = []

    for (let i = 0; i < n; ++i) {
        if (pathsReal[i].length === 0) {
            continue;
        }
        const l = createLineGeom({
            form: formsReal[i],
            points: pathsReal[i],
            color: colorsReal[i],
            isClosed: true,
        })
        _M.rotateVerticesY(l.v, -Math.PI / 2)
        _M.translateVertices(l.v, -w / 2 + startX + i * xStep, 0, 0)
        v.push(...l.v)
        c.push(...l.c)
    }

    return { v, c }
}
