const completePlay = () => {
    return new Promise(res => {})
}


export const pipelinePlay = async root => {
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

    const onKeyUp = event => {
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
