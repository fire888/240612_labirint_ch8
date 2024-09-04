import { Root } from '../index'
import { createDemoTiles } from '_0_trash/demoTiles'
import { Lab } from '../entities/labyrinth/Lab'
// import { BufferTexture } from '../entities/bufferTexture'
//import { testStairs } from '../entities/labyrinth/testStairs'
import { SmallTriangles } from '../entities/SmallTriangles'

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

    controlsPointer.init(studio.camera, studio.containerDom)
    ticker.on(controlsPointer.update.bind(controlsPointer))

    floor.init(root)
    controlsPointer.setToCollisionFloor(floor.mesh)
    studio.add(floor.mesh)

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
