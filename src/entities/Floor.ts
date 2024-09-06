import * as THREE from 'three'
import { Root } from "../index";
import { createMesh } from 'geometry/helperCreateMesh';
import { _M } from 'geometry/_m';
export class Floor {
    mesh: THREE.Mesh
    constructor() {}

    init (root: Root) {
        const v = [
            ..._M.createPolygon(
                [-1000, 0, 1000],
                [1000, 0, 1000],
                [1000, 0, -1000],
                [-1000, 0, -1000],
            )
        ]

        const uv = [
            ..._M.createUv(
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
            )
        ]

        root.loader.assets.mapFloor.wrapS = THREE.RepeatWrapping
        root.loader.assets.mapFloor.wrapT = THREE.RepeatWrapping
        root.loader.assets.mapFloor.repeat.set(300, 300)

        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: root.loader.assets.mapFloor,
            bumpMap: root.loader.assets.mapFloor,
            bumpScale: 1000,
        })

        // @ts-ignore: Unreachable code error
        this.mesh = createMesh({ v, uv, material })
        this.mesh.position.y = -.3
    }
}
