import * as TWEEN from '@tweenjs/tween.js'
import { pause } from './_helpers'

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

    async showFinalPage () {
        const showByTransition = (elem, time) => {
            return new Promise(res => {
                const obj = { v: 0 }
                this._tweenSpeedLeft = new TWEEN.Tween(obj)
                    .interpolation(TWEEN.Interpolation.Linear)
                    .to({ v: 1 }, time)
                    .onUpdate(() => {
                        elem.style.opacity = obj.v
                    })
                    .onComplete(() => {
                        res()
                    })
                    .start()
            })
        } 

        this._countEnergy.style.display = 'none'

        const wrapper = document.createElement('div')
        wrapper.style.opacity = 0
        wrapper.classList.add('final-page')
        
        // top mess **************************/
        const complete = document.createElement('div')
        complete.innerHTML = 'You are done'
        complete.style.opacity = 0
        wrapper.appendChild(complete)

        const complete2 = document.createElement('div')
        complete2.innerHTML = 'Thank you for playing'
        complete2.style.opacity = 0
        wrapper.appendChild(complete2)

        // offset ****************************/
        const offset = document.createElement('div')
        offset.classList.add('height-20px')
        wrapper.appendChild(offset)

        // mess prev *************************/
        const prev = document.createElement('div')
        prev.innerHTML = 'Previous chapters:'
        prev.style.opacity = 0
        wrapper.appendChild(prev)

        // list chapters *********************/
        const LIST = []
        for (let i = 1; i < 10; ++i) {
            LIST.push([i, './../chapter0' + i + '/', 'Chapter ' + i])
        }
        LIST[LIST.length - 1].push('current chapter')

        const list = document.createElement('div')
        list.style.opacity = 0

        const createListElem = (n, link, text, additionalText = null) => {
            const l = document.createElement('div')

            const num = document.createElement('span')
            num.innerHTML = n + '.&nbsp;&nbsp;'
            l.appendChild(num)

            if (link) {
                const a = document.createElement('a')
                a.href = link
                a.innerText = text
                l.appendChild(a)
            }

            if (additionalText) {
                const add = document.createElement('span')
                add.innerHTML = '&nbsp;&nbsp;&nbsp;' + additionalText
                l.appendChild(add)
            }

            return l
        }

        for (let i = 0; i < LIST.length; ++i) {
            const elem = createListElem(...LIST[i])
            list.appendChild(elem)
        }

        wrapper.appendChild(list)

        // offset ****************************/
        const offset2 = document.createElement('div')
        offset2.classList.add('height-20px')
        wrapper.appendChild(offset2)

        // offset ****************************/
        const offset3 = document.createElement('div')
        offset3.classList.add('height-20px')
        wrapper.appendChild(offset3)

        // bottom mess ************************/
        const bottom = document.createElement('div')
        bottom.style.opacity = 0
        bottom.innerHTML = 'Next chapter comming soon'
        wrapper.appendChild(bottom)

        // bb mess ***************************/
        const bottom1 = document.createElement('div')
        bottom1.style.opacity = 0
        bottom1.innerHTML = 'To be continued'
        wrapper.appendChild(bottom1)

        document.body.appendChild(wrapper)

        await pause(300)
        await showByTransition(wrapper, 300)

        await pause(300)
        await showByTransition(complete, 300)

        await pause(300)
        await showByTransition(complete2, 300)

        await pause(300)
        await showByTransition(prev, 300)

        await pause(300)
        await showByTransition(list, 300)

        await pause(300)
        await showByTransition(bottom, 300)

        await pause(500)
        await showByTransition(bottom1, 300)
    }
}