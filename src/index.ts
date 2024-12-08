import "./stylesheets/controls.css"
import { Studio } from "./entities/Studio"
import { ControlsOrbit } from "./entities/ControlsOrbit"
import { Ticker } from "./entities/Ticker"
import { ControlsPointer } from "./entities/ControlsPointer"
import { BoxTest } from "./entities/BoxTest"
import { Floor } from "./entities/Floor"
// import { Labyrinth } from "./_0_trash/Labyrinth";
import { pipelineInit } from "./pipelines/pipelineInit"
import { pipelinePlay } from "./pipelines/pipelinePlay"
import { documentClickOnce } from "./entities/_helpers";
import { LoaderAssets } from "./entities/Loader";
import { ControlsPhone } from "entities/ControlsPhone"
import { DeviceData } from "entities/DeviceData"
import { Ui } from "entities/Ui"


export type Root = {
    ticker: Ticker,
    studio: Studio,
    controlsOrbit: ControlsOrbit,
    controlsPointer: ControlsPointer,
    controlsPhone: ControlsPhone,
    boxTest: BoxTest,
    floor: Floor,
    //lab: Labyrinth,
    loader: LoaderAssets,
    deviceData: DeviceData,
    ui: Ui,
}


window.addEventListener("DOMContentLoaded", async () => {
    const root: Root = {
        ticker: new Ticker(),
        studio: new Studio(),
        controlsOrbit: new ControlsOrbit(),
        controlsPointer: new ControlsPointer(),
        controlsPhone: new ControlsPhone(),
        ui: new Ui(),
        boxTest: new BoxTest(),
        floor: new Floor(),
        //lab: new Labyrinth(),
        loader: new LoaderAssets(),
        deviceData: new DeviceData(),
    }

    await pipelineInit(root)
    await documentClickOnce()
    await pipelinePlay(root)
})
