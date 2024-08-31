import * as THREE from 'three'
import { createRandomDataForLine } from 'geometry/lineGeomCrafted'
import { createStair } from 'geometry/stair'
import { createMesh  } from 'geometry/helperCreateMesh'

const N = 7
const W = 3
const LEVEL_H = 3.5

export const testStairs = () => {
    const mesh = new THREE.Object3D()

    const material = new THREE.MeshPhongMaterial({ 
        color: 0xFFFFFF, 
        vertexColors: true,
        //envMap: root.loader.assets.sky,
        reflectivity: .6,
    })

    // test stairs 
    {
        const stairDataBottom = createRandomDataForLine()
        stairDataBottom.dir = 's'
        const stairDataCenterB = createRandomDataForLine()
        const stairDataCenterT = createRandomDataForLine()
        const stairDataTop = createRandomDataForLine()
        stairDataTop.dir = 'n'

        const startStair = createStair({ 
            stairDataBottom, 
            stairDataCenterB,
            stairDataCenterT,
            stairDataTop, 
            n: N, 
            w: W, 
            h: LEVEL_H,
        })
        const stairM = createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = -7
        stairM.position.z = 0
        mesh.add(stairM)
    }
    
    {
        const stairDataBottom = createRandomDataForLine()
        stairDataBottom.dir = 'w'
        const stairDataCenterB = createRandomDataForLine()
        const stairDataCenterT = createRandomDataForLine()
        const stairDataTop = createRandomDataForLine()
        stairDataTop.dir = 'e'

        const startStair = createStair({ 
            stairDataBottom, 
            stairDataCenterB,
            stairDataCenterT,
            stairDataTop, 
            n: N, 
            w: W, 
            h: LEVEL_H,
        })
        const stairM = createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = -14
        stairM.position.z = 0
        mesh.add(stairM)
    }
    
    {
        const stairDataBottom = createRandomDataForLine()
        stairDataBottom.dir = 'e'
        const stairDataCenterB = createRandomDataForLine()
        const stairDataCenterT = createRandomDataForLine()
        const stairDataTop = createRandomDataForLine()
        stairDataTop.dir = 'w'

        const startStair = createStair({ 
            stairDataBottom, 
            stairDataCenterB,
            stairDataCenterT,
            stairDataTop, 
            n: N, 
            w: W, 
            h: LEVEL_H,
        })
        const stairM = createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = -27
        stairM.position.z = 0
        mesh.add(stairM)
    }
    
    {
        const stairDataBottom = createRandomDataForLine()
        stairDataBottom.dir = 'n'
        const stairDataCenterB = createRandomDataForLine()
        const stairDataCenterT = createRandomDataForLine()
        const stairDataTop = createRandomDataForLine()
        stairDataTop.dir = 'w'

        const startStair = createStair({ 
            stairDataBottom, 
            stairDataCenterB,
            stairDataCenterT,
            stairDataTop, 
            n: N, 
            w: W, 
            h: LEVEL_H,
        })
        const stairM = createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = -37
        stairM.position.z = 0
        mesh.add(stairM)
    }
    
    {
        const stairDataBottom = createRandomDataForLine()
        stairDataBottom.dir = 'n'
        const stairDataCenterB = createRandomDataForLine()
        const stairDataCenterT = createRandomDataForLine()
        const stairDataTop = createRandomDataForLine()
        stairDataTop.dir = 'e'

        const startStair = createStair({ 
            stairDataBottom, 
            stairDataCenterB,
            stairDataCenterT,
            stairDataTop, 
            n: N, 
            w: W, 
            h: LEVEL_H,
        })
        const stairM = createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = -47
        stairM.position.z = 0
        mesh.add(stairM)
    }
    
    {
        const stairDataBottom = createRandomDataForLine()
        stairDataBottom.dir = 's'
        const stairDataCenterB = createRandomDataForLine()
        const stairDataCenterT = createRandomDataForLine()
        const stairDataTop = createRandomDataForLine()
        stairDataTop.dir = 'e'

        const startStair = createStair({ 
            stairDataBottom, 
            stairDataCenterB,
            stairDataCenterT,
            stairDataTop, 
            n: N, 
            w: W, 
            h: LEVEL_H,
        })
        const stairM = createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = -67
        stairM.position.z = 0
        mesh.add(stairM)
    }

    {
        const stairDataBottom = createRandomDataForLine()
        stairDataBottom.dir = 's'
        const stairDataCenterB = createRandomDataForLine()
        const stairDataCenterT = createRandomDataForLine()
        const stairDataTop = createRandomDataForLine()
        stairDataTop.dir = 'w'

        const startStair = createStair({ 
            stairDataBottom, 
            stairDataCenterB,
            stairDataCenterT,
            stairDataTop, 
            n: N, 
            w: W, 
            h: LEVEL_H,
        })
        const stairM = createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = -70
        stairM.position.z = 0
        mesh.add(stairM)
    }

    {
        const stairDataBottom = createRandomDataForLine()
        stairDataBottom.dir = 'e'
        const stairDataCenterB = createRandomDataForLine()
        const stairDataCenterT = createRandomDataForLine()
        const stairDataTop = createRandomDataForLine()
        stairDataTop.dir = 'n'

        const startStair = createStair({ 
            stairDataBottom, 
            stairDataCenterB,
            stairDataCenterT,
            stairDataTop, 
            n: N, 
            w: W, 
            h: LEVEL_H,
        })
        const stairM = createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = -78
        stairM.position.z = 0
        mesh.add(stairM)
    }

    {
        const stairDataBottom = createRandomDataForLine()
        stairDataBottom.dir = 'e'
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
        const stairM = createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = -85
        stairM.position.z = 0
        mesh.add(stairM)
    }

    {
        const stairDataBottom = createRandomDataForLine()
        stairDataBottom.dir = 'w'
        const stairDataCenterB = createRandomDataForLine()
        const stairDataCenterT = createRandomDataForLine()
        const stairDataTop = createRandomDataForLine()
        stairDataTop.dir = 'n'

        const startStair = createStair({ 
            stairDataBottom, 
            stairDataCenterB,
            stairDataCenterT,
            stairDataTop, 
            n: N, 
            w: W, 
            h: LEVEL_H,
        })
        const stairM = createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = -91
        stairM.position.z = 0
        mesh.add(stairM)
    }

    {
        const stairDataBottom = createRandomDataForLine()
        stairDataBottom.dir = 'w'
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
        const stairM = createMesh({
            v: startStair.v,
            c: startStair.c,
            material,
        })
        stairM.position.x = -95
        stairM.position.z = 0
        mesh.add(stairM)
    }

    return mesh
}