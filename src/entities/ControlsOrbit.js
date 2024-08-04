import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class ControlsOrbit {
    constructor () {}

    init (camera, domElem) {
        this.controls = new OrbitControls(camera, domElem)
        this.controls.target.set( 0, 0.5, 0 )
        this.controls.update()
        this.controls.autoRotate = true
        this.controls.enablePan = true
        this.controls.enableDamping = true
        this.controls.enabled = false
    }

    enable () {
        this.controls.enabled = true
    }

    disable () {
        this.controls.enabled = false
    }

    update () {
        if (!this.controls.enabled) {
            return;
        }
        this.controls.update()
    }
}
