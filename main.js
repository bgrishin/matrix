const matrix = document.getElementById('matrix')
const ctx = matrix.getContext('2d')

matrix.width = window.innerWidth
matrix.height = window.innerHeight

let color = '#00ff00'
let characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let random = Math.floor(Math.random() * characters.length)


let symbols = []

let text;
let scatter = 0.92

let fontSize = 10

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.x = x;
        this.y = y;
        this.canvasHeight = canvasHeight
    }
    draw(context){
        random = Math.floor(Math.random() * characters.length)
        text = characters[random]
        context.fillStyle = color
        if(!text) text = " "
        context.fillText(text, this.x * fontSize, this.y * fontSize)
        if (this.y * fontSize > this.canvasHeight && Math.random() > scatter) { //FaLLing
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.columns = this.canvasWidth  / fontSize
        this.#construct()
    }
    #construct() {
        for (let i = 0; i < this.columns; i++) {
            symbols[i] = new Symbol(i, 0, fontSize, this.canvasHeight)
        }
    }
}

const matrix_effect = new Effect(matrix.width, matrix.height)

function startAnimation() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)'
    ctx.fillRect(0,0,matrix.width, matrix.height)
    ctx.font = fontSize + 'px monospace'
    symbols.forEach(symbol => symbol.draw(ctx))
    requestAnimationFrame(startAnimation);
}

startAnimation()


function showMenu() {
    document.getElementById('menu').style.display = 'block'
}

function hideMenu() {
    document.getElementById('menu').style.display = 'none'
}

function updateCharacters() {
    characters = document.getElementById('symbols').value
    console.log(characters)
}

function changeScatter() {
    document.getElementById('scatter_label').innerText = document.getElementById('scatter').value
    scatter = document.getElementById('scatter').value
}

function changeFontSize() {
    document.getElementById('fontsize_label').innerText = document.getElementById('fontsize').value
    fontSize = document.getElementById('fontsize').value
}