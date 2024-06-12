import { Studio } from "./entities/Studio"
import { ControlsOrbit } from "./entities/ControlsOrbit"
import { Ticker } from "./helpers/Ticker"
import { BoxTest } from "./entities/BoxTest"
import { Floor } from "./entities/Floor"
import { ControlsPointer } from "./entities/ControlsPointer"
import { pipelineInit } from "./pipelines/pipelineInit"

const root = {
    ticker: new Ticker(),
    studio: new Studio(),
    controlsOrbit: new ControlsOrbit(),
    controlsPointer: new ControlsPointer(),
    boxTest: new BoxTest(),
    floor: new Floor(),
}

window.addEventListener("DOMContentLoaded", async () => {
    await pipelineInit(root)
})
