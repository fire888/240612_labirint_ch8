import { _M, A3 } from "./_m"

import { createLineGeom  } from "./_lineGeom";
import { MazeSegment } from "../entities/labyrinth/types"


export const createTileT = (data: {
    w: number,
    n: number,
    tile: MazeSegment,
    key: string
}) => {
    const { w, n, tile, key } = data

    const v: number[] = []
    const c: number[] = []
    const vC: number[] = [
        ..._M.createPolygon(
            [-w * .5, 0, w * .5],
            [w * .5, 0, w * .5],
            [w * .5, 0, -w * .5],
            [-w * .5, 0, -w * .5],
        )
    ]


    if (!key) {
        return { v, c }
    }


    if (key.includes('s-e')) {
        {
            /*

                    \ |   <-!!!!!  
                    _
            */

            const pathStart: A3[] = [
                [0, 0, 0], 
                tile.s.path[0],
                tile.s.path[1],
                tile.s.path[2],
            ] 
            const pathEnd: A3[] = [
                [0, 0, 0], 
                tile.e.path[0],
                tile.e.path[1],
                tile.e.path[2],
            ] 
    
            const nRot = Math.floor(n * 0.6) 
    
            const arrs = _M.interpolateArrays({ 
                paths: [pathStart, pathEnd], 
                forms: [tile.s.form, tile.e.form], 
                colors: [tile.s.color, tile.e.color],
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
        }
    }

    if (key.includes('w-s')) {
            /*
            
                | /   <-!!!!!  
                -- 
            */
        {

            const pathStart: A3[] = [
                tile.s.path[2],
                tile.s.path[3],
                tile.s.path[4],
                [0, 0, 0], 
            ] 
            const pathEnd: A3[] = [
                [...tile.w.path[2]],
                [...tile.w.path[1]],
                [...tile.w.path[0]],
                [0, 0, 0], 
            ] 
            
            for (let i = 0; i < pathEnd.length; ++i) {
                pathEnd[i][0] = -pathEnd[i][0] 
            }

            const nRot = Math.floor(n * 0.6) 
                
            const arrs = _M.interpolateArrays({ 
                paths: [pathStart, pathEnd], 
                forms: [tile.s.form, tile.w.form], 
                colors: [tile.s.color, tile.w.color],
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
            
            
            // for (let i = 0; i < arrs.length; ++i) {
            //     _M.rotateVerticesY(arrs, -angleStep * i)
            // }
        }
    }


    if (key.includes('n-e')) {
        {
            /*
                ----------
                       ---
                        / |



            */

            const pathStart: A3[] = [
                [0, 0, 0], 
                tile.n.path[0], 
                tile.n.path[1], 
                tile.n.path[2], 
            ]
            const pathEnd: A3[] = [
                [0, 0, 0], 
                tile.e.path[0], 
                tile.e.path[1], 
                tile.e.path[2], 
            ]

            const nRot = Math.floor(n * 0.6) 
    
            const arrs = _M.interpolateArrays({ 
                paths: [pathStart, pathEnd], 
                forms: [tile.n.form, tile.e.form], 
                colors: [tile.n.color, tile.e.color],
                n: nRot,
            }) 

            const angleStep = Math.PI / 2 / (nRot) 
            for (let i = 0; i < arrs.paths.length; ++i) {
                const r = createLineGeom({ form: arrs.forms[i], path: arrs.paths[i], color: arrs.colors[i], isClosed: false })
                _M.translateVertices(r.v, -w / 2, 0, 0)
                _M.rotateVerticesY(r.v, angleStep * i)
                _M.translateVertices(r.v, w / 2, 0 , -w / 2)
                v.push(...r.v) 
                c.push(...r.c) 
            }
        }
    }

    if (key.includes('n-w')) {
        {
            /*
                ----------
                |\



            */

            const pathStart: A3[] = [
                [0, 0, 0], 
                tile.w.path[4], 
                tile.w.path[3], 
                tile.w.path[2], 
            ]
            const pathEnd: A3[] = [
                [0, 0, 0], 
                tile.n.path[4], 
                tile.n.path[3], 
                tile.n.path[2], 
            ]

            const nRot = Math.floor(n * 0.6) 
    
            const arrs = _M.interpolateArrays({ 
                paths: [pathStart, pathEnd], 
                forms: [tile.w.form, tile.n.form], 
                colors: [tile.w.color, tile.n.color],
                n: nRot,
            }) 

            const angleStep = Math.PI / 2 / (nRot) 
            for (let i = 0; i < arrs.paths.length; ++i) {
                const r = createLineGeom({ form: arrs.forms[i], path: arrs.paths[i], color: arrs.colors[i], isClosed: false })
                _M.translateVertices(r.v, w / 2, 0, 0)
                _M.rotateVerticesY(r.v, angleStep * i - Math.PI / 2)
                _M.translateVertices(r.v, -w / 2, 0 , -w / 2)
                v.push(...r.v) 
                c.push(...r.c) 
            }
        }
    }


    if (key.includes('w-e')) {

        {
            /*
                ----------
                | | | | | <--!!!!
                |
                |          |
                |_________ | 

            */

            const pathStart: A3[] = [
                [0, 0, 0], 
                tile.w.path[4], 
                tile.w.path[3], 
                tile.w.path[2], 
            ]
            const pathEnd: A3[] = [
                [0, 0, 0], 
                tile.e.path[4], 
                tile.e.path[3], 
                tile.e.path[2], 
            ]
    
            const arrs = _M.interpolateArrays({ 
                paths: [pathStart, pathEnd], 
                forms: [tile.w.form, tile.e.form], 
                colors: [tile.w.color, tile.e.color],
                n,
            }) 
    
            const step = w / n
            for (let i = 0; i < arrs.paths.length; ++i) {
                const r = createLineGeom({ form: arrs.forms[i], path: arrs.paths[i], color: arrs.colors[i], isClosed: false })
                _M.rotateVerticesY(r.v, -Math.PI / 2)
                _M.translateVertices(r.v, -w / 2 + i * step + step / 2, 0, 0)
                v.push(...r.v) 
                c.push(...r.c) 
            }

            vC.push(
                ..._M.createPolygon(
                    [-w * .5, 0, -w * .5],
                    [w * .5, 0, -w * .5],
                    [w * .5, w, -w * .5],
                    [-w * .5, w, -w * .5],
                )
            )
        }
    }


    if (key.includes('s-n')) {
        /*
            -----------
            | -
            | -
            | -        
            |_-________

        */
       
        const pathStart: A3[] = [
            [0, 0, 0], 
            tile.s.path[4], 
            tile.s.path[3], 
            tile.s.path[2], 
        ]
        const pathEnd: A3[] = [
            [0, 0, 0], 
            tile.n.path[4], 
            tile.n.path[3], 
            tile.n.path[2], 
        ]

        const arrs = _M.interpolateArrays({ 
            paths: [pathStart, pathEnd], 
            forms: [tile.s.form, tile.n.form], 
            colors: [tile.s.color, tile.n.color],
            n,
        }) 

        const step = w / n
        for (let i = 0; i < arrs.paths.length; ++i) {
            const r = createLineGeom({ form: arrs.forms[i], path: arrs.paths[i], color: arrs.colors[i], isClosed: false })
            _M.translateVertices(r.v, 0, 0, w / 2 - i * step - step / 2)
            v.push(...r.v) 
            c.push(...r.c) 
        }

        vC.push(
            ..._M.createPolygon(
                [-w * .5, 0, w * .5],
                [-w * .5, 0, -w * .5],
                [-w * .5, w, -w * .5],
                [-w * .5, w, w * .5],
            )
        )

    }


    if (key.includes('n-s')) {
        /*
            -----------
                      -
                      - <--!!!
                      -  
            _________ -

        */
       
        const pathStart: A3[] = [
            [0, 0, 0], 
            tile.s.path[0], 
            tile.s.path[1], 
            tile.s.path[2], 
        ]
        const pathEnd: A3[] = [
            [0, 0, 0], 
            tile.n.path[0], 
            tile.n.path[1], 
            tile.n.path[2], 
        ]

        const arrs = _M.interpolateArrays({ 
            paths: [pathStart, pathEnd], 
            forms: [tile.s.form, tile.n.form], 
            colors: [tile.s.color, tile.n.color],
            n,
        }) 

        const step = w / n
        for (let i = 0; i < arrs.paths.length; ++i) {
            const r = createLineGeom({ form: arrs.forms[i], path: arrs.paths[i], color: arrs.colors[i], isClosed: false })
            _M.translateVertices(r.v, 0, 0, w / 2 - i * step - step / 2)
            v.push(...r.v) 
            c.push(...r.c) 
        }

        vC.push(
            ..._M.createPolygon(
                [w * .5, 0, -w * .5],
                [w * .5, 0, w * .5],
                [w * .5, w, w * .5],
                [w * .5, w, -w * .5],
            )
        )

    }

    if (key.includes('e-w')) {
        /*
            ----------
                      
                      
            |||||||||| <--!!!           
            __________ 

        */
       
        const pathStart: A3[] = [
            [0, 0, 0], 
            tile.w.path[0], 
            tile.w.path[1], 
            tile.w.path[2], 
        ]
        const pathEnd: A3[] = [
            [0, 0, 0], 
            tile.e.path[0], 
            tile.e.path[1], 
            tile.e.path[2], 
        ]

        const arrs = _M.interpolateArrays({ 
            paths: [pathStart, pathEnd], 
            forms: [tile.w.form, tile.e.form], 
            colors: [tile.w.color, tile.e.color],
            n,
        }) 

        const step = w / n
        for (let i = 0; i < arrs.paths.length; ++i) {
            const r = createLineGeom({ form: arrs.forms[i], path: arrs.paths[i], color: arrs.colors[i], isClosed: false })
            _M.translateVertices(r.v, 0, 0, w / 2 - i * step - step / 2)
            _M.rotateVerticesY(r.v, -Math.PI / 2)
            v.push(...r.v) 
            c.push(...r.c) 
        }

        vC.push(
            ..._M.createPolygon(
                [w * .5, 0, w * .5],
                [-w * .5, 0, w * .5],
                [-w * .5, w, w * .5],
                [w * .5, w, w * .5],
            )
        )

    }
    
    return { v, c, vC }
}
