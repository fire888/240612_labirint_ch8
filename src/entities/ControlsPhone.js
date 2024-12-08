import * as THREE from 'three'

export class ControlsPhone {
    isForvard = false
    isBack = false
    isLeft = false
    isRight = false
    _isEnabled = false

    init (root) {
        this._root = root

        this._moveForvardDiv = document.createElement('div')
        this._moveForvardDiv.classList.add('control')
        this._moveForvardDiv.classList.add('butt-front')
        this._moveForvardDiv.addEventListener("pointerdown", () => {
            this.isForvard = true
        })
        this._moveForvardDiv.addEventListener("pointerup", () => {
            this.isForvard = false
        })
        document.body.appendChild(this._moveForvardDiv)

        this._moveBackDiv = document.createElement('div')
        this._moveBackDiv.classList.add('control')
        this._moveBackDiv.classList.add('butt-back')
        this._moveBackDiv.addEventListener("pointerdown", () => {
            this.isBack = true
        })
        this._moveBackDiv.addEventListener("pointerup", () => {
            this.isBack = false
        })
        document.body.appendChild(this._moveBackDiv)

        this._moveLeftDiv = document.createElement('div')
        this._moveLeftDiv.classList.add('control')
        this._moveLeftDiv.classList.add('butt-left')
        this._moveLeftDiv.addEventListener("pointerdown", () => {
            this.isLeft = true
        })
        this._moveLeftDiv.addEventListener("pointerup", () => {
            this.isLeft = false
        })
        document.body.appendChild(this._moveLeftDiv)

        this._moveRightDiv = document.createElement('div')
        this._moveRightDiv.classList.add('control')
        this._moveRightDiv.classList.add('butt-right')
        this._moveRightDiv.addEventListener("pointerdown", () => {
            this.isRight = true
        })
        this._moveRightDiv.addEventListener("pointerup", () => {
            this.isRight = false
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
        if (this.isLeft) {
            this.obj.rotation.y += 0.026 
        }
        if (this.isRight) {
            this.obj.rotation.y -= 0.026 
        }
        
        playerBody.quaternion.x = this.obj.quaternion.x
        playerBody.quaternion.y = this.obj.quaternion.y
        playerBody.quaternion.z = this.obj.quaternion.z
        playerBody.quaternion.w = this.obj.quaternion.w

        if (this.isForvard) {
            this.obj.translateZ(-1)
        }
        if (this.isBack) {
            this.obj.translateZ(1)
        }

        playerBody.velocity.x = this.obj.position.x * 3.
        playerBody.velocity.z = this.obj.position.z * 3.

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
            case 'KeyW': this.isForvard = false; break;

            case 'ArrowLeft':
            case 'KeyA': this.isLeft = false; break;

            case 'ArrowDown':
            case 'KeyS': this.isBack = false; break;

            case 'ArrowRight':
            case 'KeyD': this.isRight = false; break;

            //case 'KeyR': this.moveUp = false; break;
            //case 'KeyF': this.moveDown = false; break;
        }
    }

	_onKeyDown (event) {
        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW': this.isForvard = true; break;

            case 'ArrowLeft':
            case 'KeyA': this.isLeft = true; break;

            case 'ArrowDown':
            case 'KeyS': this.isBack = true; break;

            case 'ArrowRight':
            case 'KeyD': this.isRight = true; break;

            //case 'KeyR': this.moveUp = true; break;
            //case 'KeyF': this.moveDown = true; break;
        }
    }
}