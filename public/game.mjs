import {CollectElement} from "./collectElement.mjs";
import {ChangeElement} from "./changeElement.mjs";
import {AvoidElement} from "./avoidElement.mjs";

export class Game {

    constructor() {
        this.clearScreen()
        this.totalElements = 0;
        this.avoidElement = 0;
        this.initializeElements(CollectElement, 3);
        this.initializeElements(ChangeElement, 3);
        this.initializeAvoidElements(AvoidElement, 3);
        this.timerOn();
    }

    initializeElements(elementClass, count) {
        for (let i = 0; i < count; i++) {
            this.totalElements++;
            new elementClass(this);
        }
    }

    initializeAvoidElements(elementClass, count) {
        for (let i = 0; i < count; i++) {
            this.totalElements++;
            this.avoidElement++;
            new elementClass(this);
        }
    }

    clearScreen() {
        document.body.innerHTML = '';
    }

    async gameWin() {
        this.yourTime = this.time
        this.timerOff()
        this.clearScreen();
        //create and place the logo of wining image
        this.winLogo()

        const table = this.createTable('TOP LIST!');
        document.body.appendChild(table);

        try {
            const topList = await this.getData()
            for (let i = 0; i < 10; i++) {
                const name = topList[i]?.name || ''
                const time = topList[i]?.time ? (topList[i].time / 100).toFixed(2) : ''
                const listElement = this.createList(name, time, i)

                table.appendChild(listElement)
            }

            this.createMessage(table, `Your Time is: ${(this.yourTime / 100).toFixed(2)}s`);
            this.createInputBox(table);
            this.playAgainButton(table)
        } catch (error) {
            console.error(error)
        }

    }


    winLogo() {
        const winImage = document.createElement('img')
        winImage.style.width = '130px'
        winImage.src = '/img/win.png'
        winImage.style.marginTop = '10px'

        document.body.appendChild(winImage)
    }

    createList(name, time, index) {
        const tableDataBox = document.createElement('div')
        tableDataBox.style.fontFamily = 'Montserrat'
        tableDataBox.style.fontSize = '14px'
        tableDataBox.style.padding = '5px'
        tableDataBox.style.borderBottom = "1px solid #b2b2b2"
        tableDataBox.style.minHeight = "17px"
        tableDataBox.style.display = "flex"
        tableDataBox.style.justifyContent = "space-between"

        const nameBox = document.createElement('div')
        nameBox.innerHTML = index + 1 + '. ' + name
        tableDataBox.appendChild(nameBox)

        const timeBox = document.createElement('div')
        timeBox.innerHTML = time
        timeBox.style.fontWeight = 'bold'
        tableDataBox.appendChild(timeBox)

        return tableDataBox
    }

    createTable(title) {
        const table = document.createElement('div');
        table.style.width = '300px';
        table.style.padding = '20px';
        table.style.marginBottom = '30px';
        table.style.marginTop = '30px';
        table.style.backgroundColor = '#dfdfdf';
        table.style.border = '2px solid black';
        table.style.boxShadow = '4px 4px 15px #959595';
        table.style.borderRadius = '20px';
        table.style.minHeight = '416px';

        const tableTitle = document.createElement('div');
        tableTitle.style.fontWeight = 'bold';
        tableTitle.style.fontFamily = 'Montserrat';
        tableTitle.style.fontSize = '25px';
        tableTitle.innerHTML = title;
        tableTitle.style.textAlign = 'center';
        tableTitle.style.lineHeight = tableTitle.style.height;
        tableTitle.style.borderBottom = '1px solid #b2b2b2';
        tableTitle.style.padding = '10px';
        table.appendChild(tableTitle);

        return table;
    }

    createMessage(parent, text) {
        const message = document.createElement('div');
        message.innerHTML = text;
        message.style.textAlign = 'center';
        message.style.padding = '5px';
        parent.appendChild(message);
    }

    createInputBox(parent) {
        const inputBox = document.createElement('div');
        inputBox.style.fontFamily = 'Montserrat'
        inputBox.style.fontSize = '14px'
        inputBox.style.padding = '15px'
        inputBox.style.marginLeft = '10px'
        inputBox.style.marginRight = '10px'
        inputBox.style.minHeight = "17px"
        inputBox.style.display = "flex"
        inputBox.style.justifyContent = "space-between"
        inputBox.style.alignItems = "center"
        parent.appendChild(inputBox)

        const inputField = document.createElement('input');
        inputField.type = "text";
        inputField.style.width = "60%";
        inputField.style.height = "25px";
        inputField.style.paddingLeft = "5px";
        inputField.style.borderRadius = "5px";
        inputField.style.boxShadow = "2px 2px 5px #959595";
        inputField.maxLength = 20

        const addButton = document.createElement('button');
        addButton.textContent = "ADD";
        addButton.style.width = "60px";
        addButton.style.height = "25px";
        addButton.style.borderRadius = "5px";
        addButton.style.backgroundColor = "#add8e6";
        addButton.style.boxShadow = "2px 2px 5px #959595";


        addButton.addEventListener('mouseenter', () => {
            addButton.style.backgroundColor = "#acbae6";
            addButton.style.cursor = 'pointer'
        })
        addButton.addEventListener('mouseleave', () => {
            addButton.style.backgroundColor = "#add8e6";
        })

        addButton.addEventListener('click', async () => {
            const username = inputField.value
            if (username.trim()) {
                await this.postData({name: username, time: this.yourTime});

                this.clearScreen();
                this.winLogo()

                const table = this.createTable('TOP LIST!')
                document.body.appendChild(table)

                this.playAgainButton(table)

                try {
                    const fetchedList = await this.getData()
                    for (let i = 0; i < 10; i++) {
                        const name = fetchedList[i]?.name || ''
                        const time = fetchedList[i]?.time ? (fetchedList[i].time / 100).toFixed(2) : ''
                        const listElement = this.createList(name, time, i)

                        table.appendChild(listElement)
                    }
                } catch (error) {
                    console.error(error)
                }


            } else console.log('error name')
        })


        inputBox.appendChild(inputField);
        inputBox.appendChild(addButton);
        parent.appendChild(inputBox);
    }

    async getData() {
        const response = await fetch('/getTopList', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    }

    async postData(data = {}) {
        const response = await fetch('/createData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response;
    }


    gameOver() {
        this.clearScreen()
        const gameOverImage = document.createElement('img')
        gameOverImage.src = './img/gameOver.png'
        gameOverImage.style.width = '600px'
        gameOverImage.style.marginTop = '300px'
        gameOverImage.style.marginBottom = '100px'
        document.body.appendChild(gameOverImage)

        this.playAgainButton(gameOverImage)
    }

    playAgainButton() {
        const playAgain = document.createElement('div')
        playAgain.style.width = "500px";
        playAgain.style.height = "70px";
        playAgain.style.backgroundColor = "lightblue";
        playAgain.style.textAlign = "center";
        playAgain.style.border = "2px solid gray";
        playAgain.style.boxShadow = "3px 3px 10px black";
        playAgain.style.fontSize = "40px";
        playAgain.style.fontWeight = 'bold'
        playAgain.style.fontFamily = 'Montserrat'
        playAgain.style.borderRadius = '50px'
        playAgain.innerHTML = 'Play again'
        playAgain.style.lineHeight = playAgain.style.height;

        document.body.appendChild(playAgain)

        playAgain.addEventListener('mouseenter', () => {
            playAgain.style.backgroundColor = '#ACBAE6'
            playAgain.style.marginLeft = '3px'
            playAgain.style.marginTop = '3px'
            playAgain.style.cursor = 'pointer'
        })
        playAgain.addEventListener('mouseleave', () => {
            playAgain.style.backgroundColor = 'lightblue'
            playAgain.style.marginLeft = '0'
            playAgain.style.marginTop = '0'
        })

        playAgain.addEventListener('click', () => {
            this.clearScreen()
            new Game();
        })
    }

    timerOn() {

        const timerScore = document.createElement('div')
        timerScore.style.fontSize = "40px";
        timerScore.style.fontWeight = 'bold'
        timerScore.style.fontFamily = 'Montserrat'
        timerScore.innerHTML = 'Time: 0'
        timerScore.style.position = 'absolute'
        timerScore.style.right = '100px'
        document.body.appendChild(timerScore)

        this.time = 0
        this.timerInterval = setInterval(() => {
            this.time++;
            const formattedTime = (this.time / 100).toFixed(2);
            timerScore.innerHTML = 'Time: ' + formattedTime;
        }, 10)
    }

    timerOff() {
        clearInterval(this.timerInterval);
    }
}