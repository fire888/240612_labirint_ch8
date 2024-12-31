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


    controls.disable()
    ui.toggleVisibleLock(false)
    setTimeout(() => {
        studio.showFinalView()
        lab.init(root, CONSTANTS.LABS_CONF[0])
        energySystem.init(root, [])
    }, 600)
    await ui.showFinalPage()
}
