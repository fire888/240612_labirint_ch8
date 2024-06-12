import { documentClickOnce } from "../helpers/clickHelpers"


export const pipelineInit = async root => {
    const {
        studio,
        controlsOrbit,
        controlsPointer,
        ticker,
        boxTest,
        floor,
    } = root

    ticker.start()

    studio.init()
    ticker.on(studio.render.bind(studio))

    controlsOrbit.init(studio.camera, studio.containerDom)
    ticker.on(controlsOrbit.update.bind(controlsOrbit))

    controlsPointer.init(studio.camera, studio.containerDom)
    ticker.on(controlsPointer.update.bind(controlsPointer))

    boxTest.init()
    controlsPointer.setToCollisionFloor(boxTest.mesh)
    studio.add(boxTest.mesh)

    floor.init()
    controlsPointer.setToCollisionFloor(floor.mesh)
    studio.add(floor.mesh)

    await documentClickOnce()

    controlsPointer.enable()

}
