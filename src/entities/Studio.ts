import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
//import { BokehPass } from 'three/examples/jsm/postprocessing/';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { Root } from "../index";



const params = {
    threshold: 0.65,
    strength: 0.2,
    radius: 0,

    focus: 500.0,
    aperture: 5,
    maxblur: 0.01
}

export class Studio {
    containerDom: HTMLElement
    camera: THREE.PerspectiveCamera
    scene: THREE.Scene
    fog: THREE.Fog
    hemiLight: THREE.HemisphereLight
    dirLight: THREE.DirectionalLight
    renderer: THREE.WebGLRenderer
    envMap: THREE.Texture
    composer: EffectComposer
    constructor() {}

    init (root: Root) {
        this.containerDom = document.getElementById('container-game')
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .001, 1000)
        this.camera.position.set(1, 30, 70)
        this.camera.lookAt(0, 1, 0)

        this.scene = new THREE.Scene()
        //debugger
        //root.loader.assets.envMap.encoding = THREE.sRGBEncoding;
        root.loader.assets.mapEnv.mapping = THREE.EquirectangularReflectionMapping;
        root.loader.assets.mapEnv.colorSpace = THREE.SRGBColorSpace;

        this.scene.background = root.loader.assets.mapEnv
        this.envMap = root.loader.assets.mapEnv
        //this.scene.background = new THREE.Color(0x999999)
        //this.fog = new THREE.Fog(0x00001a, 1, 50)
        this.fog = new THREE.Fog(0x00001a, 1, 50)

       this.hemiLight = new THREE.HemisphereLight(0x6767f3, 0xffffff, 5)
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


        const renderScene = new RenderPass(this.scene, this.camera)

        const smaaPass = new SMAAPass( window.innerWidth * this.renderer.getPixelRatio(), window.innerHeight * this.renderer.getPixelRatio() );

        const bokehPass = new BokehPass(this.scene, this.camera, {
            focus: 50,
            aperture: 0.00002,
            maxblur: 0.015
        } );

        const bloomPass = new UnrealBloomPass( new THREE.Vector2(window.innerWidth, window.innerHeight),1.5,0.4,0.85)
        bloomPass.threshold = params.threshold
        bloomPass.strength = params.strength
        bloomPass.radius = params.radius

        const outputPass = new OutputPass();

        this.composer = new EffectComposer(this.renderer)
        this.composer.addPass(renderScene)
        this.composer.addPass(smaaPass)
        this.composer.addPass(bokehPass)
        this.composer.addPass(bloomPass)
        this.composer.addPass(outputPass)

        window.addEventListener( 'resize', this.onWindowResize.bind(this))
        this.onWindowResize()

        const gui = new GUI();
        const bloomFolder = gui.addFolder( 'bloom' );
        bloomFolder.add(params, 'threshold',0.0,1.0).onChange( function ( value ) {
            bloomPass.threshold = Number( value );
        });

        bloomFolder.add( params, 'strength', 0.0, 3.0 ).onChange( function ( value ) {
            bloomPass.strength = Number( value );
        });

        gui.add( params, 'radius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
            bloomPass.radius = Number( value );
        });

        gui.add( params, 'focus', 1, 300, .0001 ).onChange( v => {
            // @ts-ignore: Unreachable code error
            bokehPass.uniforms.focus.value = v
        });
        gui.add( params, 'aperture', 0, .1, 0.000001 ).onChange( v => {
            // @ts-ignore: Unreachable code error
            bokehPass.uniforms.aperture.value = v
        });
        gui.add( params, 'maxblur', 0.0, 0.05, 0.0001 ).onChange( v => {
            // @ts-ignore: Unreachable code error
            bokehPass.uniforms.maxblur.value = v
        })

        //const smaaFolder = gui.addFolder( 'SMAA' );
        //smaaFolder.add( params, 'enabled' );
    }

    render () {
        //this.renderer.render(this.scene, this.camera)
        this.composer.render()
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.composer.setSize(window.innerWidth, window.innerHeight)
    }

    add (m: THREE.Object3D) {
        this.scene.add(m)
    }

    addAxisHelper () {
        const axesHelper = new THREE.AxesHelper(15)
        this.scene.add(axesHelper)
    }
}
