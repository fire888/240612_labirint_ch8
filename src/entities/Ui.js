export class Ui {
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
        this._countEnergyInner.style.minWidth = val * (30) + 'vw'
    }

    setEnergyYellow () {
        this._countEnergyInner.classList.remove('color-blue')
        this._countEnergyInner.classList.add('color-yellow')
    }
}