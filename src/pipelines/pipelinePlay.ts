import { Root } from '../index'

const pause = (t: number): Promise<void> => new Promise(res => setTimeout(res, t))

let indexPlay = 0

export const pipelinePlay = async (root: Root) => {
    const {
        CONSTANTS,
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

    const { 
        LABS_CONF,
        PLAYER_START_POS, 
    } = CONSTANTS

    if (indexPlay !== 0) {
        console.log('level:', indexPlay, LABS_CONF[indexPlay])
        await lab.init(root, LABS_CONF[indexPlay])
        energySystem.init(root, lab.posesSleepEnds)
        phisics.setPlayerPosition(...PLAYER_START_POS)
    }

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

    // energy get *******************************************/
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

    // pipeline change level ******************************/
    let executeAwaitCompletePlay: any = null
    let isDoorOpen = false 
    phisics.onCollision(lab.nameSpace + 'top_tunnel', async (name: string) => {
        if (!isFullEnergy) {
            return;
        }
        if (isDoorOpen) {
            return;
        }

        isDoorOpen = true
        lab.openDoor()
        await pause(1000)
        //controlsPhone.disable()
        //controlsPointer.cameraDisconnect()
        //await studio.cameraFlyAway(lab.lastDir)
        lab.destroy()
        energySystem.destroy()
        ui.setEnergyLevel(0)
        executeAwaitCompletePlay()
    })

    const completePlay = () => {
        return new Promise(resolve => {
            executeAwaitCompletePlay = resolve
        })
    }

    await completePlay()
    await pause(1000)

    ++indexPlay

    // complete play if no next level
    if (!LABS_CONF[indexPlay]) { 
        return;
    }

    // play next level
    await pipelinePlay(root)
}
