import { Root } from '../index'


const completePlay = (): Promise<void> => {
    return new Promise(res => {})
}


export const pipelinePlay = async (root: Root) => {
    const {
        studio,
        controlsOrbit,
        controlsPointer,
        ticker,
        boxTest,
        floor,
    } = root

    controlsPointer.disable()
    controlsOrbit.enable()

    const onKeyUp = (event: any) => {
        if (event.code === 'KeyO') {
            if (controlsPointer.isEnabled) {
                studio.scene.fog = null
                controlsPointer.disable()
                controlsOrbit.enable()

            } else {
                studio.scene.fog = studio.fog
                controlsOrbit.disable()
                controlsPointer.enable()
            }
        }
    }
    document.addEventListener('keyup', onKeyUp)

    await completePlay()
}
