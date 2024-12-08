import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'

export class ControlsPhone {
    _isForvard = false
    _isBack = false
    _isLeft = false
    _isRight = false
    _isEnabled = false

    _currentSpeedForward = 0.
    _maxSpeedForward = 5.
    _tweenSpeedForward = null

    _currentSpeedLeft = 0.
    _maxSpeedLeft = .035
    _tweenSpeedLeft = null

    init (root) {
        this._root = root

        this._moveForvardDiv = document.createElement('div')
        this._moveForvardDiv.classList.add('control')
        this._moveForvardDiv.classList.add('butt-front')
        this._moveForvardDiv.addEventListener("pointerdown", () => {
            this._isForvard = true
        })
        this._moveForvardDiv.addEventListener("pointerup", () => {
            this._isForvard = false
        })
        document.body.appendChild(this._moveForvardDiv)

        this._moveBackDiv = document.createElement('div')
        this._moveBackDiv.classList.add('control')
        this._moveBackDiv.classList.add('butt-back')
        this._moveBackDiv.addEventListener("pointerdown", () => {
            this._isBack = true
        })
        this._moveBackDiv.addEventListener("pointerup", () => {
            this._isBack = false
        })
        document.body.appendChild(this._moveBackDiv)

        this._moveLeftDiv = document.createElement('div')
        this._moveLeftDiv.classList.add('control')
        this._moveLeftDiv.classList.add('butt-left')
        this._moveLeftDiv.addEventListener("pointerdown", () => {
            this._isLeft = true
        })
        this._moveLeftDiv.addEventListener("pointerup", () => {
            this._isLeft = false
        })
        document.body.appendChild(this._moveLeftDiv)

        this._moveRightDiv = document.createElement('div')
        this._moveRightDiv.classList.add('control')
        this._moveRightDiv.classList.add('butt-right')
        this._moveRightDiv.addEventListener("pointerdown", () => {
            this._isRight = true
        })
        this._moveRightDiv.addEventListener("pointerup", () => {
            this._isRight = false
        })
        document.body.appendChild(this._moveRightDiv)

        this._moveForvardDiv.style.display = 'none'
        this._moveBackDiv.style.display = 'none'
        this._moveLeftDiv.style.display = 'none'
        this._moveRightDiv.style.display = 'none'

        window.addEventListener('keydown', this._onKeyDown.bind(this))
		window.addEventListener('keyup', this._onKeyUp.bind(this))


        this.obj = new THREE.Object3D()
        this.obj.rotation.y = Math.PI
    }

    update (delta, playerBody) {
        if (!this._isEnabled) {
            return
        }
        if (this._currentSpeedLeft !== 0) {
            this.obj.rotation.y += this._currentSpeedLeft
        }
        
        playerBody.quaternion.x = this.obj.quaternion.x
        playerBody.quaternion.y = this.obj.quaternion.y
        playerBody.quaternion.z = this.obj.quaternion.z
        playerBody.quaternion.w = this.obj.quaternion.w

        if (this._currentSpeedForward !== 0) {
            this.obj.translateZ(this._currentSpeedForward)
        }

        playerBody.velocity.x = this.obj.position.x
        playerBody.velocity.z = this.obj.position.z

        this._root.studio.camera.quaternion.x = this.obj.quaternion.x
        this._root.studio.camera.quaternion.y = this.obj.quaternion.y
        this._root.studio.camera.quaternion.z = this.obj.quaternion.z
        this._root.studio.camera.quaternion.w = this.obj.quaternion.w

        this._root.studio.camera.position.x = playerBody.position.x
        this._root.studio.camera.position.y = playerBody.position.y
        this._root.studio.camera.position.z = playerBody.position.z

        this.obj.position.x = 0
        this.obj.position.y = 0 
        this.obj.position.z = 0
    }

    enable () {
        this._moveForvardDiv.style.display = 'block'
        this._moveBackDiv.style.display = 'block'
        this._moveLeftDiv.style.display = 'block'
        this._moveRightDiv.style.display = 'block'

        this._isEnabled = true
    }

    disable () {
        this._moveForvardDiv.style.display = 'none'
        this._moveBackDiv.style.display = 'none'
        this._moveLeftDiv.style.display = 'none'
        this._moveRightDiv.style.display = 'none'

        this._isEnabled = false
    }

    _onKeyUp ( event ) {
        switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW':
                if (this._isForvard) this._changeForwardSpeedTo(0.)
                this._isForvard = false; 
                break;

            case 'ArrowLeft':
            case 'KeyA': 
                if (this._isLeft) this._changeLeftSpeedTo(0.)
                this._isLeft = false; 
                break;

            case 'ArrowDown':
            case 'KeyS': 
                if (this._isBack) this._changeForwardSpeedTo(0.)
                this._isBack = false; 
                break;

            case 'ArrowRight':
            case 'KeyD': 
            this._isRight && this._changeLeftSpeedTo(0.)
                this._isRight = false;
                break;
        }
    }

	_onKeyDown (event) {
        switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW': 
                if (!this._isForvard) this._changeForwardSpeedTo(-this._maxSpeedForward)
                this._isForvard = true; 
                break;

            case 'ArrowDown':
                case 'KeyS':
                    if (!this._isBack) this._changeForwardSpeedTo(this._maxSpeedForward) 
                    this._isBack = true; 
                    break;    

            case 'ArrowLeft':
            case 'KeyA':
                if (!this._isLeft) this._changeLeftSpeedTo(this._maxSpeedLeft) 
                this._isLeft = true; 
                break;

            case 'ArrowRight':
            case 'KeyD':
                if (!this._isRight) this._changeLeftSpeedTo(-this._maxSpeedLeft) 
                this._isRight = true; 
                break;
        }
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
}