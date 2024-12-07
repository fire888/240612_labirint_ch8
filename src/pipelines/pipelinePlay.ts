import { Root } from '../index'

const completePlay = (): Promise<void> => {
    return new Promise(res => {})
}


export const pipelinePlay = async (root: Root) => {
    const {
        studio,
        controlsOrbit,
        controlsPointer,
        phoneControls,
        ticker,
        boxTest,
        floor,
        deviceData,
        ui,
    } = root

    if (deviceData.device === 'desktop') {
        controlsPointer.enable()
        phoneControls.disable()
        controlsOrbit.disable()
    } else {
        controlsPointer.disable()
        phoneControls.enable()
        controlsOrbit.disable()
    }

    ui.lock.onclick = () => {
        phoneControls.disable()
        controlsPointer.enable() 
    }
    controlsPointer.onUnlock(() => {
        phoneControls.enable()
    }) 

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
