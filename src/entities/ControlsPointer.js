import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'



export class ControlsPointer {
    isEnabled = false

    _timeLastLocked = null
    _delayNextLock = 2000
    _isFirstLock = true

    _currentSpeedForward = 0.
    _maxSpeedForward = 5.
    _tweenSpeedForward = null

    _currentSpeedLeft = 0.
    _maxSpeedLeft = 5.
    _tweenSpeedLeft = null

    _moveForward = false
    _moveBackward = false
    _moveLeft = false
    _moveRight = false

    _dirForward = new THREE.Vector3()
    _dirLeft = new THREE.Vector3()
    _resultDir = new THREE.Vector3()
    _topVec = new THREE.Vector3(0, 1, 0)

    _timeRot = 0 
    _eulerRot = new THREE.Euler(0, 0, 0, 'YXZ')


    init (root) {
        this.camera = root.studio.camera
        this.domElem = root.studio.containerDom

        this._prevTime = performance.now()
        this.velocity = new THREE.Vector3()
        this.direction = new THREE.Vector3()

        this.savedPosition = new THREE.Vector3()
        this.diffVec = new THREE.Vector3()
        this.savedRotation = new THREE.Quaternion()

        this.controls = new PointerLockControls(this.camera, this.domElem)
        this.controls.maxPolarAngle = Math.PI - .01
        this.controls.minPolarAngle = .01
        this.controls.addEventListener('lock', () => {
            this.isEnabled = true
        })
        this.controls.addEventListener('unlock', () => {
            this.isEnabled = false
            this._timeLastLocked = Date.now()
        })

        document.addEventListener('keydown', this._onKeyDown.bind(this))
        document.addEventListener('keyup', this._onKeyUp.bind(this))

        this.raycaster = new THREE.Raycaster(new THREE.Vector3(), this._topVec, 0, 1)
    }

    update (delta, playerCollision) {
        if (!this.isEnabled) {
            return;
        }

        if (!this.controls.isLocked) {
            return;
        }

        if (!this.camera) {
            return;
        }
        
        this._resultDir.x = 0
        this._resultDir.z = 0
        
        this.camera.getWorldDirection(this._dirForward)
        this._dirForward.y = 0
        this._dirForward.normalize()

        this._dirLeft.copy(this._dirForward).applyAxisAngle(this._topVec, Math.PI * .5)

        if (this._moveForward || this._moveBackward || this._tweenSpeedForward) {
            this._dirForward.x *= this._currentSpeedForward
            this._dirForward.z *= this._currentSpeedForward
            this._resultDir.add(this._dirForward)
        }
        if (this._moveLeft || this._moveRight || this._tweenSpeedLeft) {
            this._dirLeft.x *= this._currentSpeedLeft
            this._dirLeft.z *= this._currentSpeedLeft
            this._resultDir.add(this._dirLeft)
        }

        playerCollision.velocity.x = this._resultDir.x
        playerCollision.velocity.z = this._resultDir.z

        this.camera.position.x = playerCollision.position.x
        this.camera.position.y = playerCollision.position.y
        this.camera.position.z = playerCollision.position.z

        // camera debounce
        this._timeRot += delta
        const walkingDebounce = Math.sin(this._timeRot * 0.02) * 0.006 * this._currentSpeedForward
        const idleDebounce = Math.sin(this._timeRot * 0.001) * 0.01 * (this._maxSpeedForward - this._currentSpeedForward)
        this._eulerRot.setFromQuaternion(this.camera.quaternion)
        this._eulerRot.z = walkingDebounce + idleDebounce
        this.camera.quaternion.setFromEuler(this._eulerRot)
    }

    enable() {
        return new Promise(res => {
            if (this.isEnabled) { 
                return res(false)
            }
            if (this._timeLastLocked + this._delayNextLock > Date.now()) { 
                return res(false)
            }
            if (this._isFirstLock) {
                this.controls.getObject().rotation.set(0, Math.PI, 0)
            }
            this.controls.lock()
            this.isEnabled = true
            res(true)
        })
    }

    disable() {
        if (!this.isEnabled) { 
            return 
        }
        this.isEnabled = false
        this.controls.unlock()
    }

    onUnlock (cb) {
        this.controls.addEventListener('unlock', cb)
    }

    _changeForwardSpeedTo(v) {
        if (this._tweenSpeedForward) {
            this._tweenSpeedForward.stop()
        }

        const obj = { speed: this._currentSpeedForward }
        this._tweenSpeedForward = new TWEEN.Tween(obj)
            .interpolation(TWEEN.Interpolation.Linear)
            .to({ speed: v }, 200)
            .onUpdate(() => {
                this._currentSpeedForward = obj.speed
            })
            .onComplete(() => {
                this._tweenSpeedForward = null
            })
            .start()
    }

    _changeLeftSpeedTo(v) {
        if (this._tweenSpeedLeft) {
            this._tweenSpeedLeft.stop()
        }

        const obj = { speed: this._currentSpeedLeft }
        this._tweenSpeedLeft = new TWEEN.Tween(obj)
            .interpolation(TWEEN.Interpolation.Linear)
            .to({ speed: v }, 200)
            .onUpdate(() => {
                this._currentSpeedLeft = obj.speed
            })
            .onComplete(() => {
                this._tweenSpeedLeft = null
            })
            .start()
    }

    _onKeyDown (event) {
        switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW':
                !this._moveForward && this._changeForwardSpeedTo(this._maxSpeedForward)
                this._moveForward = true
                break

            case 'ArrowDown':
            case 'KeyS':
                !this._moveBackward &&this._changeForwardSpeedTo(-this._maxSpeedForward)
                this._moveBackward = true
                break    

            case 'ArrowLeft':
            case 'KeyA':
                !this._moveLeft && this._changeLeftSpeedTo(this._maxSpeedLeft)
                this._moveLeft = true
                break

            case 'ArrowRight':
            case 'KeyD':
                !this._moveRight && this._changeLeftSpeedTo(-this._maxSpeedLeft)
                this._moveRight = true
                break
        }
    }

    _onKeyUp (event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                this._moveForward && this._changeForwardSpeedTo(0)
                this._moveForward = false
                break

            case 'ArrowDown':
            case 'KeyS':
                this._moveBackward && this._changeForwardSpeedTo(0)
                this._moveBackward = false
                break    

            case 'ArrowLeft':
            case 'KeyA':
                this._moveLeft && this._changeLeftSpeedTo(0)
                this._moveLeft = false
                break

            case 'ArrowRight':
            case 'KeyD':
                this._moveRight && this._changeLeftSpeedTo(0)
                this._moveRight = false
                break
        }
    }
}
