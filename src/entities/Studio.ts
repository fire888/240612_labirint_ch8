import * as THREE from 'three'
import { Root } from "../index";

export class Studio {
    containerDom: HTMLElement
    camera: THREE.PerspectiveCamera
    scene: THREE.Scene
    fog: THREE.Fog
    hemiLight: THREE.HemisphereLight
    dirLight: THREE.DirectionalLight
    renderer: THREE.WebGLRenderer
    constructor() {}

    init (root: Root) {
        this.containerDom = document.getElementById('container-game')
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .001, 200)
        this.camera.position.set(1, 30, 70)
        this.camera.lookAt(0, 1, 0)

        this.scene = new THREE.Scene()
        //debugger
        //root.loader.assets.envMap.encoding = THREE.sRGBEncoding;
        root.loader.assets.mapEnv.mapping = THREE.EquirectangularReflectionMapping;
        root.loader.assets.mapEnv.colorSpace = THREE.SRGBColorSpace;

        this.scene.background = root.loader.assets.mapEnv
        //this.scene.background = new THREE.Color(0x999999)
        this.fog = new THREE.Fog(0x00001a, 1, 100)

       this.hemiLight = new THREE.HemisphereLight(0x6767f3, 0xffffff, 1.5)
       this.hemiLight.position.set( 0, 20, 0 )
       this.scene.add(this.hemiLight)

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

    addAxisHelper () {
        const axesHelper = new THREE.AxesHelper(15)
        this.scene.add(axesHelper)
    }
}
