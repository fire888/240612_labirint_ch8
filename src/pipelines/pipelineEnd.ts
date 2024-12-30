import { Root } from "../index"

export const pipelineEnd = async (root: Root) => {
    const {
        CONSTANTS,
        studio,
        controls,
        ui,
        phisics,
        energySystem,
        lab,
    } = root

    
    //controls.disable()
    ui.toggleVisibleLock(false)
    await ui.showFinalPage()
}
