let dpi = window.devicePixelRatio
let canvas = document.getElementById('canvas')

const PIXEL = 10
const PIXEL2 = 15

const styleHeight = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2)
const styleWidth = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2)
console.log(styleWidth, 999)

function fixDpi() {
  canvas.setAttribute('height', styleHeight * dpi)
  canvas.setAttribute('width', styleWidth * dpi)
}

function dot(x, y) {
  ctx.fillRect(x, y, PIXEL, PIXEL)
}

function dot2(x, y) {
  ctx.fillRect(x, y, PIXEL2, PIXEL2)
}

fixDpi()

var ctx = canvas.getContext('2d')

// Background
ctx.fillStyle = '#263787'
for (let x = 0, xj = styleWidth * dpi; x < xj; x = x + PIXEL) {
  ctx.fillRect(x, 0, PIXEL, PIXEL)
  for (let y = 0, yj = styleHeight * dpi; y < yj; y = y + PIXEL) {
    ctx.fillRect(x, y, PIXEL, PIXEL)
  }
}

// Random fill bg
ctx.fillStyle = '#3f65a5'
let fillBgColors = ['#466da9', '#273586', '#8095b2', '#2b3b97', '#273e6e', '#22308e', '#274085']

for(let i = 0; i< 1000; i++){
  let randomColor = fillBgColors[Math.floor(Math.random() * fillBgColors.length)]
  let randomX = Math.floor(Math.random() * (styleWidth * dpi / PIXEL))
  let randomY = Math.floor(Math.random() * (styleHeight * dpi / PIXEL))
  ctx.fillStyle = randomColor
  console.log(randomColor, randomX, randomY, 999)
  dot(randomX * 10, randomY * 10)
  if (randomY % 2) {
    dot(randomX * 10 + 10, randomY * 10)
  }
}

// Under Construction
ctx.fillStyle = '#ffe800'

// U
dot(100, 100)
dot(100, 110)
dot(100, 120)
dot(100, 130)
dot(110, 140)
dot(120, 140)
dot(130, 140)
dot(130, 100)
dot(130, 110)
dot(130, 120)
dot(130, 130)

// N
dot(150, 100)
dot(150, 110)
dot(150, 120)
dot(150, 130)
dot(150, 140)
dot(160, 110)
dot(170, 120)
dot(180, 130)
dot(190, 100)
dot(190, 110)
dot(190, 120)
dot(190, 130)
dot(190, 140)

// D
dot(210, 100)
dot(210, 110)
dot(210, 120)
dot(210, 130)
dot(210, 140)
dot(220, 100)
dot(220, 140)
dot(230, 100)
dot(230, 140)
dot(240, 110)
dot(240, 120)
dot(240, 130)

// E
dot(260, 100)
dot(260, 110)
dot(260, 120)
dot(260, 130)
dot(260, 140)
dot(270, 100)
dot(280, 100)
dot(290, 100)
dot(260, 140)
dot(270, 140)
dot(280, 140)
dot(290, 140)
dot(270, 120)
dot(280, 120)

// R
dot(310, 100)
dot(310, 110)
dot(310, 120)
dot(310, 130)
dot(310, 140)
dot(320, 100)
dot(330, 100)
dot(310, 120)
dot(320, 120)
dot(330, 120)
dot(340, 120)
dot(340, 110)
dot(330, 130)
dot(340, 140)

// C
dot(400, 100)
dot(410, 100)
dot(420, 100)
dot(390, 110)
dot(390, 120)
dot(390, 130)
dot(400, 140)
dot(410, 140)
dot(420, 140)

// O
dot(450, 100)
dot(460, 100)
dot(440, 110)
dot(440, 120)
dot(440, 130)
dot(450, 140)
dot(460, 140)
dot(470, 120)
dot(470, 110)
dot(470, 130)

// N
dot(490, 100)
dot(490, 110)
dot(490, 120)
dot(490, 130)
dot(490, 140)
dot(500, 110)
dot(510, 120)
dot(520, 130)
dot(530, 100)
dot(530, 110)
dot(530, 120)
dot(530, 130)
dot(530, 140)

// S
dot(560, 100)
dot(570, 100)
dot(580, 100)
dot(550, 110)
dot(550, 120)
dot(560, 120)
dot(570, 120)
dot(580, 120)
dot(580, 130)
dot(580, 140)
dot(570, 140)
dot(560, 140)
dot(550, 140)

// T
dot(600, 100)
dot(610, 100)
dot(620, 100)
dot(630, 100)
dot(640, 100)
dot(620, 110)
dot(620, 120)
dot(620, 130)
dot(620, 140)

// R
dot(660, 100)
dot(660, 110)
dot(660, 120)
dot(660, 130)
dot(660, 140)
dot(670, 100)
dot(680, 100)
dot(660, 120)
dot(670, 120)
dot(680, 120)
dot(690, 120)
dot(690, 110)
dot(680, 130)
dot(690, 140)

// U
dot(710, 100)
dot(710, 110)
dot(710, 120)
dot(710, 130)
dot(720, 140)
dot(730, 140)
dot(740, 140)
dot(740, 100)
dot(740, 110)
dot(740, 120)
dot(740, 130)

// C
dot(770, 100)
dot(780, 100)
dot(790, 100)
dot(760, 110)
dot(760, 120)
dot(760, 130)
dot(770, 140)
dot(780, 140)
dot(790, 140)

// T
dot(810, 100)
dot(820, 100)
dot(830, 100)
dot(840, 100)
dot(850, 100)
dot(830, 110)
dot(830, 120)
dot(830, 130)
dot(830, 140)

// I
dot(870, 100)
dot(880, 100)
dot(890, 100)
dot(880, 110)
dot(880, 120)
dot(880, 130)
dot(880, 140)
dot(870, 140)
dot(890, 140)

// O
dot(920, 100)
dot(930, 100)
dot(910, 110)
dot(910, 120)
dot(910, 130)
dot(920, 140)
dot(930, 140)
dot(940, 120)
dot(940, 110)
dot(940, 130)

// N
dot(960, 100)
dot(960, 110)
dot(960, 120)
dot(960, 130)
dot(960, 140)
dot(970, 110)
dot(980, 120)
dot(990, 130)
dot(1000, 100)
dot(1000, 110)
dot(1000, 120)
dot(1000, 130)
dot(1000, 140)

