import { Root } from '../index'
import * as TWEEN from '@tweenjs/tween.js'

import { createRandomDataForLine } from 'geometry/_lineGeom'
import { createTileI } from 'geometry/tile_I'
import { _M } from 'geometry/_m'
import * as THREE from 'three'

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
        audio,
    } = root

    loader.init()
    await loader.loadAssets()

    ticker.start()

    ticker.on((t: number) => {
        TWEEN.update()
    })

    studio.init(root)
    studio.addAxisHelper()
    ticker.on(studio.render.bind(studio))

    ui.init(root)
    ui.setEnergyLevel(0)

    phisics.init()
    ticker.on(phisics.update.bind(phisics))
    phisics.createPlayerPhisicsBody(CONSTANTS.PLAYER_START_POS)

    floor.init(root)
    studio.add(floor.mesh)

    await lab.init(root, CONSTANTS.LABS_CONF[0])
    studio.add(lab.mesh)

    energySystem.init(root, lab.posesSleepEnds)

    smallTriangles.init()
    studio.add(smallTriangles.m)
    smallTriangles.m.position.x = 3 * 5
    smallTriangles.m.position.z = 3 * 5

    particles.init(root)
    ticker.on(particles.update.bind(particles))
    studio.add(particles.m)

    audio.init(root)
    ticker.on(audio.update.bind(audio))

    await ui.hideStartScreen()

    audio.playAmbient()
    controls.init(root)
    ticker.on(controls.update.bind(controls))


    {
        // const r0 = createRandomDataForLine()
        // const r1 = createRandomDataForLine()
        // r1.color = [0, 0, 0]
        // const el = createTileI({
        //     forms: [r0.form, r1.form],
        //     paths: [r0.path, r1.path],
        //     colors: [r0.color, r1.color],
        //     key: 'string',
        //     n: 10,
        //     w: 5,
        // })
        // _M.translateVertices(el.v, 0, 0, 3)
        // const m = _M.createMesh({
        //     v: el.v,
        //     c: el.c,
        //     material: new THREE.MeshPhongMaterial({ color: 0xffffff, vertexColors: true }),
        // })
        // studio.add(m)
        // ticker.on(() => { 
        //     m.rotation.y += 0.01    
        // })
    }




}
