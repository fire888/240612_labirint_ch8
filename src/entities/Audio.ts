import { Root } from '../index'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'

export class Audio {
    private _root: Root
    private _soundAmbient: THREE.Audio
    private _steps: THREE.Audio
    private _energy: THREE.Audio
    private _door: THREE.Audio 
    private _fly: THREE.Audio
    private _isCanPlaySteps: boolean = true

    init (root: Root) {
        this._root = root
        const listener = new THREE.AudioListener()
        const cam = root.studio.camera
        cam.add(listener)

        this._soundAmbient = new THREE.Audio(listener)
        this._soundAmbient.setBuffer(root.loader.assets.soundAmbient)
        this._soundAmbient.setLoop(true)
        this._soundAmbient.setVolume(0)

        this._steps = new THREE.Audio(listener)
        this._steps.setBuffer(root.loader.assets.soundStepsMetal)
        this._steps.setLoop(true)
        this._steps.playbackRate = 1.5
        this._steps.setVolume(.15)

        this._energy = new THREE.Audio(listener)
        this._energy.setBuffer(root.loader.assets.soundBzink)
        this._energy.setLoop(false)
        this._energy.playbackRate = 1
        this._energy.setVolume(.5)

        this._door = new THREE.Audio(listener)
        this._door.setBuffer(root.loader.assets.soundDoor)
        this._door.setLoop(false)
        this._door.playbackRate = 1
        this._door.setVolume(.5)

        this._fly = new THREE.Audio(listener)
        this._fly.setBuffer(root.loader.assets.soundFly)
        this._fly.setLoop(true)
        this._fly.playbackRate = 1
        this._fly.setVolume(1.5)
    }

    playAmbient () {
        if (this._soundAmbient.isPlaying) {
            return;
        }

        this._soundAmbient.play()

        const obj = { v: 0 } 
        new TWEEN.Tween(obj)
            .interpolation(TWEEN.Interpolation.Linear)
            .to({ v: .35 }, 400)
            .onUpdate(() => {
                this._soundAmbient.setVolume(obj.v)
            })
            .start()
    }

    disableSteps () {
        this._isCanPlaySteps = false 
        this._stopSteps() 
    }

    enableSteps () {
        this._isCanPlaySteps = true
    }

    update () {
        if (!this._isCanPlaySteps) {
            return
        }

        if (
            Math.abs(this._root.phisics.playerBody.velocity.x) > .05 || 
            Math.abs(this._root.phisics.playerBody.velocity.z) > .05 
        ) { 
            this._playSteps()
        }

        if (
            Math.abs(this._root.phisics.playerBody.velocity.x) < .05 && 
            Math.abs(this._root.phisics.playerBody.velocity.x) < .05
        ) { 
            this._stopSteps()
        }
    }

    playEnergy () {
        this._energy.play()
    }

    playDoor () {
        this._door.play()
    }

    playFly () {
        this._fly.play()
        const obj = { v: 0 } 
        new TWEEN.Tween(obj)
            .interpolation(TWEEN.Interpolation.Linear)
            .to({ v: 1.5 }, 400)
            .onUpdate(() => {
                this._fly.setVolume(obj.v)
            })
            .start()
    }

    stopFly () {
        const obj = { v: 1.5 } 
        new TWEEN.Tween(obj)
            .interpolation(TWEEN.Interpolation.Linear)
            .to({ v: 0 }, 400)
            .onUpdate(() => {
                this._fly.setVolume(obj.v)
            })
            .onComplete(() => {
                this._fly.stop()
            })
            .start()
    }

    private _playSteps () {
        if (!this._isCanPlaySteps) {
            return;
        }
        if (this._steps.isPlaying) {
            return;
        }
            
        this._steps.play()
    }

    private _stopSteps () {
        if (!this._steps.isPlaying) {
            return;
        }
        this._steps.stop()
    }
}