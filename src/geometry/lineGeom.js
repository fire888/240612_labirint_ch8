import { _M  } from "./_m"

export const createLineGeom = ({ form, points, isClosed }) => {
    const arrForms = []
    
    for (let i = 0; i < points.length; ++i) {
        const currentPoint = points[i]
        let prevPoint = null
        let nextPoint = null

        if (i === 0) {
            if (isClosed) {
                prevPoint = points[points.length - 1]
            }
        } else (
            prevPoint = points[i - 1]
        )

        if (i === points.length - 1) {
            if (isClosed) {
                nextPoint = points[0]
            }
        } else {
            nextPoint = points[i + 1]
        }

        let angle1
        if (prevPoint) {
            const deltaX1 = currentPoint[0] - prevPoint[0]
            const deltaY1 = currentPoint[1] - prevPoint[1]
            angle1 = _M.angleFromCoords(deltaX1, deltaY1)    
        } else {
            angle1 = 0
        }

        let angle2
        if (nextPoint) {
            const deltaX2 = nextPoint[0] - currentPoint[0]
            const deltaY2 = nextPoint[1] - currentPoint[1]
            angle2 = _M.angleFromCoords(deltaX2, deltaY2)
        } else {
            angle2 = 0
        }



        let angle = angle1 + (angle2 - angle1) / 2
        if (i === points.length - 1) {
            angle += Math.PI
        }

        const copyForm = [...form]
        _M.rotateVerticesZ(copyForm, angle)

        _M.translateVertices(copyForm, ...currentPoint)
        arrForms.push(copyForm)
    }

    const v = []
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
            v.push(...b)
        } 

    }



    return {
        v
    }


} 