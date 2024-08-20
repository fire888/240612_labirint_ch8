import { Root } from '../index'
import { createDemoTiles } from 'entities/labyrinth/demoTiles'

export const pipelineInit = async (root: Root) => {
    const {
        studio,
        controlsOrbit,
        controlsPointer,
        ticker,
        boxTest,
        floor,
        lab,
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

    await lab.init()
    studio.add(lab.mesh)
    studio.add(lab.collisionMesh)
    controlsPointer.setToCollisionFloor(lab.collisionMesh)

    // test demo debug tiles
    const meshDemoTiles = createDemoTiles({ W: 3, H: 3, WC: 1.2 })
    studio.add(meshDemoTiles)
    meshDemoTiles.position.z = 35
}
