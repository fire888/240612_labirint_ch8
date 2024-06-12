export class Ticker {
    constructor() {
        this.updates = []
        this.isRunning = false
    }

    start () {
        this.isRunning = true
        this.tick()
    }

    tick () {
        if (!this.isRunning) {
            return
        }

        requestAnimationFrame(this.tick.bind(this))
        for (let i = 0; i < this.updates.length; ++i) {
            this.updates[i]()
        }
    }

    on (f) {
        this.updates.push(f)
        return () => {
            this.updates.filter(item => item !== f)
        }
    }
}
