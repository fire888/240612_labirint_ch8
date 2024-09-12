        // const arr = ['s', 'n', 'w', 'e']

        // let n = 0
        // for (let i = 0; i < arr.length; ++i) {
        //     for (let j = 0; j < arr.length; ++j) {
        //         if (arr[i] === arr[j]) {
        //             continue
        //         }
        //         ++n
        //         {

        //             // start stair
        //             const stairDataBottom = createRandomDataForLine()
        //             stairDataBottom.dir = arr[i]
        //             const stairDataCenterB = createRandomDataForLine()
        //             const stairDataCenterT = createRandomDataForLine()
        //             const stairDataTop = createRandomDataForLine()
        //             stairDataTop.dir = arr[j]
        
        //             const startStair = createStair({ 
        //                 stairDataBottom, 
        //                 stairDataCenterB,
        //                 stairDataCenterT,
        //                 stairDataTop, 
        //                 n: N, 
        //                 w: W, 
        //                 h: LEVEL_H,
        //             })
        //             const stairM = createMesh({
        //                 v: startStair.v,
        //                 c: startStair.c,
        //                 material,
        //             })
        //             stairM.position.x = W * 15 + 7 * n
        //             stairM.position.z = W
        //             this.mesh.add(stairM)
            
        //             const collisionStairM = createMesh({
        //                 v: startStair.vC,
        //                 material: this.collisionMaterial,
        //             })
        //             collisionStairM.position.x = W * 15 + 7 * n
        //             collisionStairM.position.z = W
        //             this.collisionMesh.add(collisionStairM)
        //             this.collisionsItems.push(collisionStairM)
        //         }             
        //     }
        // }

        // {
        //     // start stair
        //     const stairDataBottom = createRandomDataForLine()
        //     stairDataBottom.dir = 'w'
        //     const stairDataCenterB = createRandomDataForLine()
        //     const stairDataCenterT = createRandomDataForLine()
        //     const stairDataTop = createRandomDataForLine()
        //     stairDataTop.dir = 'e'

        //     const startStair = createStair({ 
        //         stairDataBottom, 
        //         stairDataCenterB,
        //         stairDataCenterT,
        //         stairDataTop, 
        //         n: N, 
        //         w: W, 
        //         h: LEVEL_H,
        //     })
        //     const stairM = createMesh({
        //         v: startStair.v,
        //         c: startStair.c,
        //         material,
        //     })
        //     stairM.position.x = W * 15
        //     stairM.position.z = W
        //     this.mesh.add(stairM)
    
        //     const collisionStairM = createMesh({
        //         v: startStair.vC,
        //         material: this.collisionMaterial,
        //     })
        //     collisionStairM.position.x = W * 15
        //     collisionStairM.position.z = W
        //     this.collisionMesh.add(collisionStairM)
        //     this.collisionsItems.push(collisionStairM)
        // }