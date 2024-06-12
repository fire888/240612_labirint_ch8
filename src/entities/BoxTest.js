import * as THREE from 'three'

export class BoxTest {
    constructor() {
    }
    init () {
        const g = new THREE.BoxGeometry()
        const m = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        this.mesh = new THREE.Mesh(g, m)
    }
}
