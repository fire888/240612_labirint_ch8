import { _M } from "./_m";
import { createLineGeom } from './lineGeomCrafted'
import * as THREE from 'three'


export const createDoor = (data: any) => {
    // CREATE ARRAYS DATA

    const { forms, paths, colors, key } = data
    console.log(forms)

    //const m = new THREE.Object3D()
    
    const v = []
    const c = []
    const n = 16
    const w = 5
    const h = 7
    for (let i = 0; i < n; ++i) {
        const y = -1 + i / n * h
        const l = createLineGeom({
            form: forms[0],
            path: [[w / 2, y + .2, 0], [w / 2, y, 0], [-w / 2, y, 0], [-w / 2, y + .2, 0],  ],
            color: colors[0],
            isClosed: true,
        })
        v.push(...l.v)
        c.push(...l.c)
    }

    return { v, c }
}
