import { Studio } from "./entities/Studio"
import { ControlsOrbit } from "./entities/ControlsOrbit"
import { Ticker } from "./helpers/Ticker"
import { ControlsPointer } from "./entities/ControlsPointer"
import { BoxTest } from "./entities/BoxTest"
import { Floor } from "./entities/Floor"
import { Labyrinth } from "./entities/labyrinth/Labyrinth";
import { pipelineInit } from "./pipelines/pipelineInit"
import { pipelinePlay } from "./pipelines/pipelinePlay"
import {documentClickOnce} from "./helpers/clickHelpers";
import { Root } from "./types/types";

window.addEventListener("DOMContentLoaded", async () => {
    const root: Root = {
        ticker: new Ticker(),
        studio: new Studio(),
        controlsOrbit: new ControlsOrbit(),
        controlsPointer: new ControlsPointer(),
        boxTest: new BoxTest(),
        floor: new Floor(),
        lab: new Labyrinth()
    }

    await pipelineInit(root)
    // await documentClickOnce()
    await pipelinePlay(root)
})
