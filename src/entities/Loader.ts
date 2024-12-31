import * as THREE from 'three'
import mapEnv from "../assets/env.jpg"
import sky from '../assets/sky.jpg'
import sprite from '../assets/sprite.png'

type Assets = {
    mapEnv: THREE.Texture,
    sky: THREE.Texture,
    sprite: THREE.Texture,
}
type ResultLoad = {
    key: keyof Assets,
    texture: THREE.Texture,
}

export class LoaderAssets {
    _textureLoader: THREE.TextureLoader = new THREE.TextureLoader()
    assets: Assets = {
        mapEnv: null,
        sky: null,
        sprite: null,
    }

    init () {}

    loadAssets (): Promise<void> {
        return new Promise(res => {

            const loadTextue = (key: keyof Assets, src: string) => {
                return new Promise<ResultLoad>(res => {
                    this._textureLoader.load(src, texture => {
                        res({ key, texture })
                    })
                })
            }

            const promises = [
                loadTextue('mapEnv', mapEnv),
                loadTextue('sky', sky),
                loadTextue('sprite', sprite),
            ]

            Promise.all(promises).then(result => {
                for (let i = 0; i < result.length; ++i) {
                     this.assets[result[i].key as keyof Assets] = result[i].texture
                }
                res()
            })
        })
    }
}
