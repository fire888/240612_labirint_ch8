import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import * as THREE from 'three'

export class ControlsPointer {
    constructor() {
        this.isEnabled = false
    }

    init (camera, domElem) {
        this.camera = camera
        this.domElem = domElem

        this.moveForward = false
        this.moveBackward = false
        this.moveLeft = false
        this.moveRight = false
        this.canJump = false

        this._prevTime = performance.now()
        this.velocity = new THREE.Vector3()
        this.direction = new THREE.Vector3()

        this.objects = []

        this.controls = new PointerLockControls(camera, domElem)
        this.controls.addEventListener('lock', () => {
            console.log('LOCK')
        })
        this.controls.addEventListener('unlock', () => {
            console.log('UN_LOCK')
        })

        const onKeyDown = event => {
            switch ( event.code ) {
                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = true
                    break

                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = true
                    break

                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = true
                    break

                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = true
                    break

                case 'Space':
                    if (this.canJump === true) this.velocity.y += 10
                    this.canJump = false
                    break
            }
        }

        const onKeyUp = event => {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = false
                    break

                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = false
                    break

                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = false
                    break

                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = false
                    break
            }
        }

        document.addEventListener('keydown', onKeyDown)
        document.addEventListener('keyup', onKeyUp)

        this.raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 1)
    }

    update () {
        if (!this.isEnabled) {
            return;
        }

        if (!this.camera) {
            return;
        }

        const time = performance.now()

        if (this.controls.isLocked === true ) {
            this.raycaster.ray.origin.copy(this.controls.getObject().position)
            this.raycaster.ray.origin.y -= 0

            const intersections = this.raycaster.intersectObjects(this.objects, true)

            const onObject = intersections.length > 0

            const delta = ( time - this._prevTime ) / 1000

            this.velocity.x -= this.velocity.x * 10.0 * delta
            this.velocity.z -= this.velocity.z * 10.0 * delta
            this.velocity.y -= 9.8 * 3. * delta; // 100.0 = mass

            this.direction.z = Number(this.moveForward) - Number(this.moveBackward)
            this.direction.x = Number(this.moveRight) - Number(this.moveLeft)
            this.direction.normalize() // this ensures consistent movements in all directions

            if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 40.0 * delta
            if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 40.0 * delta

            if (onObject === true) {
                this.velocity.y = Math.max(0, this.velocity.y)
                this.canJump = true
                if (intersections[0].distance < 1) {
                    this.controls.getObject().position.y += 1 - intersections[0].distance
                }
            }

            this.controls.moveRight( - this.velocity.x * delta)
            this.controls.moveForward( - this.velocity.z * delta)

            this.controls.getObject().position.y += (this.velocity.y * delta) // new behavior

            if (this.controls.getObject().position.y < 1) {
                this.velocity.y = 0
                this.controls.getObject().position.y = 1
                this.canJump = true
            }
        }

        this._prevTime = time
    }

    setToCollisionFloor (m) {
        this.objects.push(m)
    }

    enable() {
        this.isEnabled = true
        this.controls.lock()
    }

    disable() {
        this.isEnabled = false
        this.controls.unlock()
    }
}
