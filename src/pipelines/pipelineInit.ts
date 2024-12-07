import { Root } from '../index'
import { createDemoTiles } from '_0_trash/demoTiles'
import { Lab } from '../entities/labyrinth/Lab'
//import { testStairs } from '../entities/labyrinth/testStairs'
import { SmallTriangles } from '../entities/SmallTriangles'
import { Phisics } from 'entities/Phisics'
import { Particles } from 'entities/Particles'

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
        phoneControls,
        ui,
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
    phisics.init(root)
    ticker.on(phisics.update.bind(phisics))
    phisics.createPlayerPhisicsBody({ x: 0, y: 3, z: 0}, 0)

    ui.init(root)

    controlsPointer.init(studio.camera, studio.containerDom)
    ticker.on((t: number) => { 
        controlsPointer.update(t, phisics.playerBody) 
    })

    phoneControls.init(root)
    ticker.on((t: number) => { 
        phoneControls.update(t, phisics.playerBody) 
    })
    
    floor.init(root)
    studio.add(floor.mesh)

    const lab = new Lab()
    await lab.init(root)
    studio.add(lab.mesh)
    studio.add(lab.collisionMesh)
    lab.collisionMesh.visible = false
    lab.collisionsItems.map(e => {
        phisics.addMeshToCollision(e)
    })

    const smallTriangles = new SmallTriangles(root)
    studio.add(smallTriangles.m)
    smallTriangles.m.position.x = 3 * 5
    smallTriangles.m.position.z = 3 * 5

    const particles = new Particles()
    particles.init(root)
    studio.add(particles.m)

    // test demo debug tiles
    //const meshDemoTiles = createDemoTiles({ W: 3, H: 3, WC: 1.2 })
    //studio.add(meshDemoTiles)

    //const m = testStairs()
    //m.position.x = -50
    //studio.add(m)

    //const mCorr = createDeemoLongCorridor()
    //studio.add(mCorr)
}
