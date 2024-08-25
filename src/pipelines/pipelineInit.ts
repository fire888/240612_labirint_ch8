import { Root } from '../index'
import { createDemoTiles } from 'entities/labyrinth/demoTiles'
import { createDeemoLongCorridor } from 'entities/labyrinth/demoLongCorridor'
import { Labyrinth } from "../entities/labyrinth/Labyrinth";
import { Labyrinth02 } from "../entities/labyrinth/demoLab2";
// import { BufferTexture } from '../entities/bufferTexture'

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
    studio.addAxisHelper()
    ticker.on(studio.render.bind(studio))

    controlsOrbit.init(studio.camera, studio.containerDom)
    ticker.on(controlsOrbit.update.bind(controlsOrbit))

    controlsPointer.init(studio.camera, studio.containerDom)
    ticker.on(controlsPointer.update.bind(controlsPointer))

    floor.init(root)
    controlsPointer.setToCollisionFloor(floor.mesh)
    studio.add(floor.mesh)

    const lab = new Labyrinth()
    await lab.init()
    studio.add(lab.mesh)
    studio.add(lab.collisionMesh)
    controlsPointer.setToCollisionFloor(lab.collisionMesh)

    // test demo debug tiles
    const meshDemoTiles = createDemoTiles({ W: 3, H: 3, WC: 1.2 })
    studio.add(meshDemoTiles)

    const mCorr = createDeemoLongCorridor()
    studio.add(mCorr)

    const lab02 = new Labyrinth02()
    await lab02.init(root)
    studio.add(lab02.mesh)
    // const lab03 = new Labyrinth02()
    // await lab03.init(root)
    // studio.add(lab03.mesh)
    // lab03.mesh.position.y = 3


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
