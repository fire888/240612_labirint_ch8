export class Ui {
    init (root) {
        this.lock = document.createElement('div')
        this.lock.classList.add('butt-lock')
        this.lock.classList.add('control-small')
        this.lock.style.display = 'none'
        document.body.appendChild(this.lock)

        this._countEnergy = document.createElement('div')
        this._countEnergy.classList.add('count-energy')
        document.body.appendChild(this._countEnergy)

        this._countEnergyInner = document.createElement('div')
        this._countEnergyInner.classList.add('count-energy-inner')
        this._countEnergyInner.classList.add('color-blue')
        this._countEnergy.appendChild(this._countEnergyInner)
    }

    toggleVisibleLock (visible) {
        this.lock.style.display = visible ? 'flex' : 'none'
    }

    setEnergyLevel (val) {
        this._countEnergyInner.style.minWidth = val * (30) + 'vw'
    }

    setEnergyYellow () {
        this._countEnergyInner.classList.remove('color-blue')
        this._countEnergyInner.classList.add('color-yellow')
    }
}