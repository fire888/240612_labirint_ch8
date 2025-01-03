import { Root } from '../index'
import * as TWEEN from '@tweenjs/tween.js'

export const pipelineInit = async (root: Root) => {
    const {
        CONSTANTS,
        studio,
        controls,
        ui,
        ticker,
        // boxTest,
        floor,
        smallTriangles,
        particles,
        // lab,
        loader,
        phisics,
        energySystem,
        lab,
    } = root

    loader.init()
    await loader.loadAssets()

    ticker.start()

    ticker.on((t: number) => {
        TWEEN.update()
    })

    studio.init(root)
    //studio.addAxisHelper()
    ticker.on(studio.render.bind(studio))

    ui.init(root)
    ui.setEnergyLevel(0)

    phisics.init(root)
    ticker.on(phisics.update.bind(phisics))
    phisics.createPlayerPhisicsBody(CONSTANTS.PLAYER_START_POS, 0)

    floor.init(root)
    studio.add(floor.mesh)

    await lab.init(root, CONSTANTS.LABS_CONF[0])
    studio.add(lab.mesh)

    energySystem.init(root, lab.posesSleepEnds)

    smallTriangles.init(root)
    studio.add(smallTriangles.m)
    smallTriangles.m.position.x = 3 * 5
    smallTriangles.m.position.z = 3 * 5

    particles.init(root)
    ticker.on(particles.update.bind(particles))
    studio.add(particles.m)

    await ui.hideStartScreen()

    controls.init(root)
    ticker.on(controls.update.bind(controls))
}
