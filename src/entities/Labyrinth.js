import * as THREE from 'three'
import { createBuffer00 } from '../geometry/buffer00'
import { _M } from "../geometry/_m";

export const createMesh = ({

    v = [],
    uv = [],
    c = [],
    material = new THREE.MeshBasicMaterial({ color: 0x777777 })

                           }) => {

    const geometry = new THREE.BufferGeometry()
    const vF32 = new Float32Array(v)
    geometry.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
    geometry.computeVertexNormals()
    const uvF32 = new Float32Array(uv)
    //geometry.setAttribute('uv', new THREE.BufferAttribute(uvF32, 2))
    //const cF32 = new Float32Array(c)
    //geometry.setAttribute('color', new THREE.BufferAttribute(cF32, 3))
    return new THREE.Mesh(geometry, material)
}


export class Labyrinth {
    constructor() {

    }

    init () {
        const v = []
        let d = 0
        for (let i = 0; i < 15; ++i) {
            const l = Math.random() * 3 + 1

            const r = createBuffer00({
                d: .1,
                w: l,
                h: 2,
                border: .1,
                splitH: Math.floor(Math.random() * 15) + 5,
                splitHWidth: .01,
                splitHD: 0.02,
                splitW: Math.floor(Math.random() * 15),
                splitWD: 0.01,
                isCapBottom: false,
                isCapTop: false,
                isCapLeft: i === 0,
                isCapRight: i === 14,
            })

            _M.translateVertices(r.v, d, 0, 0)
            v.push(...r.v)

            d += l
        }

        this.mesh = createMesh({
            v,
            material: new THREE.MeshPhongMaterial({ color: 0xffffff })
        })
        this.mesh.y = .1
    }
}
