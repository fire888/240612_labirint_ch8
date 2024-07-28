import * as THREE from 'three'

export class Studio {
    containerDom: HTMLElement
    camera: THREE.PerspectiveCamera
    scene: THREE.Scene
    fog: THREE.Fog
    hemiLight: THREE.HemisphereLight
    dirLight: THREE.DirectionalLight
    renderer: THREE.WebGLRenderer
    constructor() {}

    init () {
        this.containerDom = document.getElementById('container-game')
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .001, 200)
        this.camera.position.set(1, 2, 3)
        this.camera.lookAt(0, 1, 0)

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x999999)
        this.fog = new THREE.Fog(0x999999, 1, 30)

       // this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3)
       // this.hemiLight.position.set( 0, 20, 0 )
       // this.scene.add(this.hemiLight)

        this.dirLight = new THREE.DirectionalLight( 0xffffff, 3 )
        this.dirLight.position.set(-3, 10, 2)
        // this.dirLight.castShadow = true
        // this.dirLight.shadow.camera.top = 2
        // this.dirLight.shadow.camera.bottom = -2
        // this.dirLight.shadow.camera.left = -2
        // this.dirLight.shadow.camera.right = 2
        // this.dirLight.shadow.camera.near = 0.1
        // this.dirLight.shadow.camera.far = 40
        this.scene.add(this.dirLight)

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        //this.renderer.shadowMap.enabled = true
        this.containerDom.appendChild(this.renderer.domElement)

        window.addEventListener( 'resize', this.onWindowResize.bind(this))
        this.onWindowResize()
    }

    render () {
        this.renderer.render(this.scene, this.camera)
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    add (m: THREE.Object3D) {
        this.scene.add(m)
    }
}
