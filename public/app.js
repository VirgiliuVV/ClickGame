import {Game} from "./game.mjs";

const startButton = document.createElement("div")
const logoImage = document.createElement('img')

//button styling
startButton.style.width = "500px";
startButton.style.height = "70px";
startButton.style.backgroundColor = "lightblue";
startButton.style.textAlign = "center";
startButton.style.border = "2px solid gray";
startButton.style.boxShadow = "3px 3px 10px black";
startButton.style.fontSize = "40px";
startButton.style.fontWeight = 'bold'
startButton.style.fontFamily = 'Montserrat'
startButton.style.borderRadius = '50px'
startButton.innerHTML = 'CLICK ME TO START!'
startButton.style.lineHeight = startButton.style.height;

//gif logo image
logoImage.style.height = '300px'
logoImage.style.paddingBottom = '50px'
logoImage.style.paddingTop = '50px'
logoImage.src='img/giphy.gif';

//body styling
document.body.style.height = "100vh"
document.body.style.overflow = "hidden"
document.body.style.margin = "0"
document.body.style.display = "flex"
document.body.style.alignItems = "center"
document.body.style.flexDirection = "column"
document.body.style.backgroundImage = "url(img/background.png)"
document.body.style.backgroundSize = "cover"
document.body.style.backgroundAttachment = "fixed";

//appending elements
document.body.appendChild(logoImage)
document.body.appendChild(startButton)

//hover effect
startButton.addEventListener('mouseenter', ()=>{
    startButton.style.backgroundColor = '#ACBAE6'
    startButton.style.marginLeft = '3px'
    startButton.style.marginTop = '3px'
})
startButton.addEventListener('mouseleave', ()=>{
    startButton.style.backgroundColor = 'lightblue'
    startButton.style.marginLeft = '0'
    startButton.style.marginTop = '0'
})

startButton.addEventListener('click', ()=> {
    startButton.style.display = 'none';
    logoImage.style.display = 'none';
    new Game();
})
