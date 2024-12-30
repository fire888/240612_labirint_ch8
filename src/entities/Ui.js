import * as TWEEN from '@tweenjs/tween.js'

const ENERGY_MAX_WIDTH = 30

export class Ui {
    _currentEnergyMinWidth = 0
    init (root) {
        this.lockButton = document.createElement('div')
        this.lockButton.classList.add('butt-lock')
        this.lockButton.classList.add('control-small')
        this.lockButton.style.display = 'none'
        document.body.appendChild(this.lockButton)

        this._countEnergy = document.createElement('div')
        this._countEnergy.classList.add('count-energy')
        document.body.appendChild(this._countEnergy)

        this._countEnergyInner = document.createElement('div')
        this._countEnergyInner.classList.add('count-energy-inner')
        this._countEnergyInner.classList.add('color-blue')
        this._countEnergy.appendChild(this._countEnergyInner)
    }

    toggleVisibleLock (visible) {
        this.lockButton.style.display = visible ? 'flex' : 'none'
    }

    setEnergyLevel (val) {
        const obj = { v: this._currentEnergyMinWidth }
        new TWEEN.Tween(obj)
            .interpolation(TWEEN.Interpolation.Linear)
            .to({ v: val }, 300)
            .onUpdate(() => {
                this._countEnergyInner.style.minWidth = obj.v * ENERGY_MAX_WIDTH + 'vw'
            })
            .onComplete(() => {
                this._currentEnergyMinWidth = val
                this._countEnergyInner.classList.remove('color-blue')
                this._countEnergyInner.classList.remove('color-yellow')
                if (val === 1) {
                    this._countEnergyInner.classList.add('color-yellow')
                } else {
                    this._countEnergyInner.classList.add('color-blue')
                }
            })
            .start()
    }
}