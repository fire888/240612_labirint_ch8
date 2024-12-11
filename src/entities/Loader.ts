import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import envModel from "../assets/env.jpg"
import sky from '../assets/sky.jpg'
import sprite from '../assets/sprite.png'

type Assets = {
    mapEnv?: any,
    //mapFloor?: any,
    sky?: any,
    sprite?: any, 
}

export class LoaderAssets {
    _gltfLoader: GLTFLoader
    _textureLoader: THREE.TextureLoader
    assets: Assets

    constructor() {
        this.assets = {
            mapEnv: null,
            //mapFloor: null,
            sky: null,
            sprite: null,
        }
    }

    init () {
        this._gltfLoader = new GLTFLoader()
        this._textureLoader = new THREE.TextureLoader()
    }

    loadAssets (): Promise<void> {
        return new Promise(res => {
            this._textureLoader.load(envModel, t => {
                this.assets.mapEnv = t
                //this._textureLoader.load(mapFloor, t => {
                    //this.assets.mapFloor = t
                    this._textureLoader.load(sky, s => {
                        s.mapping = THREE.EquirectangularReflectionMapping;
                        s.colorSpace = THREE.SRGBColorSpace;
                        this.assets.sky = s
                        this._textureLoader.load(sprite, s => {
                            this.assets.sprite = s
                            res()
                        })
                    })
                //})
            })
        })
    }
}
