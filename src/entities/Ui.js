export class Ui {
    init (root) {
        this.lock = document.createElement('div')
        this.lock.classList.add('butt-lock')
        this.lock.classList.add('control-small')
        this.lock.style.display = 'none'
        document.body.appendChild(this.lock)
    }

    toggleVisibleLock (visible) {
        this.lock.style.display = visible ? 'flex' : 'none'
    }
}