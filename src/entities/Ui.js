export class Ui {
    init (root) {
        this.lock = document.createElement('div')
        this.lock.classList.add('lock')
        this.lock.classList.add('phone-control')
        this.lock.innerHTML = 'LOCK'
        document.body.appendChild(this.lock)
    }
}