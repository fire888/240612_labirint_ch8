import { Studio } from "./entities/Studio"
import { ControlsOrbit } from "./entities/ControlsOrbit"
import { Ticker } from "./helpers/Ticker"
import { ControlsPointer } from "./entities/ControlsPointer"
import { BoxTest } from "./entities/BoxTest"
import { Floor } from "./entities/Floor"
import { Labyrinth } from "./_0_trash/Labyrinth";
import { pipelineInit } from "./pipelines/pipelineInit"
import { pipelinePlay } from "./pipelines/pipelinePlay"
import { documentClickOnce } from "./helpers/clickHelpers";
import { LoaderAssets } from "./helpers/Loader";
import { PhoneControls } from "entities/ControlsPhone"
import { DeviceData } from "helpers/DeviceData"
import { Ui } from "entities/Ui"


export type Root = {
    ticker: Ticker,
    studio: Studio,
    controlsOrbit: ControlsOrbit,
    controlsPointer: ControlsPointer,
    boxTest: BoxTest,
    floor: Floor,
    //lab: Labyrinth,
    loader: LoaderAssets,
    phoneControls: PhoneControls,
    deviceData: DeviceData,
    ui: Ui,
}


window.addEventListener("DOMContentLoaded", async () => {
    const root: Root = {
        ticker: new Ticker(),
        studio: new Studio(),
        controlsOrbit: new ControlsOrbit(),
        controlsPointer: new ControlsPointer(),
        boxTest: new BoxTest(),
        floor: new Floor(),
        //lab: new Labyrinth(),
        loader: new LoaderAssets(),
        phoneControls: new PhoneControls(),
        deviceData: new DeviceData(),
        ui: new Ui(),
    }

    await pipelineInit(root)
    await documentClickOnce()
    await pipelinePlay(root)
})
