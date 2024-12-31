import "./stylesheets/controls.css"
import { CONSTANTS } from "constants/CONSTANTS"
import { Studio } from "./entities/Studio"
import { ControlsSystem } from "./entities/controls/ControlsSystem"
import { Ticker } from "./entities/Ticker"
import { Floor } from "./entities/Floor"
import { SmallTriangles } from "./entities/SmallTriangles"
import { Particles } from './entities/Particles'
import { LoaderAssets } from "./entities/Loader";
import { DeviceData } from "./entities/DeviceData"
import { Ui } from "./entities/Ui"
import { Phisics } from "./entities/Phisics"
import { EnergySystem } from './entities/EnergySystem'
import { Lab } from './entities/labyrinth/Lab'

import { pipelineInit } from "./pipelines/pipelineInit"
import { pipelinePlay } from "./pipelines/pipelinePlay"
import { pipelineEnd } from "./pipelines/pipelineEnd"

export type Root = {
    CONSTANTS: typeof CONSTANTS,
    ticker: Ticker,
    studio: Studio,
    controls: ControlsSystem,
    floor: Floor,
    smallTriangles: SmallTriangles,
    particles: Particles,
    loader: LoaderAssets,
    deviceData: DeviceData,
    ui: Ui,
    phisics: Phisics,
    energySystem: EnergySystem,
    lab: Lab 
}


window.addEventListener("DOMContentLoaded", async () => {
    const root: Root = {
        CONSTANTS,
        ticker: new Ticker(),
        studio: new Studio(),
        controls: new ControlsSystem(),
        ui: new Ui(),
        floor: new Floor(),
        smallTriangles: new SmallTriangles(),
        particles: new Particles(),
        loader: new LoaderAssets(),
        deviceData: new DeviceData(),
        phisics: new Phisics(),
        energySystem: new EnergySystem(),
        lab: new Lab()
    }

    await pipelineInit(root)
    await pipelinePlay(root)
    await pipelineEnd(root)
})
