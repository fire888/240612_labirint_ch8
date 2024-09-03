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
        root.loader.assets.mapFloor.repeat.set(300, 300)

        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: root.loader.assets.mapFloor,
            bumpMap: root.loader.assets.mapFloor,
            bumpScale: 1000,
        })
        this.mesh = new THREE.Mesh(floorGeometry, floorMaterial)
        this.mesh.position.y = -.5
    }
}
