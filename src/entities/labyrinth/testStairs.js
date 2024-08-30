export const trstStairs = () => {

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
                this.mesh.add(stairM)
    
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
                this.mesh.add(stairM)
    
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
                this.mesh.add(stairM)
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
                this.mesh.add(stairM)
    
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
                this.mesh.add(stairM)
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
                this.mesh.add(stairM)
            }
}