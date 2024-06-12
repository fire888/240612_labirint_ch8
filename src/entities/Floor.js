import * as THREE from 'three'

export class Floor {
    constructor() {
    }

    init () {
        let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100)
        floorGeometry.rotateX( - Math.PI / 2 )
        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
        this.mesh = new THREE.Mesh(floorGeometry, floorMaterial)
    }
}
