import * as THREE from 'three'
import { LabLevel } from './LabLevel'
import { createStair } from '../../geometry/stair'
import { createRandomDataForLine } from '../../geometry/lineGeomCrafted'
import { _M } from "../../geometry/_m"
import { TopTunnel } from './TopTunnel'

const TILES_X = 11
const TILES_Z = 13
//const LEVEL_H = 3.3
const LEVEL_H = 5
const FLOORS_NUM = 10
//const FLOORS = 1
const W = 3
const N = 7

export class Lab {
    constructor () {}

    async init(root) {
        this.mesh = new THREE.Object3D()
        this.collisionMesh = new THREE.Object3D()
        //this.collisionMesh.visible = false
        this.collisionsItems = []
        this.posesSleepEnds = []

        const material = new THREE.MeshPhongMaterial({ 
            color: 0xFFFFFF, 
            vertexColors: true,
            envMap: root.loader.assets.sky,
            reflectivity: .6,
        })

        this.collisionMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 })

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
            n: N, 
            w: W, 
            h: LEVEL_H,
        })
        const stairM = _M.createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = W * 5
        stairM.position.z = W
        this.mesh.add(stairM)

        const collisionStairM = _M.createMesh({
            v: startStair.vC,
            material: this.collisionMaterial,
        })
        collisionStairM.position.x = W * 5
        collisionStairM.position.z = W
        this.collisionMesh.add(collisionStairM)
        this.collisionsItems.push(collisionStairM)


        let posStart = [5, 1]
        let posStartDir = stairDataTop.dir
        let dataForEnter = stairDataTop


        // level 
        for (let i = 0; i < FLOORS_NUM; ++i) {
            // create level
            const labLevel = new LabLevel()
            await labLevel.init(root, {
                posStart,
                posStartDir, 
                dataForEnter,
                numTilesX: TILES_X, 
                numTilesZ: TILES_Z,
                w: W,
                n: N,
                material, 
                collisionMaterial: this.collisionMaterial,
            })
            labLevel.mesh.position.y = LEVEL_H * i + LEVEL_H
            this.mesh.add(labLevel.mesh)
            labLevel.collisionMesh.position.y = LEVEL_H * i + LEVEL_H
            this.collisionMesh.add(labLevel.collisionMesh)
            this.collisionsItems.push(labLevel.collisionMesh)


            // create stair
            const stairDataTopExit = createRandomDataForLine()
            let bottomDir = null
            if (labLevel.dirToPosEnd === 'n') {
                bottomDir = 's'
            }
            if (labLevel.dirToPosEnd === 's') {
                bottomDir = 'n'
            }
            if (labLevel.dirToPosEnd === 'w') {
                bottomDir = 'e'
            }
            if (labLevel.dirToPosEnd === 'e') {
                bottomDir = 'w'
            }

            let topDirFull = ['n', 'w', 's', 'e']
            topDirFull = topDirFull.filter(elem => elem !== bottomDir)
            if (labLevel.posEnd[0] < 3) {
                topDirFull = topDirFull.filter(elem => elem !== 'w')
            }
            if (labLevel.posEnd[1] < 3) {
                topDirFull = topDirFull.filter(elem => elem !== 'n')
            }
            if (labLevel.posEnd[0] > TILES_X - 3) {
                topDirFull = topDirFull.filter(elem => elem !== 'e')
            }
            if (labLevel.posEnd[1] > TILES_Z - 3) {
                topDirFull = topDirFull.filter(elem => elem !== 's')
            }
            const dirTop = topDirFull[Math.floor(Math.random() * topDirFull.length)]
            stairDataTopExit.dir = dirTop

            const stair = createStair({
                stairDataBottom: {
                    path: labLevel.pathToPosEnd,
                    form: labLevel.formToPosEnd,
                    color: labLevel.colorToPosEnd,
                    dir: bottomDir,
                }, 
                stairDataCenterB: createRandomDataForLine(), 
                stairDataCenterT: createRandomDataForLine(), 
                stairDataTop: stairDataTopExit, 
                n: N, 
                w: W, 
                h: LEVEL_H,                
            })
            const stairM = _M.createMesh({
                v: stair.v,
                c: stair.c,
                material,
            })
            stairM.position.x = W * labLevel.posEnd[0]
            stairM.position.z = W * labLevel.posEnd[1]
            stairM.position.y = (i + 1) * LEVEL_H
            this.mesh.add(stairM)

            const collisionM = _M.createMesh({
                v: stair.vC,
                material: this.collisionMaterial,
            })
            collisionM.position.x = W * labLevel.posEnd[0]
            collisionM.position.z = W * labLevel.posEnd[1]
            collisionM.position.y = (i + 1) * LEVEL_H
            this.collisionMesh.add(collisionM)
            this.collisionsItems.push(collisionM)

            // save for next level
            posStart = labLevel.posEnd
            posStartDir = stairDataTopExit.dir
            dataForEnter = stairDataTopExit

            // save poses for energy 
            for (let j = 0; j < labLevel.posesSleepEnds.length; ++j) {
                labLevel.posesSleepEnds[j].x = labLevel.posesSleepEnds[j].xI * W 
                labLevel.posesSleepEnds[j].z = (labLevel.posesSleepEnds[j].yI - 1) * W 
                labLevel.posesSleepEnds[j].y = LEVEL_H * (i + 1)
            }

            this.posesSleepEnds.push(labLevel.posesSleepEnds)
        }

        const topTunnel = new TopTunnel()
        topTunnel.init({ material, dataForEnter, collisionMaterial: this.collisionMaterial })
        const pos = new THREE.Vector3(posStart[0] * W,  (FLOORS_NUM + 1) * LEVEL_H, posStart[1] * W)
        const offset = W + (topTunnel.W / 2) + W / 2
        if (posStartDir === 'n') {
            topTunnel.mesh.rotation.y = 0
            topTunnel.meshCollision.rotation.y = 0
            pos.z -= offset
        }
        if (posStartDir === 'e') {
            topTunnel.mesh.rotation.y = Math.PI * 1.5
            topTunnel.meshCollision.rotation.y = Math.PI * 1.5
            pos.x += offset
        }
        if (posStartDir === 'w') {
            topTunnel.mesh.rotation.y = Math.PI / 2
            topTunnel.meshCollision.rotation.y = Math.PI / 2
            pos.x -= offset
        }
        if (posStartDir === 's') {
            topTunnel.mesh.rotation.y = Math.PI
            topTunnel.meshCollision.rotation.y = Math.PI
            pos.z += offset
        }
        topTunnel.mesh.position.copy(pos)
        topTunnel.meshCollision.position.copy(pos)
        this.mesh.add(topTunnel.mesh)

        this.collisionsItems.push(topTunnel.meshCollision)
    } 
}