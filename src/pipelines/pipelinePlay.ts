import { Root } from '../index'

const completePlay = (): Promise<void> => {
    return new Promise(res => {})
}


export const pipelinePlay = async (root: Root) => {
    const {
        studio,
        controlsOrbit,
        controlsPointer,
        controlsPhone,
        ticker,
        boxTest,
        floor,
        deviceData,
        ui,
        phisics,
        energySystem,
        lab
    } = root

    let currentWalkingControls = deviceData.device === 'desktop' 
        ? controlsPointer
        : controlsPhone
    currentWalkingControls.enable()

    // ** CONTROLS LOGIC ******************************************* //
    {
        // click on buttonPointerLock: enable pointerLock and hide phoneControls  
        ui.lock.onclick = () => {
            controlsPointer.enable().then(isOn => {
                if (!isOn) { 
                    return 
                }
                currentWalkingControls = controlsPointer
                controlsPhone.disable()
                controlsOrbit.disable()
                ui.toggleVisibleLock(false) 
            })
        }
        // callback on pointerUnlock: enable phoneControls and show buttonPointerLock
        controlsPointer.onUnlock(() => {
            if (controlsOrbit.isEnabled) {
                return
            }
            currentWalkingControls = controlsPhone
            ui.toggleVisibleLock(true) 
            controlsPhone.enable()
        }) 

        // key O: disable/enable orbitControls
        const onKeyUp = (event: any) => {
            if (event.code === 'KeyO') {
                if (controlsOrbit.isEnabled) {
                    //studio.scene.fog = studio.fog
                    controlsOrbit.disable()
                    currentWalkingControls.enable()
                } else {
                    //studio.scene.fog = null
                    currentWalkingControls.disable()
                    controlsOrbit.enable()
                }
            }
        }
        document.addEventListener('keyup', onKeyUp)
    }

    // energy get
    let isFullEnergy = false
    const PERC_OF_FULL_COUNT_ENERGY_COMPLETE = .1
    phisics.onCollision(energySystem.nameSpace, (name: string) => {
        phisics.removeMeshFromCollision(name)
        energySystem.animateMovieHide(name)
        const percentageItemsGetted = energySystem.getPercentageItemsGetted()
        const multipyPerc = Math.min(1., percentageItemsGetted / PERC_OF_FULL_COUNT_ENERGY_COMPLETE)
        ui.setEnergyLevel(multipyPerc)
        if (multipyPerc === 1) {
            isFullEnergy = true
            ui.setEnergyLevel(1)
            ui.setEnergyYellow()
        }
    })

    let isDoorOpen = false 
    phisics.onCollision(lab.nameSpace, (name: string) => {

        if (name !== 'collision_lab_tunnel') {
            return;
        }
        if (!isFullEnergy) {
            return;
        }
        if (isDoorOpen) {
            return;
        }

        isDoorOpen = true
        lab.openDoor()
        phisics.removeMeshFromCollision('collision_lab_door')
    })

    await completePlay()
}
