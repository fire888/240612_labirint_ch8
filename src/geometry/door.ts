import { _M } from "./_m";
import { createLineGeom } from './lineGeomCrafted'
import * as THREE from 'three'

type DoorCreateData = {
    form: number[],
    color: number[],
}


export const createDoor = (data: DoorCreateData) => {
    const { form, color } = data
    
    const v = []
    const c = []
    const n = 16
    const w = 5
    const h = 7
    for (let i = 0; i < n; ++i) {
        const y = -1 + i / n * h
        const l = createLineGeom({
            form: form,
            path: [[w / 2, y + .2, 0], [w / 2, y, 0], [-w / 2, y, 0], [-w / 2, y + .2, 0],  ],
            color: color,
            isClosed: true,
        })
        v.push(...l.v)
        c.push(...l.c)
    }

    return { v, c }
}
