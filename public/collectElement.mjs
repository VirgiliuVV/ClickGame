import {BaseElement} from './baseElement.mjs';

export class CollectElement extends BaseElement {
    constructor(game) {
        super(game);
    }

    spawnElement() {
        super.spawnElement();
        this.element.style.width = `${this.size * 2}px`
        this.element.style.background = 'green'
        this.element.style.left = Math.floor(Math.random() * (document.body.clientWidth - this.size * 2 - 20)) + 20 + 'px'
        if (this.direction=== 1) {
            this.element.style.top = Math.floor(Math.random() * (document.body.clientHeight - this.size - 20 - Math.floor(2000/this.interval)*this.speed*2)) + 'px'
        } else {
            this.element.style.top = Math.floor(Math.random() * (document.body.clientHeight - this.size - 20 - Math.floor(2000/this.interval)*this.speed*2))+ Math.floor(2000/this.interval)*this.speed*2+ 'px'
        }
        this.startMoving()
    }

    startMoving() {
        let currentTime = 0;

        setInterval(() => {
            const currentPosition = parseInt(this.element.style.top)
            const newTop = currentPosition + this.speed*2 * this.direction;

            this.element.style.top = newTop+'px'
            currentTime+=this.interval
            if (currentTime ===2000) {
                this.direction*=-1
                currentTime = 0
            }
        }, this.interval)
    }
}