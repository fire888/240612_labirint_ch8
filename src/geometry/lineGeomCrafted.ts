import { _M  } from "./_m"

type AttributesArrs = {
    v: number[],
    c: number[],
}

type DataToCreateLine = {
    form: number[],
    path: number[][],
    color: number[],
    isClosed: boolean,
    isDebug?: boolean,
}

export const createRandomDataForLine = (): DataToCreateLine => {
    return {
        form: [
            0, .1 * Math.random(), .12 - Math.random() * .1,
            0, .1 * Math.random(), -.12 + Math.random() * .1,
            0, 0, 0,
        ],
        path: [
            [1.3 * Math.random(), 0, 0],
            [1 + .7 * Math.random(), .6 + Math.random(), 0],
            [0, 2, 0],
            [-1 - .7 * Math.random(), .6 + Math.random(), 0],
            [-1.3 * Math.random(), 0, 0],
        ],
        color: [Math.random(), Math.random(), Math.random()],
        isClosed: true,
    }
}


export const createLineGeom = (data: DataToCreateLine): AttributesArrs => {
    const {
        form,
        path,
        color,
        isClosed,
        isDebug,
    } = data


    const arrForms = []
    
    for (let i = 0; i < path.length; ++i) {
        const currentPoint = path[i]
        let prevPoint = null
        let nextPoint = null

        if (i === 0) {
            if (isClosed) {
                prevPoint = path[path.length - 1]
            }
        } else (
            prevPoint = path[i - 1]
        )

        if (i === path.length - 1) {
            if (isClosed) {
                nextPoint = path[0]
            }
        } else {
            nextPoint = path[i + 1]
        }

        let angle1 = null
        if (prevPoint) {
            const deltaX1 = currentPoint[0] - prevPoint[0]
            const deltaY1 = currentPoint[1] - prevPoint[1]
            angle1 = _M.angleFromCoords(deltaX1, deltaY1)    
        }

        let angle2 = null
        if (nextPoint) {
            const deltaX2 = nextPoint[0] - currentPoint[0]
            const deltaY2 = nextPoint[1] - currentPoint[1]
            angle2 = _M.angleFromCoords(deltaX2, deltaY2)
        }

        if (angle1 === null) {
            angle1 = angle2
        }
        if (angle2 === null) {
            angle2 = angle1
        }



        let angle = angle2 - (angle2 - angle1) / 2
        angle = angle % (Math.PI * 2)

        if (i === path.length - 1 && isClosed) {
           angle -= Math.PI
        }

        const copyForm = [...form]
        _M.rotateVerticesZ(copyForm, angle)

        _M.translateVertices(copyForm, ...currentPoint)
        arrForms.push(copyForm)
    }

    const v = []
    const c = []

    for (let i = 0; i < arrForms.length; ++i) {
        if (!isClosed && i === 0) {
            continue;
        }
        
        const prevForm = i === 0 ? arrForms[arrForms.length - 1] : arrForms[i - 1]
        const currentForm = arrForms[i]

        for (let i = 0; i < currentForm.length; i += 3) {
            let indN = i + 3
            if (i === currentForm.length - 3) {
                indN = 0
            }

            const b = _M.createPolygon(
                [prevForm[i], prevForm[i + 1], prevForm[i + 2]],
                [currentForm[i], currentForm[i + 1], currentForm[i + 2]],
                [currentForm[indN], currentForm[indN + 1], currentForm[indN + 2]],
                [prevForm[indN], prevForm[indN + 1], prevForm[indN + 2]],
            )

            c.push(..._M.fillColorFace(color))
            v.push(...b)
        } 

    }

    return { v, c, }
} 
