import * as THREE from 'three'


const createS = m => {
    const v = []

    for (let i = 0; i < 20; ++i) {
        const angle = Math.random() * Math.PI * 2
        const d = Math.random() * 3 * 12 + 50

        const x = Math.cos(angle) * d
        const y = Math.random() * 150 + 10
        const z = Math.sin(angle) * d

        for (let i = 0; i < 3; ++i) {
            v.push(
                x + Math.random() * .5,
                y + Math.random() * .5,
                z + Math.random() * .5,
            )
        }
    } 

    const vertices = new Float32Array(v)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geometry.computeVertexNormals()

    return new THREE.Mesh(geometry, m)
}


export class SmallTriangles {
    init (root) {
        this.m = new THREE.Object3D()
        this.material = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
        })

        for (let i = 0; i < 50; ++i) {
            const s = createS(this.material)
            s.position.x = 0
            s.position.z = 0
            this.m.add(s) 
        }
    }
}