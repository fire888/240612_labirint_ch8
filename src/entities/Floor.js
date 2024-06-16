import * as THREE from 'three'

export class Floor {
    constructor() {}

    init () {
        const floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100)
        floorGeometry.rotateX(- Math.PI / 2)
        const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x117722 })
        this.mesh = new THREE.Mesh(floorGeometry, floorMaterial)
    }
}
