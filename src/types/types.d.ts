import { Ticker } from '../helpers/Ticker'
import { Studio } from '../entities/Studio'
import { ControlsOrbit } from "../entities/ControlsOrbit";
import { ControlsPointer } from "../entities/ControlsPointer";
import { BoxTest } from "../entities/BoxTest";
import { Floor } from "../entities/Floor";
import { Labyrinth } from "../entities/labyrinth/Labyrinth";

export type Root = {
    ticker: Ticker,
    studio: Studio,
    controlsOrbit: ControlsOrbit,
    controlsPointer: ControlsPointer,
    boxTest: BoxTest,
    floor: Floor,
    lab: Labyrinth,
}
