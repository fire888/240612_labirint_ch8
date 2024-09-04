import { Root } from '../index'
import { createDemoTiles } from '_0_trash/demoTiles'
import { Lab } from '../entities/labyrinth/Lab'
// import { BufferTexture } from '../entities/bufferTexture'
//import { testStairs } from '../entities/labyrinth/testStairs'
import { SmallTriangles } from '../entities/SmallTriangles'
import { Phisics } from 'entities/Phisics'

export const pipelineInit = async (root: Root) => {
    const {
        studio,
        controlsOrbit,
        controlsPointer,
        ticker,
        boxTest,
        floor,
        //lab,
        loader,
    } = root

    loader.init()
    await loader.loadAssets()

    ticker.start()

    studio.init(root)
    //studio.addAxisHelper()
    ticker.on(studio.render.bind(studio))

    controlsOrbit.init(studio.camera, studio.containerDom)
    ticker.on(controlsOrbit.update.bind(controlsOrbit))

    const phisics = new Phisics()
    phisics.init()
    ticker.on(phisics.update.bind(phisics))
    phisics.createPlayerPhisicsBody({ x: 0, y: 50, z: 0}, 0)

    controlsPointer.init(studio.camera, studio.containerDom)
    ticker.on(() => { 
        controlsPointer.update() 
    })

    //ticker.on(() => { 
    //    controlsPointer.update(phisics.playerBody) 
    //})


    
    floor.init(root)
    studio.add(floor.mesh)
    //controlsPointer.setToCollisionFloor(floor.mesh)
    //phisics.addMeshToCollision(floor.mesh)

    const lab = new Lab()
    await lab.init(root)
    studio.add(lab.mesh)
    studio.add(lab.collisionMesh)
    controlsPointer.setToCollisionFloor(lab.collisionMesh)

    const smallTriangles = new SmallTriangles(root)
    studio.add(smallTriangles.m)
    smallTriangles.m.position.x = 3 * 5
    smallTriangles.m.position.z = 3 * 5

    // test demo debug tiles
    //const meshDemoTiles = createDemoTiles({ W: 3, H: 3, WC: 1.2 })
    //studio.add(meshDemoTiles)

    //const m = testStairs()
    //m.position.x = -50
    //studio.add(m)

    //const mCorr = createDeemoLongCorridor()
    //studio.add(mCorr)

    // const bufferTexture = new BufferTexture()
    // studio.add(bufferTexture.mesh)
    // let n = 0
    // ticker.on(() => {
    //     n++
    //     if (n < 100) {
    //         return
    //     }
    //     n = 0
    //     bufferTexture.update()
    // })
}
