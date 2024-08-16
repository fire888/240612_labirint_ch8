import * as THREE from 'three'
import { _M } from "../../geometry/_m";
import { createTileI } from '../../geometry/tile_I_crafted'
import { createTileL } from '../../geometry/tile_L_crafted'
import { createTileT } from '../../geometry/tile_T'
import { createTileU } from '../../geometry/tile_U_crafted'
import { createStair } from "../../geometry/stair"
import { createTileX } from "../../geometry/tile_X"


import {
    createMesh,
    makeCreaterSquare
} from '../../geometry/helperCreateMesh'


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




export const createDemoTiles = (data) => {
    const { W, WC, H } = data

    const mesh = new THREE.Object3D()

    const makeSquare = makeCreaterSquare({ w: W })

    const _v = []
    const _c = []
    {
        const r = createTileI({ 
            w: W, 
            n: 5,
            forms: [form1, form2],
            paths: [path1, path2],
            colors: [color1, color2],
        })

        const m = createMesh({
            v: r.v,
            c: r.c,
            material: new THREE.MeshPhongMaterial({
                color: 0xffffff,
                vertexColors: true,
            })
        })
        mesh.add(m)

        const line = makeSquare()
        mesh.add(line)
    }

    {
        const r = createTileU({ 
            w: W,
            n: 5,
            forms: [form1, form2],
            paths: [path1, path2],
            colors: [color1, color2],
        })

        const m = createMesh({
            v: r.v,
            c: r.c,
            material: new THREE.MeshPhongMaterial({
                color: 0xffffff,
                vertexColors: true,
            })
        })
        const line = makeSquare()
        m.add(line)

        mesh.add(m)
        m.position.x = -10
    }

    {
        const r = createTileL({ 
            w: W, 
            n: 8,
            forms: [form1, form2],
            paths: [path1, path2],
            colors: [color1, color2],
        })

        const m = createMesh({
            v: r.v,
            c: r.c,
            material: new THREE.MeshPhongMaterial({
                color: 0xffffff,
                vertexColors: true,
            })
        })
        m.position.x = -5
        mesh.add(m)

        const line = makeSquare()
        line.position.x = -5
        mesh.add(line)
    }

    {
        const r = createTileT({ w: W, h: H, wc: WC })
        _M.translateVertices(r.v, W * 4, 0, 0)
        _v.push(...r.v)

        const line = makeSquare()
        line.position.z = 15
        line.position.y = 15
        line.position.x = W * 4
        mesh.add(line)
    }



    {
        const stair = createStair({ stairDataBottom: { dir: 'e' }, stairDataTop: { dir: 'w' }, W, WC, H })
        _M.translateVertices(stair.v, W * 9, 0, 0)
        _v.push(...stair.v)

        const line0 = makeSquare()
        line0.position.z = 15
        line0.position.y = 15
        line0.position.x = W * 8
        mesh.add(line0)

        const line1 = makeSquare()
        line1.position.z = 15
        line1.position.y = 15
        line1.position.x = W * 9
        mesh.add(line1)

        const line2 = makeSquare()
        line2.position.z = 15
        line2.position.y = 15
        line2.position.x = W * 10
        mesh.add(line2)
    }


    {
        const r = createTileX({ w: W, h: H, wc: WC })
        _M.translateVertices(r.v, W * 12, 0, 0)
        _v.push(...r.v)

        const line = makeSquare()
        line.position.z = 15
        line.position.y = 15
        line.position.x = W * 12
        mesh.add(line)
    }

    const m = createMesh({ v: _v, c: _c, material: new THREE.MeshPhongMaterial({ color: 0xff0000 }) })
    m.position.z = 15
    m.position.y = 15
    mesh.add(m)

    return mesh
}
