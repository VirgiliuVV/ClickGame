import {BaseElement} from "./baseElement.mjs";

export class ChangeElement extends BaseElement {
    constructor(game) {
        super(game);
    }

    spawnElement() {
        super.spawnElement();
        this.element.style.background = 'green';
        this.radius = Math.floor(Math.random()*100)+100;
        this.colorCycleInterval = Math.floor(Math.random()*3000)+2000;
        this.centerX = Math.floor(Math.random()*(document.body.clientWidth-this.radius*2-this.size-20))+this.radius+10
        this.centerY = Math.floor(Math.random()*(document.body.clientHeight-this.radius*2-this.size-20))+this.radius+10
        const initialAngle = Math.random() * 360;
        const initialPosition = this.calculatePosition(initialAngle);
        this.element.style.left = initialPosition.x + 'px';
        this.element.style.top = initialPosition.y + 'px';
        this.startMoving();
        this.changeColorCycle()
    }

    calculatePosition(angle) {
        const radians = angle * (Math.PI / 180);
        const x = this.centerX + this.radius * Math.cos(radians);
        const y = this.centerY + this.radius * Math.sin(radians);
        return { x, y };
    }

    changeColorCycle() {
        setInterval(()=>{
            if (this.element.style.background === 'green') {
                this.element.style.background = 'red'
            }  else this.element.style.background = 'green'

        },this.colorCycleInterval)
    }

    startMoving() {
        let currentAngle = 0;

        setInterval(() => {
            const newPosition = this.calculatePosition(currentAngle);

            this.element.style.left = newPosition.x + 'px';
            this.element.style.top = newPosition.y + 'px';

            currentAngle += this.speed;

            if (currentAngle === 360) {
                currentAngle = 0;
            }
        }, this.interval);
    }
}