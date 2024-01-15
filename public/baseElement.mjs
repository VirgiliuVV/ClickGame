export class BaseElement {
    constructor(game) {
        this.game = game
        this.direction = !!Math.floor(Math.random()*2)? 1 : -1;
        this.interval = 50;
        this.speed = Math.floor(Math.random()*3)+1;
        this.size = Math.floor(Math.random() * 50) + 40;
    }

    spawnElement() {
        this.element = document.createElement('div')
        this.element.style.position = 'absolute'
        this.element.style.height = `${this.size}px`;
        this.element.style.width = `${this.size}px`;
        this.element.style.border = `2px solid black`;
        this.element.style.borderRadius = '5px'

        this.element.addEventListener('mouseenter', ()=>{
            this.element.style.border = "5px solid black"
        })
        this.element.addEventListener('mouseleave', ()=>{
            this.element.style.border = "2px solid black"
        })
        this.element.addEventListener('click', ()=>{
            if (this.element.style.background==='green') {
                this.element.style.display = 'none'
                this.game.totalElements--
                if (this.game.totalElements === this.game.avoidElement) {
                    this.game.gameWin()
                }
            } else {
                this.game.gameOver()
            }
        })

        document.body.appendChild(this.element)
    }

    greenCheck() {
        this.game.elements.forEach()
    }
}