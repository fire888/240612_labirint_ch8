import * as THREE from 'three'
import { LabLevel } from './LabLevel'
import { createStair } from '../../geometry/stair'
import { TopTunnel } from './TopTunnel'
import { createRandomDataForLine } from '../../geometry/lineGeomCrafted'
import { _M } from "../../geometry/_m"

const LEVEL_H = 5
const W = 3
const N = 7

export class Lab {
    nameSpace = 'collision_lab_'
    lastDir = null
    _namesMeshes = []
    _meshes = []

    async init (root, params = { TILES_X: 11, TILES_Z: 13, FLOORS_NUM: 5 }) {
        const {
            TILES_X,
            TILES_Z,
            FLOORS_NUM,
        } = params


        this._root = root

        const { phisics } = root

        if (!this.mesh) {
            this.mesh = new THREE.Object3D()
        }

        this.posesSleepEnds = []

        if (!this.material) {
            this.material = new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF, 
                vertexColors: true,
                envMap: root.loader.assets.sky,
                reflectivity: .6,
            })
            this._collisionMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 })
        }


        // start stair *******************************************/

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
        this.stairMesh = _M.createMesh({
            v: startStair.v,
            c: startStair.c,
            material: this.material,
        })
        this.stairMesh.position.x = W * 5
        this.stairMesh.position.z = W
        this.stairMesh.name = 'view_start_stair'
        this.mesh.add(this.stairMesh)
        this._meshes.push(this.stairMesh)

        const collisionStairMesh = _M.createMesh({
            v: startStair.vC,
            material: this._collisionMaterial,
        })
        collisionStairMesh.name = this.nameSpace + 'start_stair'
        this._namesMeshes.push(collisionStairMesh.name)
        collisionStairMesh.position.x = W * 5
        collisionStairMesh.position.z = W
        phisics.addMeshToCollision(collisionStairMesh)


        // levels *******************************************/

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
                material: this.material, 
                collisionMaterial: this._collisionMaterial,
            })
            labLevel.mesh.position.y = LEVEL_H * i + LEVEL_H
            labLevel.mesh.name = 'view_lab_level_' + i
            this.mesh.add(labLevel.mesh)
            this._meshes.push(labLevel.mesh)

            labLevel.collisionMesh.position.y = LEVEL_H * i + LEVEL_H
            labLevel.collisionMesh.name = this.nameSpace + i
            this._namesMeshes.push(labLevel.collisionMesh.name)
            phisics.addMeshToCollision(labLevel.collisionMesh)


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
            const stairMesh = _M.createMesh({
                v: stair.v,
                c: stair.c,
                material: this.material,
            })
            stairMesh.position.x = W * labLevel.posEnd[0]
            stairMesh.position.z = W * labLevel.posEnd[1]
            stairMesh.position.y = (i + 1) * LEVEL_H
            stairMesh.name = 'view_lab_stair_' + i
            this.mesh.add(stairMesh)
            this._meshes.push(stairMesh)

            const collisionMesh = _M.createMesh({
                v: stair.vC,
                material: this._collisionMaterial,
            })
            collisionMesh.name = this.nameSpace + 'collision_' + i
            this._namesMeshes.push(collisionMesh.name)
            collisionMesh.position.x = W * labLevel.posEnd[0]
            collisionMesh.position.z = W * labLevel.posEnd[1]
            collisionMesh.position.y = (i + 1) * LEVEL_H
            phisics.addMeshToCollision(collisionMesh)

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


        // top tunnel ***********************************************************/

        this.topTunnel = new TopTunnel()
        this.topTunnel.init({
            root,
            material: this.material, 
            dataForEnter, 
            collisionMaterial: this._collisionMaterial, 
            w: W 
        })
        const pos = new THREE.Vector3(posStart[0] * W,  (FLOORS_NUM + 1) * LEVEL_H, posStart[1] * W)
        const offset = W + (this.topTunnel.W / 2) + W / 2
        const doorCollisionPos = new THREE.Vector3().copy(pos)
        let rotation = 0
        let rotationCollision = 0

        if (posStartDir === 'n') {
            rotation = 0
            rotationCollision = Math.PI / 2
            doorCollisionPos.z -= W * 4
            pos.z -= offset
        }
        if (posStartDir === 'e') {
            rotation = Math.PI * 1.5
            pos.x += offset
            doorCollisionPos.x += W * 4
        }
        if (posStartDir === 's') {
            rotation = Math.PI
            rotationCollision = Math.PI / 2
            pos.z += offset
            doorCollisionPos.z += W * 4
        }
        if (posStartDir === 'w') {
            rotation = Math.PI / 2
            pos.x -= offset
            doorCollisionPos.x -= W * 4
        }


        // phisics close dooor
        this.topTunnel.meshDoorCollision.name = this.nameSpace + 'top_tunnel_door'
        this._namesMeshes.push(this.topTunnel.meshDoorCollision.name) 
        this.topTunnel.meshDoorCollision.rotation.y = rotation
        this.topTunnel.meshDoorCollision.position.copy(doorCollisionPos)
        phisics.addMeshToCollision(this.topTunnel.meshDoorCollision)

        // phisics corridor collision
        this.topTunnel.meshCollision.name = this.nameSpace + 'top_tunnel'
        this._namesMeshes.push(this.topTunnel.meshCollision.name)
        this.topTunnel.meshCollision.rotation.y = rotationCollision
        this.topTunnel.meshCollision.position.copy(pos)
        phisics.addMeshToCollision(this.topTunnel.meshCollision)

        // tunnel mesh
        this.topTunnel.mesh.rotation.y = rotation
        this.topTunnel.mesh.position.copy(pos)
        this.mesh.add(this.topTunnel.mesh)
        this._meshes.push(this.topTunnel.mesh)

        this.lastDir = posStartDir
    } 

    openDoor () {
        this._root.phisics.removeMeshFromCollision('collision_lab_door')
        this.topTunnel.openDoor()
    }

    destroy() {
        this.posesSleepEnds = []
        for (let i = 0; i < this._namesMeshes.length; ++i) {
            this._root.phisics.removeMeshFromCollision(this._namesMeshes[i])
        }
        //this.mesh.remove(this.stairMesh)
        //this.stairMesh.geometry.dispose()
        this.mesh.remove(this.topTunnel.mesh)
        this.topTunnel.destroy()
        

        this._meshes.forEach(m => {
            m.geometry.dispose()
            this.mesh.remove(m)
        })
        this._meshes = []
    }
}