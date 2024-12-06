import * as THREE from 'three'

export class PhoneControls {
    isForvard = false
    isBack = false
    isLeft = false
    isRight = false

    init (root) {
        this._root = root

        this._moveForvardDiv = document.createElement('div')
        this._moveForvardDiv.classList.add('phone-control')
        this._moveForvardDiv.classList.add('move-forvard')
        this._moveForvardDiv.innerHTML = 'forvard'
        this._moveForvardDiv.addEventListener("pointerdown", () => {
            console.log('TTTTTT')
            this.isForvard = true
        })
        this._moveForvardDiv.addEventListener("pointerup", () => {
            console.log('TTTTTT !!!')
            this.isForvard = false
        })
        document.body.appendChild(this._moveForvardDiv)

        this._moveLeftDiv = document.createElement('div')
        this._moveLeftDiv.classList.add('phone-control')
        this._moveLeftDiv.classList.add('move-left')
        this._moveLeftDiv.innerHTML = 'left'
        this._moveLeftDiv.addEventListener("pointerdown", () => {
            this.isLeft = true
        })
        this._moveLeftDiv.addEventListener("pointerup", () => {
            this.isLeft = false
        })
        document.body.appendChild(this._moveLeftDiv)

        this._moveRightDiv = document.createElement('div')
        this._moveRightDiv.classList.add('phone-control')
        this._moveRightDiv.classList.add('move-right')
        this._moveRightDiv.innerHTML = 'right'
        this._moveRightDiv.addEventListener("pointerdown", () => {
            this.isRight = true
        })
        this._moveRightDiv.addEventListener("pointerup", () => {
            this.isRight = false
        })
        document.body.appendChild(this._moveRightDiv)

        this.obj = new THREE.Object3D()
    }

    update (delta, playerBody) {
        const dir = new THREE.Vector3()
        this.obj.getWorldDirection(dir)
        dir.y = 0
        dir.normalize()
        const dirLeft = new THREE.Vector3().copy(dir).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * .5)

        playerBody.quaternion.x = this.obj.quaternion.x
        playerBody.quaternion.y = this.obj.quaternion.y
        playerBody.quaternion.z = this.obj.quaternion.z
        playerBody.quaternion.w = this.obj.quaternion.w

        const resultDir = new THREE.Vector3()


        if (this.isForvard) {
            console.log('UUUU')
            resultDir.add(dir)
        }
        if (this.isBack) {
            resultDir.sub(dir)
        }
        if (this.isLeft) {
            resultDir.add(dirLeft)
        }
        if (this.isRight) {
            resultDir.sub(dirLeft)
        }
        resultDir.normalize()

        playerBody.velocity.x = resultDir.x * 3.
        playerBody.velocity.z = resultDir.z * 3.

        this.obj.position.x = playerBody.position.x
        this.obj.position.y = playerBody.position.y
        this.obj.position.z = playerBody.position.z

        this._root.studio.camera.position.x = playerBody.position.x
        this._root.studio.camera.position.y = playerBody.position.y
        this._root.studio.camera.position.z = playerBody.position.z

    }
}