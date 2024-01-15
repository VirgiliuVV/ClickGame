import {CollectElement} from "./collectElement.mjs";
import {ChangeElement} from "./changeElement.mjs";
import {AvoidElement} from "./avoidElement.mjs";

// import {createData} from "../server.js";

export class Game {

    constructor() {
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
        const yourTime = this.time
        this.clearScreen();
        const winImage = document.createElement('img')
        winImage.style.width = '130px'
        winImage.src = '/img/win.png'
        winImage.style.marginTop = '10px'
        winImage.style.marginBottom = '20px'
        document.body.appendChild(winImage)

        const table = document.createElement('div')
        table.style.width = '300px'
        table.style.padding = '20px'
        table.style.marginBottom = '30px'
        table.style.backgroundColor = '#dfdfdf'
        table.style.border = '2px solid black'
        table.style.boxShadow = '4px 4px 15px #959595'
        table.style.borderRadius = '20px'
        table.style.minHeight = '416px'
        document.body.appendChild(table)

        this.playAgainButton(table)

        const tableTitle = document.createElement('div')
        tableTitle.style.fontWeight = 'bold'
        tableTitle.style.fontFamily = 'Montserrat'
        tableTitle.style.fontSize = '25px'
        tableTitle.innerHTML = 'TOP LIST!'
        tableTitle.style.textAlign = "center";
        tableTitle.style.lineHeight = tableTitle.style.height;
        tableTitle.style.borderBottom = "1px solid #b2b2b2"
        tableTitle.style.padding = "10px"
        table.appendChild(tableTitle)

        try {
            const topList = await this.getData()
            for (let i = 0; i < 10; i++) {
                const tableDataBox = document.createElement('div')
                tableDataBox.style.fontFamily = 'Montserrat'
                tableDataBox.style.fontSize = '14px'
                tableDataBox.style.padding = '5px'
                tableDataBox.style.borderBottom = "1px solid #b2b2b2"
                tableDataBox.style.minHeight = "17px"
                tableDataBox.style.display = "flex"
                tableDataBox.style.justifyContent = "space-between"
                table.appendChild(tableDataBox)

                const nameBox = document.createElement('div')
                nameBox.innerHTML = topList[i] ? i + 1 + '. ' + topList[i].name : ''
                tableDataBox.appendChild(nameBox)
                const timeBox = document.createElement('div')
                timeBox.innerHTML = topList[i] ? (topList[i].time / 100).toFixed(2) : ''
                timeBox.style.fontWeight = 'bold'
                tableDataBox.appendChild(timeBox)
            }
            const message = document.createElement('div')
            message.innerHTML = `Your Time is: ${(yourTime/100).toFixed(2)}s`
            message.style.textAlign = 'center'
            message.style.padding = '5px'
            table.appendChild(message)

            const inputBox = document.createElement('div')
            inputBox.style.fontFamily = 'Montserrat'
            inputBox.style.fontSize = '14px'
            inputBox.style.padding = '15px'
            inputBox.style.marginLeft = '10px'
            inputBox.style.marginRight = '10px'
            inputBox.style.minHeight = "17px"
            inputBox.style.display = "flex"
            inputBox.style.justifyContent = "space-between"
            inputBox.style.alignItems = "center"
            table.appendChild(inputBox)

            const inputField = document.createElement("input");
            inputField.type = "text";
            inputField.style.width = "60%";
            inputField.style.height = "25px";
            inputField.style.paddingLeft = "5px";
            inputField.style.borderRadius = "5px";
            inputField.style.boxShadow = "2px 2px 5px #959595";
            inputField.maxLength = 20

            const addButton = document.createElement("button");
            addButton.textContent = "ADD";
            addButton.style.width = "60px";
            addButton.style.height = "25px";
            addButton.style.borderRadius = "5px";
            addButton.style.backgroundColor = "#add8e6";



            addButton.style.boxShadow = "2px 2px 5px #959595";
            addButton.addEventListener('mouseenter', () => {
                addButton.style.backgroundColor = "#acbae6";
            })
            addButton.addEventListener('mouseleave', () => {
                addButton.style.backgroundColor = "#add8e6";
            })

            addButton.addEventListener('click', async () => {
                const username = inputField.value
                if (username.trim()) {
                    await this.postData({name: username, time: yourTime});

                    this.clearScreen();

                    const finalTable = document.createElement('div')
                    finalTable.style.width = '300px'
                    finalTable.style.padding = '20px'
                    finalTable.style.marginTop = '100px'
                    finalTable.style.marginBottom = '30px'
                    finalTable.style.backgroundColor = '#dfdfdf'
                    finalTable.style.border = '2px solid black'
                    finalTable.style.boxShadow = '4px 4px 15px #959595'
                    finalTable.style.borderRadius = '20px'
                    finalTable.style.minHeight = '416px'
                    document.body.appendChild(finalTable)

                    this.playAgainButton(finalTable)

                    const tableTitle = document.createElement('div')
                    tableTitle.style.fontWeight = 'bold'
                    tableTitle.style.fontFamily = 'Montserrat'
                    tableTitle.style.fontSize = '25px'
                    tableTitle.innerHTML = 'TOP LIST!'
                    tableTitle.style.textAlign = "center";
                    tableTitle.style.lineHeight = tableTitle.style.height;
                    tableTitle.style.borderBottom = "1px solid #b2b2b2"
                    tableTitle.style.padding = "10px"
                    finalTable.appendChild(tableTitle)

                    try {
                        const topList = await this.getData()
                        for (let i = 0; i < 10; i++) {
                            const tableDataBox = document.createElement('div')
                            tableDataBox.style.fontFamily = 'Montserrat'
                            tableDataBox.style.fontSize = '14px'
                            tableDataBox.style.padding = '5px'
                            tableDataBox.style.borderBottom = "1px solid #b2b2b2"
                            tableDataBox.style.minHeight = "17px"
                            tableDataBox.style.display = "flex"
                            tableDataBox.style.justifyContent = "space-between"
                            finalTable.appendChild(tableDataBox)

                            const nameBox = document.createElement('div')
                            nameBox.innerHTML = topList[i] ? i + 1 + '. ' + topList[i].name : ''
                            tableDataBox.appendChild(nameBox)
                            const timeBox = document.createElement('div')
                            timeBox.innerHTML = topList[i] ? (topList[i].time / 100).toFixed(2) : ''
                            timeBox.style.fontWeight = 'bold'
                            tableDataBox.appendChild(timeBox)
                        }
                    } catch (error) {
                        console.error(error)
                    }



                } else console.log('error name')
            })

            inputBox.appendChild(inputField)
            inputBox.appendChild(addButton)
        } catch (error) {
            console.error(error)
        }

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

    playAgainButton(gameOverImage) {
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
        })
        playAgain.addEventListener('mouseleave', () => {
            playAgain.style.backgroundColor = 'lightblue'
            playAgain.style.marginLeft = '0'
            playAgain.style.marginTop = '0'
        })

        playAgain.addEventListener('click', () => {
            playAgain.style.display = 'none';
            gameOverImage.style.display = 'none';
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
        setInterval(() => {
            this.time++;
            const formattedTime = (this.time / 100).toFixed(2);
            timerScore.innerHTML = 'Time: ' + formattedTime;
        }, 10)
    }
}