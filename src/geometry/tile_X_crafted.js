import { _M } from "./_m"

import { createLineGeom  } from "./lineGeomCrafted";


export const createTileX = ({
                                w,
                                n,

                                formS,
                                formE,
                                formN,
                                formW,

                                pathS,
                                pathE,
                                pathN,
                                pathW,

                                colorS,
                                colorW,
                                colorE,
                                colorN,
                            }) => {
    const v = []
    const c = []

    /*
        |        |
        |        |
        | _______| <--!!!
    */

    {
        const p = createLineGeom({ path: pathS, form: formS, color: colorS, isClosed: true })
        _M.translateVertices(p.v, 0, 0, w / 2)
        v.push(...p.v)
        c.push(...p.c)
    }

    /*
        | <-!    |
        |        |
        | _______|
     */

    {
        const p = createLineGeom({ path: pathW, form: formW, color: colorW, isClosed: true })
        _M.rotateVerticesY(p.v, -Math.PI / 2)
        _M.translateVertices(p.v, -w / 2, 0, 0)
        v.push(...p.v)
        c.push(...p.c)
    }


    /*
        |        | <-!
        |        |
        | _______|
     */

    {
        const p = createLineGeom({ path: pathE, form: formE, color: colorE, isClosed: true })
        _M.rotateVerticesY(p.v, -Math.PI / 2)
        _M.translateVertices(p.v, w / 2, 0, 0)
        v.push(...p.v)
        c.push(...p.c)
    }


    /*
        -------------  <----!!!
        |            |
        |            |
        |            |
        |            |
        --------------

     */

    {
        const p = createLineGeom({ path: pathN, form: formN, color: colorN, isClosed: true })
        _M.translateVertices(p.v, 0, 0, -w / 2)
        v.push(...p.v)
        c.push(...p.c)
    }



    /*

            \ |   <-!!!!!
            _
    */
    {

        const pathStart = [
            [0, 0, 0],
            pathS[0],
            pathS[1],
            pathS[2],
        ]
        const pathEnd = [
            [0, 0, 0],
            pathE[0],
            pathE[1],
            pathE[2],
        ]

        const nRot = Math.floor(n * 0.6)

        const arrs = _M.interpolateArrays({
            paths: [pathStart, pathEnd],
            forms: [formS, formE],
            colors: [colorS, colorE],
            n: nRot,
        })

        const angleStep = Math.PI / 2 / (nRot + 1)
        for (let i = 0; i < arrs.paths.length; ++i) {
            const r = createLineGeom({
                path: arrs.paths[i],
                form: arrs.forms[i],
                color: arrs.colors[i],
            })
            _M.translateVertices(r.v, -w / 2, 0, 0)
            _M.rotateVerticesY(r.v, -angleStep * i - angleStep)
            _M.translateVertices(r.v, w / 2, 0, w / 2)
            v.push(...r.v)
            c.push(...r.c)
        }


        for (let i = 0; i < arrs.length; ++i) {
            _M.rotateVerticesY(arrs, -angleStep * i)
        }
    }

    /*

        | /   <-!!!!!
           --
    */
    {

        const pathStart = [
            pathS[2],
            pathS[3],
            pathS[4],
            [0, 0, 0],
        ]
        const pathEnd = [
            [...pathW[2]],
            [...pathW[1]],
            [...pathW[0]],
            [0, 0, 0],
        ]

        for (let i = 0; i < pathEnd.length; ++i) {
            pathEnd[i][0] = -pathEnd[i][0]
        }

        const nRot = Math.floor(n * 0.6)

        const arrs = _M.interpolateArrays({
            //paths: [pathStart, pathEnd],
            paths: [pathStart, pathEnd],
            forms: [formS, formW],
            colors: [colorS, colorW],
            n: nRot,
        })

        const angleStep = Math.PI / 2 / (nRot + 1)
        for (let i = 0; i < arrs.paths.length; ++i) {
            const r = createLineGeom({
                path: arrs.paths[i],
                form: arrs.forms[i],
                color: arrs.colors[i],
            })
            _M.translateVertices(r.v, w / 2, 0, 0)
            _M.rotateVerticesY(r.v, angleStep * i + angleStep)
            _M.translateVertices(r.v, -w / 2, 0, w / 2)
            v.push(...r.v)
            c.push(...r.c)
        }


        for (let i = 0; i < arrs.length; ++i) {
            _M.rotateVerticesY(arrs, -angleStep * i)
        }
    }

    /*
         ---------------
         |  __    <--!!!
         | |\
         |
     */
    {
        const pathWStart = [
            pathW[2],
            pathW[3],
            pathW[4],
            [0, 0, 0],
        ]
        const pathNEnd = [
            pathN[2],
            pathN[3],
            pathN[4],
            [0, 0, 0],
        ]

        const nRot = Math.floor(n * 0.6)

        const arrs = _M.interpolateArrays({
            paths: [pathWStart, pathNEnd],
            forms: [formW, formN],
            colors: [colorW, colorN],
            n: nRot,
        })

        const angleStep = Math.PI / 2 / (nRot + 1)
        for (let i = 0; i < arrs.paths.length; ++i) {
            const r = createLineGeom({
                path: arrs.paths[i],
                form: arrs.forms[i],
                color: arrs.colors[i],
            })
            _M.translateVertices(r.v, w / 2, 0, 0)
            _M.rotateVerticesY(r.v, -Math.PI / 2 + angleStep * i + angleStep)
            _M.translateVertices(r.v, -w / 2, 0, -w / 2)
            v.push(...r.v)
            c.push(...r.c)
        }
    }

    /*
        ____________
        |       __
        |        / |    <--!!!!
        |            |
        |            |
        ____________ |
     */
    {
        const pathNStart = [
            pathN[2],
            pathN[1],
            pathN[0],
            [0, 0, 0],
        ]
        const pathEEnd = [
            [...pathE[2]],
            [...pathE[3]],
            [...pathE[4]],
            [0, 0, 0],
        ]
        for (let i = 0; i < pathEEnd.length; ++i) {
            pathEEnd[i][0] = -pathEEnd[i][0]
        }

        const nRot = Math.floor(n * 0.6)

        const arrs = _M.interpolateArrays({
            paths: [pathNStart, pathEEnd],
            forms: [formN, formE],
            colors: [colorN, colorE],
            n: nRot,
        })

        const angleStep = Math.PI / 2 / (nRot + 1)
        for (let i = 0; i < arrs.paths.length; ++i) {
            const r = createLineGeom({
                path: arrs.paths[i],
                form: arrs.forms[i],
                color: arrs.colors[i],
            })
            _M.translateVertices(r.v, -w / 2, 0, 0)
            _M.rotateVerticesY(r.v, angleStep * i + angleStep)
            _M.translateVertices(r.v, w / 2, 0, -w / 2)
            v.push(...r.v)
            c.push(...r.c)
        }
    }

    return { v, c, vC }
}
