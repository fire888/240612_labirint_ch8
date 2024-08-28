import * as THREE from 'three'
import { LabLevel } from './LabLevel'
import { createStair } from '../../geometry/stair'
import { createRandomDataForLine } from '../../geometry/lineGeomCrafted'
import { createMesh } from '../../geometry/helperCreateMesh' 

const TILES_X = 11
const TILES_Z = 13
const LEVEL_H = 3.5
const W = 3

export class Lab {
    constructor () {}

    async init(root) {
        this.mesh = new THREE.Object3D()

        const material = new THREE.MeshPhongMaterial({ 
            color: 0xFFFFFF, 
            vertexColors: true,
            envMap: root.loader.assets.sky,
            reflectivity: .6,
        })

        // start stair
        const stairDataBottom = createRandomDataForLine()
        stairDataBottom.dir = 'n'
        const stairDataCenterB = createRandomDataForLine()
        const stairDataCenterT = createRandomDataForLine()
        const stairDataTop = createRandomDataForLine()
        stairDataTop.dir = 's'

        const startStair = createStair({ 
            stairDataBottom, 
            stairDataCenterB,
            stairDataCenterT,
            stairDataTop, 
            n: 10, 
            w: W, 
            h: LEVEL_H,
        })
        const stairM = createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = W * 5
        stairM.position.z = W
        this.mesh.add(stairM)



        // levels
        for (let i = 0; i < 3; ++i) {
            const labLevel = new LabLevel()
            await labLevel.init(root, {
                posStart: [5, 1],
                posStartDir: 's', 
                dataForEnter: stairDataTop,
                material, 
                numTilesX: TILES_X, 
                numTilesZ: TILES_Z,
            })
            labLevel.mesh.position.y = LEVEL_H * i + LEVEL_H
            this.mesh.add(labLevel.mesh)
        }
    } 
}