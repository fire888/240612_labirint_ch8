import { Root } from '../types/types'

export const pipelineInit = async (root: Root) => {
    const {
        studio,
        controlsOrbit,
        controlsPointer,
        ticker,
        boxTest,
        floor,
        lab,
    } = root

    ticker.start()

    studio.init()
    ticker.on(studio.render.bind(studio))

    controlsOrbit.init(studio.camera, studio.containerDom)
    ticker.on(controlsOrbit.update.bind(controlsOrbit))

    controlsPointer.init(studio.camera, studio.containerDom)
    ticker.on(controlsPointer.update.bind(controlsPointer))

    //boxTest.init()
    //controlsPointer.setToCollisionFloor(boxTest.mesh)
    //studio.add(boxTest.mesh)

    floor.init()
    controlsPointer.setToCollisionFloor(floor.mesh)
    studio.add(floor.mesh)

    await lab.init()
    studio.add(lab.mesh)
    studio.add(lab.collisionMech)
    controlsPointer.setToCollisionFloor(lab.collisionMech)
}
