import * as THREE from 'three'
import { _M } from "../../geometry/_m";
import { createScheme04_crafted } from './scheme04';
import { createTileI } from '../../geometry/tile_I_crafted'
import { createTileL } from '../../geometry/tile_L_crafted'
import { createTileT } from '../../geometry/tile_T_crafted'
import { createTileU } from '../../geometry/tile_U_crafted'
import { createTileX } from '../../geometry/tile_X_crafted';
import { createStair } from "../../geometry/stair";

import {
    createMesh,
} from '../../geometry/helperCreateMesh'


const form1 = [
    0, .05, .05,
    0, .05, -.05,
    0, .0, .0,
]

const form2 = [
    0, .03, .03,
    0, .03, -.03,
    0, .0, .0,
]

const form3 = [
    0, .05, .05,
    0, .05, -.05,
    0, .0, .0,
]

const form4 = [
    0, .05, .05,
    0, .05, -.05,
    0, .01, .0,
]


const path1 = [
    [.9, 0, 0],
    [1.2, 1.4, 0],
    [0, 2.5, 0],
    [-1.2, 1.4, 0],
    [-.9, 0, 0],
]

const path2 = [
    [.9, .2, 0],
    [1.2, 1.3, 0],
    [0, 2.2, 0],
    [-2, 1.3, 0],
    [-.9, .2, 0],
]

const path3 = [
    [.5, 0, 0],
    [1.7, 1.4, 0],
    [0, 2, 0],
    [-1, 1.4, 0],
    [-.5, 0, 0],
]

const color1 = [1, 1, 1]
const color2 = [.3, 1, 1]
const color3 = [0, 0, 1]
const color4 = [0, 1, 1]

const forms = [form1, form2, form3, form4]
const paths = [path1, path2, path3, path1]
const colors = [color1, color2, color3, color4]

const n = 20



const TUNNEL = 3
const N_FLOORS = 5

export class Labyrinth02 {
    constructor () {
        this.collisionMech = null
    }

    async init () {
        const WIDTH = 23
        const HEIGHT = 23
        const W = 3
        const H = 3

        const WC = W / 2 - .2

        this.mesh = new THREE.Object3D()
        this.mesh.position.y = 0.08
        this.mesh.position.z = -W * 23 / 2
        this.mesh.position.x = -W * 23 / 2

        const material = new THREE.MeshPhongMaterial({color: 0xffffff, vertexColors: true})

        const s = await createScheme04_crafted({})
        console.log('lab_02_Data', s)


    }
}
