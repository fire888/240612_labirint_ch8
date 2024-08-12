import * as THREE from 'three'



export const createMesh = ({
    v = [],
    uv = [],
    c = [],
    material = new THREE.MeshBasicMaterial({ color: 0x777777 })

}) => {

    const geometry = new THREE.BufferGeometry()
    const vF32 = new Float32Array(v)
    geometry.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
    geometry.computeVertexNormals()
    //const uvF32 = new Float32Array(uv)
    //geometry.setAttribute('uv', new THREE.BufferAttribute(uvF32, 2))
    //const cF32 = new Float32Array(c)
    //geometry.setAttribute('color', new THREE.BufferAttribute(cF32, 3))
    return new THREE.Mesh(geometry, material)
}



export const makeCreaterSquare = ({ w }) => {
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })
    const linePoints = [
        new THREE.Vector3(-w / 2, 0, -w / 2),
        new THREE.Vector3(-w / 2, 0, w / 2),
        new THREE.Vector3(w / 2, 0, w / 2),
        new THREE.Vector3(w / 2, 0, -w / 2),
        new THREE.Vector3(-w / 2, 0, -w / 2),
    ]
    const geometry = new THREE.BufferGeometry().setFromPoints(linePoints)

    return () => {
        return new THREE.Line(geometry, lineMaterial)
    }
}