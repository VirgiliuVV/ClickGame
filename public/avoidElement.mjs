import {BaseElement} from "./baseElement.mjs";

export class AvoidElement extends BaseElement {
    constructor(game) {
        super(game);
    }

    spawnElement() {
        super.spawnElement();
        this.element.style.borderRadius = '50%'
        this.element.style.background = 'red'

        if (this.direction === 1) {
            this.element.style.left = Math.floor(Math.random() * (document.body.clientWidth - Math.floor(3000/this.interval)*this.speed*2 - this.size - 20)) + 10 + 'px';
        } else {
            this.element.style.left = Math.floor(Math.random() * (document.body.clientWidth - Math.floor(3000/this.interval)*this.speed*2 - this.size - 20)) + Math.floor(3000/this.interval)*this.speed*2 + 10 + 'px';
        }
        this.element.style.top = Math.floor(Math.random() * (document.body.clientHeight - this.size - 30)) + 10 + 'px';
        this.startMoving()
    }

    startMoving() {
        let currentTime = 0;

        setInterval(() => {
            const currentPosition = parseInt(this.element.style.left)
            const newLeft = currentPosition + this.speed * 2 * this.direction;

            this.element.style.left = newLeft + 'px'
            currentTime += this.interval
            if (currentTime === 3000) {
                this.direction *= -1
                currentTime = 0
            }
        }, this.interval)
    }
}