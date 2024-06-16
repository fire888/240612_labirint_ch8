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
                controlsPointer.disable()
                controlsOrbit.enable()
            } else {
                controlsOrbit.disable()
                controlsPointer.enable()
            }
        }
    }
    document.addEventListener('keyup', onKeyUp)

    await completePlay()
}
