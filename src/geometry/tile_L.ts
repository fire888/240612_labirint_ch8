import { _M } from "./_m";
import { createLineGeom } from './_lineGeom'
import { DataToCreateGeom, DataToCreateTileU, DataToCreateLine } from '../entities/labyrinth/types'
import { vC_H } from "constants/CONSTANTS";


export const createTileL = (data: DataToCreateTileU) => {
    let { w, n, e, s, num, width } = data

    let dir = null
    if (n) {
        if (e) dir = 'ne'
        if (w) dir = 'nw'
    }
    if (s) {
        if (e) dir = 'se'
        if (w) dir = 'sw'
    }

    let startData: DataToCreateLine, endData: DataToCreateLine


    const v = []
    const c = []



    if (dir === 'nw') {
        startData = data.n
        endData = data.w

        const arr = _M.interpolateArrays({
            forms: [startData.form, endData.form],
            paths: [startData.path, endData.path],
            colors: [startData.color, endData.color],
            n: num,
        })

        const angleStep = Math.PI * .5 / num

        for (let i = 0; i < arr.paths.length; i++) {
            const l = createLineGeom({
                form: arr.forms[i],
                path: arr.paths[i],
                color: arr.colors[i],
                isClosed: true,
            })
            _M.translateVertices(l.v, -width / 2, 0, 0)
            _M.rotateVerticesY(l.v, angleStep * i + angleStep / 2)
            _M.translateVertices(l.v, width / 2, 0, -width / 2)
            v.push(...l.v)
            c.push(...l.c)
        }
    }
    if (dir === 'ne') {
        startData = data.e
        endData = data.n

        const copyStartPath = JSON.parse(JSON.stringify(startData.path))
        copyStartPath[0][0] = -startData.path[4][0]
        
        copyStartPath[1][0] = -startData.path[3][0]
        copyStartPath[1][1] = startData.path[3][1]
        
        copyStartPath[3][0] = -startData.path[1][0]
        copyStartPath[3][1] = startData.path[1][1]
        
        copyStartPath[4][0] = -startData.path[0][0]

        const arr = _M.interpolateArrays({
            forms: [startData.form, endData.form],
            paths: [copyStartPath, endData.path],
            colors: [startData.color, endData.color],
            n: num,
        })

        const angleStep = Math.PI * .5 / num

        for (let i = 0; i < arr.paths.length; i++) {
            const l = createLineGeom({
                form: arr.forms[i],
                path: arr.paths[i],
                color: arr.colors[i],
                isClosed: true,
            })
            _M.translateVertices(l.v, width / 2, 0, 0)
            _M.rotateVerticesY(l.v, -Math.PI * .5 + angleStep * i + angleStep / 2)
            _M.translateVertices(l.v, -width / 2, 0, -width / 2)
            v.push(...l.v)
            c.push(...l.c)
        }
    }

    




    // if (key === 'ws' || key === 'ne') {
    //     const copy = JSON.parse(JSON.stringify(paths[1]))
    //     const s1 = copy[0][1]
    //     copy[0][1] = copy[4][1]
    //     copy[4][1] = s1
        
    //     const s2 = copy[1][1] 
    //     copy[1][1] = copy[3][1] 
    //     copy[3][1] = s2 

    //     const s3 = copy[0][0]
    //     copy[0][0] = -copy[4][0]
    //     copy[4][0] = -s3

    //     const s4 = copy[1][0]
    //     copy[1][0] = -copy[3][0]
    //     copy[3][0] = -s4


    //     paths = [paths[0], copy]
    // }

    //const arrs = _M.interpolateArrays({ forms, paths, colors, n })

    // CREATE ARRAYS FROM 

    // const v = []
    // const c = []

    const vC: number[] = []
    // const vC = [
    //     ..._M.createPolygon(
    //         [-w * .5, 0, w * .5],
    //         [w * .5, 0, w * .5],
    //         [w * .5, 0, -w * .5],
    //         [-w * .5, 0, -w * .5],
    //     )
    // ]

    // // collision form 
    // /*
    //          - -
    //        /    
    //      /  
    //     |
    //     |       *  
    // */
    // const r = w
    // const angleStep = Math.PI * .5 / 5
    // const arcVC = [] 
    // for (let i = 0; i < 5; ++i) {
    //     const add = Math.PI * .5
    //     arcVC.push(..._M.createPolygon(
    //         [Math.cos(-angleStep * (i + 1) - add) * r, 0, Math.sin(-angleStep * (i + 1) - add) * r],
    //         [Math.cos(-angleStep * i - add) * r, 0, Math.sin(-angleStep * i - add) * r],
    //         [Math.cos(-angleStep * i - add) * r, vC_H, Math.sin(-angleStep * i - add) * r],
    //         [Math.cos(-angleStep * (i + 1) - add) * r, vC_H, Math.sin(-angleStep * (i + 1) - add) * r],
    //     ))
    // }
    // _M.translateVertices(arcVC, w * .5, 0, w * .5)
    
    
    // if (key === 'se') {
    //     const stepAngle = -Math.PI / 2 / n

    //     for (let i = 0; i < n; ++i) {
    //         if (arrs.paths[i].length === 0) {
    //             continue;
    //         }
    //         const l = createLineGeom({
    //             form: arrs.forms[i],
    //             path: arrs.paths[i],
    //             color: arrs.colors[i],
    //             isClosed: true,
    //         })
    //         _M.translateVertices(l.v, -w / 2, 0, 0)
    //         _M.rotateVerticesY(l.v, stepAngle * i + stepAngle * .5)
    //         v.push(...l.v)
    //         c.push(...l.c)
    //     }

    //     vC.push(...arcVC)
    //     _M.translateVertices(v, w / 2, 0, w / 2)
    // }

    // if (key === 'nw') {
    //     const stepAngle = Math.PI / 2 / n

    //     for (let i = 0; i < n; ++i) {
    //         if (arrs.paths[i].length === 0) {
    //             continue;
    //         }
    //         const l = createLineGeom({
    //             form: arrs.forms[i],
    //             path: arrs.paths[i],
    //             color: arrs.colors[i],
    //             isClosed: true,
    //         })
    //         _M.rotateVerticesY(l.v, -Math.PI / 2)
    //         _M.translateVertices(l.v, 0, 0, w / 2)
    //         _M.rotateVerticesY(l.v, stepAngle * i + stepAngle * .5)
    //         v.push(...l.v)
    //         c.push(...l.c)
    //     }
    //     _M.translateVertices(v, -w / 2, 0, -w / 2)
    
    //     _M.rotateVerticesY(arcVC, Math.PI)
    //     vC.push(...arcVC)
    // }

    // if (key === 'ws') {
    //     const stepAngle = -Math.PI / 2 / n

    //     for (let i = 0; i < n; ++i) {
    //         if (arrs.paths[i].length === 0) {
    //             continue;
    //         }
    //         const l = createLineGeom({
    //             form: arrs.forms[i],
    //             path: arrs.paths[i],
    //             color: arrs.colors[i],
    //             isClosed: true,
    //         })
    //         _M.rotateVerticesY(l.v, -Math.PI / 2)
    //         _M.translateVertices(l.v, 0, 0, -w / 2)
    //         _M.rotateVerticesY(l.v, stepAngle * i + stepAngle * .5)
    //         v.push(...l.v)
    //         c.push(...l.c)
    //     }
    //     _M.translateVertices(v, -w / 2, 0, w / 2)

    //     _M.rotateVerticesY(arcVC, Math.PI * 1.5)
    //     vC.push(...arcVC)
    // }

    // if (key === 'ne') {
    //     const stepAngle = Math.PI / 2 / n
        
    //     for (let i = 0; i < n; ++i) {
    //         if (arrs.paths[i].length === 0) {
    //             continue;
    //         }
    //         const l = createLineGeom({
    //             form: arrs.forms[i],
    //             path: arrs.paths[i],
    //             color: arrs.colors[i],
    //             isClosed: true,
    //         })
    //         _M.translateVertices(l.v, -w / 2, 0, 0)
    //         _M.rotateVerticesY(l.v, stepAngle * i + stepAngle * .5)
    //         v.push(...l.v)
    //         c.push(...l.c)
    //     }
    //     _M.translateVertices(v, w / 2, 0, -w / 2)

    //     _M.rotateVerticesY(arcVC, Math.PI * .5)
    //     vC.push(...arcVC)
    // }

    return { v, c, vC }
}
