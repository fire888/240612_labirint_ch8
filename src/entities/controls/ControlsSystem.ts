import { ControlsOrbit } from "./ControlsOrbit"
import { ControlsPointer } from "./ControlsPointer"
import { ControlsPhone } from "./ControlsPhone"
import { Root } from "index"

export class ControlsSystem {
    _orbit: ControlsOrbit
    _pointer: ControlsPointer
    _phone: ControlsPhone
    _root: Root

    init (root: Root) {
        this._root = root

        const { 
            deviceData, 
            ui,
            studio,
        } = root

        this._orbit = new ControlsOrbit()
        this._orbit.init(studio.camera, studio.containerDom)

        this._pointer = new ControlsPointer()
        this._pointer.init(root)

        this._phone = new ControlsPhone()
        this._phone.init(root)

        let currentWalkingControls = deviceData.device === 'desktop' 
            ? this._pointer
            : this._phone
        currentWalkingControls.enable()

        // click on buttonPointerLock: enable pointerLock and hide phoneControls  
        ui.lockButton.onclick = () => {
            this._pointer.enable().then(isOn => {
                if (!isOn) { 
                    return 
                }
                currentWalkingControls = this._pointer
                this._phone.disable()
                this._orbit.disable()
                ui.toggleVisibleLock(false) 
            })
        }
        // callback on pointerUnlock: enable phoneControls and show buttonPointerLock
        this._pointer.onUnlock(() => {
            if (this._orbit.isEnabled) {
                return
            }
            currentWalkingControls = this._phone
            ui.toggleVisibleLock(true) 
            this._phone.enable()
        }) 

        // key O: disable/enable orbitControls
        const onKeyUp = (event: any) => {
            if (event.code === 'KeyO') {
                if (this._orbit.isEnabled) {
                    //studio.scene.fog = studio.fog
                    this._orbit.disable()
                    currentWalkingControls.enable()
                } else {
                    //studio.scene.fog = null
                    currentWalkingControls.disable()
                    this._orbit.enable()
                }
            }
        }
        document.addEventListener('keyup', onKeyUp)
    }

    update (delta: number) {
        this._orbit.update()
        this._pointer.update(delta, this._root.phisics.playerBody)
        this._phone.update(delta, this._root.phisics.playerBody)
    }
}