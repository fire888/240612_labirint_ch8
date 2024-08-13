import * as THREE from 'three'
import { Root } from "../index";

export class Floor {
    mesh: THREE.Mesh
    constructor() {}

    init (root: Root) {
        const floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100)
        floorGeometry.rotateX(- Math.PI / 2)
        root.loader.assets.mapFloor.wrapS = THREE.RepeatWrapping
        root.loader.assets.mapFloor.wrapT = THREE.RepeatWrapping
        root.loader.assets.mapFloor.repeat.set(1400, 1400)

        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: root.loader.assets.mapFloor  })
        this.mesh = new THREE.Mesh(floorGeometry, floorMaterial)
        this.mesh.position.y = 0
    }
}
