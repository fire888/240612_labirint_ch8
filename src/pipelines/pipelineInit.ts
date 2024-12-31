import { Root } from '../index'
// import { createDemoTiles } from '_0_trash/demoTiles'
//import { testStairs } from '../entities/labyrinth/testStairs'
import { SmallTriangles } from '../entities/SmallTriangles'
import { Particles } from 'entities/Particles'
import { elementClickOnce } from 'entities/_helpers'
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

    const smallTriangles = new SmallTriangles(root)
    studio.add(smallTriangles.m)
    smallTriangles.m.position.x = 3 * 5
    smallTriangles.m.position.z = 3 * 5

    const particles = new Particles()
    particles.init(root)
    ticker.on(particles.update.bind(particles))
    studio.add(particles.m)

    // test demo debug tiles
    //const meshDemoTiles = createDemoTiles({ W: 3, H: 3, WC: 1.2 })
    //studio.add(meshDemoTiles)

    //const m = testStairs()
    //m.position.x = -50
    //studio.add(m)

    //const mCorr = createDeemoLongCorridor()
    //studio.add(mCorr)

    const loaderCont = document.body.getElementsByClassName('loader')[0]
    // @ts-ignore: Unreachable code error
    loaderCont.style.display = 'none'
    // @ts-ignore: Unreachable code error
    const startButton: HTMLElement = document.body.getElementsByClassName('start-but')[0]
    // @ts-ignore: Unreachable code error
    startButton.style.display = 'block'

    await elementClickOnce(startButton)

    controls.init(root)
    ticker.on(controls.update.bind(controls))

    const startScreen = document.body.getElementsByClassName('start-screen')[0]
    // @ts-ignore: Unreachable code error
    startScreen.style.display = 'none'
}
