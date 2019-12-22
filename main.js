let dpi = window.devicePixelRatio
let canvas = document.getElementById('canvas')

const PIXEL = 10
const PIXEL2 = 15

const styleHeight = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2)
const styleWidth = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2)

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

function makeRow(x, y, count) {
  for (let i = 0; i < count * PIXEL; i = i + PIXEL) {
    dot(x + i, y)
  }
}

function makeColumn(x, y, count) {
  for(let i = 0; i < count * PIXEL; i = i + PIXEL) {
    dot(x, y + i)
  }
}

function makeCross(x, y, count) {
  for (let i = 0; i < count * PIXEL; i = i + PIXEL) {
    dot(x + i, y)
  }
  for(let i = -count * PIXEL; i < count * PIXEL; i = i + PIXEL) {
    dot((2 * x + count * PIXEL) / 2, y + i)
  }
}

function makeRound(x, y, radius) {
  for (let i = 0; i < radius; i++, x--, y++) {
    makeRow(x, y, radius + i)
  }
}

function rounding(nu) {
  console.log(nu)
  // if (typeof nu === 'string') {
  // }
  if (+nu.toString().substr(-1) >= 5) {
    return nu + (PIXEL - +nu.toString().substr(-1))
  } else {
    return nu - (+nu.toString().substr(-1))
  }
}

function storeGuess(event) {
  var x = event.offsetX;
  var y = event.offsetY;
  guessX = x * dpi
  guessY = y * dpi
  guessX = rounding(guessX)
  guessY = rounding(guessY)
  console.log("x coords: " + guessX + ", y coords: " + guessY);
  // if (+guessX.toString().substr(-1)) >= 5) {
  //   guessX = guessX + (PIXEL - +guessX.toString().slice(-2))
  // } else {
  //   guessX
  // }
  // ctx.fillStyle = '#000'
  // dot(guessX, guessY)
  // document.getElementById('ttt').innerHTML += `dot(${guessX}, ${guessY})\n`
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
  dot(randomX * 10, randomY * 10)
  if (randomY % 2) {
    dot(randomX * 10 + 10, randomY * 10)
  }
}

// Stars
let starsColors = ['#ae9b2e', '#95a01c', '#b1a854', '#bea72a', '#ab7407']
for(let i = 0; i < 8; i++){
  let randomColor = starsColors[Math.floor(Math.random() * starsColors.length)]
  let randomX = Math.floor(Math.random() * (styleWidth * dpi / PIXEL))
  let randomY = Math.floor(Math.random() * (styleHeight / 2 / PIXEL))
  ctx.fillStyle = randomColor
  dot(randomX * 10, randomY * 10)
  dot(randomX * 10, randomY * 10 - 10)
  dot(randomX * 10, randomY * 10 + 10)
  dot(randomX * 10 + 10, randomY * 10)
  dot(randomX * 10 - 10, randomY * 10)
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

// Werder bremen

ctx.fillStyle = '#179152'

for (let i = 0; i < 8; i++) {
  dot(200 - i * 20, 800 + i * 30)
  dot(190 - i * 20, 810 + i * 30)
  dot(190 - i * 20, 820 + i * 30)
}
dot(210, 810)
for (let i = 0; i < 8; i++) {
  dot(210 + i * 20, 820 + i * 30)
  dot(220 + i * 20, 830 + i * 30)
  dot(220 + i * 20, 840 + i * 30)
}

dot(40, 1050)
dot(50, 1060)
for (let i = 0; i < 7; i++) {
  dot(60 + i * 20, 1070 + i * 30)
  dot(60 + i * 20, 1080 + i * 30)
  dot(70 + i * 20, 1090 + i * 30)
}
dot(200, 1280)
for (let i = 0; i < 8; i++) {
  dot(210 + i * 20, 1270 - i * 30)
  dot(220 + i * 20, 1260 - i * 30)
  dot(220 + i * 20, 1250 - i * 30)
}

ctx.fillStyle = '#fff'
dot(200, 810)
dot(200, 820)

for (let i = 0; i < 7; i++) {
  dot(190 - i * 20, 830 + i * 30)
  dot(190 - i * 20, 840 + i * 30)
  dot(180 - i * 20, 840 + i * 30)
  dot(180 - i * 20, 850 + i * 30)
}

for (let i = 0; i < 8; i++) {
  dot(50 + i * 20, 1040 + i * 30)
  dot(50 + i * 20, 1050 + i * 30)
  dot(60 + i * 20, 1050 + i * 30)
  dot(60 + i * 20, 1060 + i * 30)
}

for (let i = 0; i < 8; i++) {
  dot(200 + i * 20, 820 + i * 30)
  dot(200 + i * 20, 830 + i * 30)
  dot(210 + i * 20, 830 + i * 30)
  dot(210 + i * 20, 840 + i * 30)
}

for (let i = 0; i < 8; i++) {
  dot(350 - i * 20, 1040 + i * 30)
  dot(350 - i * 20, 1050 + i * 30)
  dot(340 - i * 20, 1050 + i * 30)
  dot(340 - i * 20, 1060 + i * 30)
}

ctx.fillStyle = '#179152'
dot(200, 840)
makeRow(190, 850, 3)
makeRow(180, 860, 4)
makeRow(180, 870, 5)
makeRow(170, 880, 7)
makeRow(160, 890, 8)
makeRow(160, 900, 9)
makeRow(150, 910, 11)
makeRow(140, 920, 12)
makeRow(140, 930, 13)
makeRow(130, 940, 15)
makeRow(120, 950, 16)
makeRow(120, 960, 17)
makeRow(110, 970, 19)
makeRow(100, 980, 20)
makeRow(100, 990, 21)
makeRow(90, 1000, 23)
makeRow(80, 1010, 24)
makeRow(80, 1020, 25)
makeRow(70, 1030, 27)
makeRow(60, 1040, 28)
makeRow(70, 1050, 28)
makeRow(70, 1060, 27)
makeRow(80, 1070, 25)
makeRow(90, 1080, 23)
makeRow(90, 1090, 23)
makeRow(100, 1100, 21)
makeRow(110, 1110, 19)
makeRow(110, 1120, 19)
makeRow(120, 1130, 17)
makeRow(130, 1140, 15)
makeRow(130, 1150, 15)
makeRow(140, 1160, 13)
makeRow(150, 1170, 11)
makeRow(150, 1180, 11)
makeRow(160, 1190, 9)
makeRow(170, 1200, 7)
makeRow(170, 1210, 7)
makeRow(180, 1220, 5)
makeRow(190, 1230, 3)
makeRow(190, 1240, 3)
dot(200, 1250)

ctx.fillStyle = '#fff'
makeRow(190, 900, 4)
makeRow(180, 910, 6)
makeRow(170, 920, 8)
makeRow(170, 930, 8)
makeRow(170, 940, 9)
makeRow(180, 950, 8)
makeRow(230, 960, 4)
makeRow(240, 970, 3)
makeRow(240, 980, 3)

makeColumn(250, 980, 3)
makeColumn(260, 980, 16)
makeColumn(270, 980, 13)
makeColumn(280, 1010, 7)
makeColumn(250, 1080, 8)
// makeRow()

makeRow(140, 950, 3)
makeRow(130, 960, 5)
makeRow(120, 970, 6)
makeRow(120, 980, 6)
makeRow(120, 990, 5)

makeColumn(120, 1000, 6)
makeColumn(130, 1000, 10)
makeColumn(140, 1000, 14)
makeColumn(150, 1080, 8)

makeColumn(200, 1040, 9)
makeColumn(190, 1060, 9)
makeColumn(210, 1060, 9)
makeColumn(180, 1080, 9)
makeColumn(220, 1080, 9)
makeColumn(170, 1100, 9)
makeColumn(230, 1100, 9)
makeColumn(160, 1110, 7)
makeColumn(240, 1110, 7)

// The void
ctx.fillStyle = '#000'
let centerX = styleWidth * dpi / 2
let centerY = styleHeight * dpi /2
dot(centerX - 200, centerY + 280)
dot(centerX - 210, centerY + 270)
dot(centerX - 220, centerY + 270)
dot(centerX - 240, centerY + 280)
dot(centerX - 230, centerY + 280)
dot(centerX - 220, centerY + 280)
makeColumn(centerX - 410, centerY + 280, 2)
makeColumn(centerX - 400, centerY + 270, 3)
makeColumn(centerX - 390, centerY + 260, 6)
makeColumn(centerX - 380, centerY + 250, 8)
makeColumn(centerX - 370, centerY + 230, 10)
makeColumn(centerX - 360, centerY + 220, 12)
makeColumn(centerX - 350, centerY + 190, 16)
makeColumn(centerX - 340, centerY + 170, 20)
makeColumn(centerX - 330, centerY + 150, 26)
makeColumn(centerX - 330, centerY + 150, 26)
makeColumn(centerX - 320, centerY + 130, 29)
makeColumn(centerX - 310, centerY + 110, 33)
makeColumn(centerX - 300, centerY + 90, 36)
makeColumn(centerX - 290, centerY + 80, 37)
makeColumn(centerX - 280, centerY + 60, 40)
makeColumn(centerX - 270, centerY + 50, 43)
makeColumn(centerX - 260, centerY + 30, 44)
makeColumn(centerX - 250, centerY + 10, 45)
makeColumn(centerX - 240, centerY, 48)
makeColumn(centerX - 230, centerY - 40, 51)
makeColumn(centerX - 220, centerY - 20, 50)
makeColumn(centerX - 210, centerY - 10, 50)
makeColumn(centerX - 200, centerY + 10, 46)
makeColumn(centerX - 190, centerY + 50, 44)
makeColumn(centerX - 180, centerY + 60, 42)
makeColumn(centerX - 170, centerY + 80, 41)
makeColumn(centerX - 160, centerY + 100, 38)
makeColumn(centerX - 150, centerY + 90, 40)
makeColumn(centerX - 140, centerY + 80, 39)
makeColumn(centerX - 130, centerY + 70, 40)
makeColumn(centerX - 120, centerY + 50, 41)
makeColumn(centerX - 110, centerY + 60, 40)
makeColumn(centerX - 100, centerY + 50, 40)
makeColumn(centerX - 90, centerY + 30, 44)
makeColumn(centerX - 80, centerY + 20, 46)
makeColumn(centerX - 70, centerY + 10, 49)
makeColumn(centerX - 60, centerY + 20, 49)
makeColumn(centerX - 50, centerY, 50)
makeColumn(centerX - 40, centerY - 10, 50)
makeColumn(centerX - 30, centerY - 20, 52)
makeColumn(centerX - 20, centerY - 10, 52)
makeColumn(centerX - 10, centerY, 51)
makeColumn(centerX, centerY - 10, 53)
makeColumn(centerX + 10, centerY - 20, 55)
makeColumn(centerX + 20, centerY - 10, 52)
makeColumn(centerX + 30, centerY, 53)
makeColumn(centerX + 40, centerY - 10, 53)
makeColumn(centerX + 50, centerY - 20, 53)
makeColumn(centerX + 60, centerY - 30, 55)
makeColumn(centerX + 70, centerY - 40, 57)
makeColumn(centerX + 80, centerY - 30, 57)
makeColumn(centerX + 90, centerY - 40, 57)
makeColumn(centerX + 100, centerY - 30, 55)
makeColumn(centerX + 110, centerY - 20, 53)
makeColumn(centerX + 120, centerY - 10, 51)
makeColumn(centerX + 130, centerY, 50)
makeColumn(centerX + 140, centerY - 10, 52)
makeColumn(centerX + 150, centerY, 52)
makeColumn(centerX + 160, centerY + 10, 50)
makeColumn(centerX + 170, centerY + 0, 50)
makeColumn(centerX + 180, centerY + 40, 47)
makeColumn(centerX + 190, centerY + 30, 47)
makeColumn(centerX + 200, centerY + 30, 48)
makeColumn(centerX + 210, centerY + 33, 48)
makeColumn(centerX + 220, centerY + 31, 46)
makeColumn(centerX + 230, centerY + 29, 45)
makeColumn(centerX + 240, centerY + 20, 47)
makeColumn(centerX + 250, centerY + 10, 46)
makeColumn(centerX + 260, centerY + 20, 45)
makeColumn(centerX + 270, centerY + 30, 43)
makeColumn(centerX + 280, centerY + 40, 44)
makeColumn(centerX + 290, centerY + 50, 42)
makeColumn(centerX + 300, centerY + 20, 43)
makeColumn(centerX + 310, centerY + 10, 44)
makeColumn(centerX + 320, centerY, 44)
makeColumn(centerX + 330, centerY + 30, 41)
makeColumn(centerX + 340, centerY + 40, 39)
makeColumn(centerX + 350, centerY + 50, 39)
makeColumn(centerX + 360, centerY + 30, 39)
makeColumn(centerX + 370, centerY + 50, 35)
makeColumn(centerX + 380, centerY + 60, 33)
makeColumn(centerX + 390, centerY + 70, 33)
makeColumn(centerX + 400, centerY + 80, 30)
makeColumn(centerX + 410, centerY + 90, 28)
makeColumn(centerX + 420, centerY + 110, 25)
makeColumn(centerX + 430, centerY + 100, 27)
makeColumn(centerX + 440, centerY + 90, 27)
makeColumn(centerX + 450, centerY + 120, 25)
makeColumn(centerX + 460, centerY + 100, 25)
makeColumn(centerX + 470, centerY + 110, 25)
makeColumn(centerX + 480, centerY + 140, 23)
makeColumn(centerX + 490, centerY + 130, 23)
makeColumn(centerX + 500, centerY + 140, 22)
makeColumn(centerX + 510, centerY + 130, 22)
makeColumn(centerX + 520, centerY + 150, 19)
makeColumn(centerX + 530, centerY + 160, 18)
makeColumn(centerX + 540, centerY + 170, 16)
makeColumn(centerX + 550, centerY + 180, 15)
makeColumn(centerX + 560, centerY + 190, 13)
makeColumn(centerX + 570, centerY + 190, 11)
makeColumn(centerX + 580, centerY + 190, 10)
makeColumn(centerX + 590, centerY + 200, 8)
makeColumn(centerX + 600, centerY + 210, 5)
dot(centerX + 560, centerY + 180)
dot(centerX + 570, centerY + 180)
dot(centerX + 570, centerY + 170)
dot(centerX + 580, centerY + 170)
dot(centerX + 590, centerY + 170)
dot(centerX + 590, centerY + 160)
dot(centerX + 600, centerY + 160)
dot(centerX + 610, centerY + 160)

// Dark Side of The Moon
let line1 = '#d83343'
let line2 = '#e29325'
let line3 = '#fbe622'
let line4 = '#7fba45'
let line5 = '#67c0ce'
let line6 = '#7b648e'

ctx.fillStyle = line1
makeRow(centerX + 460, centerY + 210, 5)
makeRow(centerX + 400, centerY + 200, 9)
makeRow(centerX + 350, centerY + 190, 9)
makeRow(centerX + 300, centerY + 180, 8)
makeRow(centerX + 260, centerY + 170, 8)
makeRow(centerX + 210, centerY + 160, 8)
makeRow(centerX + 180, centerY + 150, 7)
makeRow(centerX + 140, centerY + 140, 6)
makeRow(centerX + 130, centerY + 130, 1)
ctx.fillStyle = line2
makeRow(centerX + 470, centerY + 230, 4)
makeRow(centerX + 410, centerY + 220, 10)
makeRow(centerX + 360, centerY + 210, 10)
makeRow(centerX + 320, centerY + 200, 8)
makeRow(centerX + 280, centerY + 190, 7)
makeRow(centerX + 240, centerY + 180, 6)
makeRow(centerX + 200, centerY + 170, 6)
makeRow(centerX + 170, centerY + 160, 5)
makeRow(centerX + 140, centerY + 150, 4)
ctx.fillStyle = line3
makeRow(centerX + 440, centerY + 240, 7)
makeRow(centerX + 490, centerY + 250, 2)
makeRow(centerX + 400, centerY + 230, 7)
makeRow(centerX + 350, centerY + 220, 6)
makeRow(centerX + 310, centerY + 210, 5)
makeRow(centerX + 270, centerY + 200, 5)
makeRow(centerX + 230, centerY + 190, 5)
makeRow(centerX + 200, centerY + 180, 4)
makeRow(centerX + 170, centerY + 170, 3)
makeRow(centerX + 150, centerY + 160, 3)
ctx.fillStyle = line4
makeRow(centerX + 500, centerY + 270, 1)
makeRow(centerX + 460, centerY + 260, 5)
makeRow(centerX + 430, centerY + 250, 6)
makeRow(centerX + 400, centerY + 240, 5)
makeRow(centerX + 350, centerY + 230, 6)
makeRow(centerX + 300, centerY + 220, 5)
makeRow(centerX + 260, centerY + 210, 5)
makeRow(centerX + 220, centerY + 200, 5)
makeRow(centerX + 190, centerY + 190, 4)
makeRow(centerX + 160, centerY + 180, 4)
makeRow(centerX + 140, centerY + 170, 3)
ctx.fillStyle = line5
makeRow(centerX + 480, centerY + 280, 3)
makeRow(centerX + 450, centerY + 270, 5)
makeRow(centerX + 420, centerY + 260, 4)
makeRow(centerX + 390, centerY + 250, 4)
makeRow(centerX + 340, centerY + 240, 6)
makeRow(centerX + 300, centerY + 230, 5)
makeRow(centerX + 260, centerY + 220, 4)
makeRow(centerX + 220, centerY + 210, 4)
makeRow(centerX + 180, centerY + 200, 4)
makeRow(centerX + 160, centerY + 190, 3)
ctx.fillStyle = line6
makeRow(centerX + 480, centerY + 300, 3)
makeRow(centerX + 440, centerY + 290, 7)
makeRow(centerX + 410, centerY + 280, 7)
makeRow(centerX + 380, centerY + 270, 7)
makeRow(centerX + 350, centerY + 260, 7)
makeRow(centerX + 320, centerY + 250, 7)
makeRow(centerX + 280, centerY + 240, 7)
makeRow(centerX + 230, centerY + 230, 7)
makeRow(centerX + 200, centerY + 220, 6)
makeRow(centerX + 170, centerY + 210, 5)
makeRow(centerX + 160, centerY + 200, 3)

// The triangle
ctx.fillStyle = '#9caaad'
dot(centerX + 120, centerY + 130)
dot(centerX + 120, centerY + 120)
dot(centerX + 110, centerY + 120)
dot(centerX + 110, centerY + 110)
dot(centerX + 110, centerY + 100)
dot(centerX + 100, centerY + 100)
dot(centerX + 100, centerY + 90)
dot(centerX + 90, centerY + 80)
dot(centerX + 90, centerY + 70)
dot(centerX + 80, centerY + 60)
dot(centerX + 80, centerY + 50)
dot(centerX + 70, centerY + 40)
dot(centerX + 70, centerY + 30)
dot(centerX + 60, centerY + 20)
dot(centerX + 60, centerY + 10)
dot(centerX + 50, centerY + 10)
dot(centerX + 50, centerY + 20)
dot(centerX + 130, centerY + 140)
dot(centerX + 130, centerY + 150)
dot(centerX + 140, centerY + 160)
dot(centerX + 140, centerY + 170)
dot(centerX + 150, centerY + 180)
dot(centerX + 150, centerY + 190)
dot(centerX + 160, centerY + 200)
dot(centerX + 160, centerY + 210)
dot(centerX + 170, centerY + 220)
dot(centerX + 170, centerY + 230)
dot(centerX + 180, centerY + 240)
dot(centerX + 180, centerY + 250)
dot(centerX + 190, centerY + 260)
dot(centerX + 190, centerY + 270)
dot(centerX + 200, centerY + 280)
dot(centerX + 200, centerY + 290)
dot(centerX + 210, centerY + 300)
dot(centerX + 210, centerY + 310)
dot(centerX + 220, centerY + 320)
dot(centerX + 230, centerY + 330)
dot(centerX + 230, centerY + 340)
makeRow(centerX - 120, centerY + 340, 36)
dot(centerX + 40, centerY + 30)
dot(centerX + 40, centerY + 40)
dot(centerX + 30, centerY + 50)
dot(centerX + 30, centerY + 60)
dot(centerX + 20, centerY + 70)
dot(centerX + 20, centerY + 80)
dot(centerX + 10, centerY + 90)
dot(centerX + 10, centerY + 100)
dot(centerX, centerY + 100)
dot(centerX, centerY + 110)
dot(centerX, centerY + 120)
dot(centerX - 10, centerY + 120)
dot(centerX - 10, centerY + 130)
dot(centerX - 20, centerY + 140)
dot(centerX - 20, centerY + 150)
dot(centerX - 30, centerY + 160)
dot(centerX - 30, centerY + 170)
dot(centerX - 40, centerY + 180)
dot(centerX - 40, centerY + 190)
dot(centerX - 50, centerY + 200)
dot(centerX - 50, centerY + 210)
dot(centerX - 60, centerY + 220)
dot(centerX - 60, centerY + 230)
dot(centerX - 70, centerY + 240)
dot(centerX - 70, centerY + 250)
dot(centerX - 80, centerY + 260)
dot(centerX - 80, centerY + 270)
dot(centerX - 90, centerY + 280)
dot(centerX - 90, centerY + 290)
dot(centerX - 100, centerY + 300)
dot(centerX - 100, centerY + 310)
dot(centerX - 110, centerY + 320)
dot(centerX - 120, centerY + 330)

ctx.fillStyle = '#4d6965'
dot(centerX - 120, centerY + 330)
dot(centerX - 100, centerY + 330)
dot(centerX - 100, centerY + 320)
dot(centerX - 90, centerY + 300)
dot(centerX + 220, centerY + 330)
for (let i = 0; i < 14; i++) {
  dot(centerX - 90 + i * PIXEL, centerY + 300 - i * 20)
}
for (let i = 0; i < 5; i++) {
  dot(centerX + 70 + i * PIXEL, centerY + 50 + i * 2 * PIXEL)
}
for (let i = 0; i < 10; i++) {
  dot(centerX + 120 + i * PIXEL, centerY + 140 + i * 2 * PIXEL)
}

ctx.fillStyle = '#6d8881'
dot(centerX - 110, centerY + 330)
dot(centerX + 50, centerY + 10)
dot(centerX - 100, centerY + 310)
dot(centerX - 70, centerY + 260)
dot(centerX - 30, centerY + 190)
dot(centerX + 50, centerY + 30)
dot(centerX + 60, centerY + 30)
// ctx.fillStyle = 'red'
dot(centerX + 20, centerY + 90)

ctx.fillStyle = '#37514e'
dot(centerX - 80, centerY + 290)
dot(centerX - 50, centerY + 230)
dot(centerX - 40, centerY + 210)
dot(centerX - 20, centerY + 170)
dot(centerX - 10, centerY + 150)
dot(centerX, centerY + 130)
dot(centerX + 10, centerY + 110)
dot(centerX + 30, centerY + 40)
dot(centerX + 50, centerY + 40)
dot(centerX - 90, centerY + 310)
dot(centerX + 180, centerY + 270)
dot(centerX + 170, centerY + 250)
dot(centerX + 150, centerY + 210)
dot(centerX + 140, centerY + 190)
dot(centerX + 120, centerY + 150)
dot(centerX + 200, centerY + 310)
dot(centerX + 190, centerY + 290)

ctx.fillStyle = '#1e322f'
dot(centerX - 70, centerY + 270)
dot(centerX - 60, centerY + 250)
dot(centerX + 10, centerY + 80)
dot(centerX + 20, centerY + 60)
dot(centerX + 60, centerY + 40)
dot(centerX + 160, centerY + 230)
dot(centerX + 130, centerY + 170)
makeRow(centerX - 90, centerY + 330, 31)

ctx.fillStyle = '#c0c0c1'
dot(centerX - 40, centerY + 160)

for (let i = 0; i < 11; i++) {
  makeRow(centerX - 70 - i * 3 * PIXEL, centerY + 170 + i * PIXEL, 3)
}

ctx.fillStyle = '#7c9091'
dot(centerX - 10, centerY + 160)
ctx.fillStyle = '#627973'
dot(centerX, centerY + 160)
dot(centerX, centerY + 170)
ctx.fillStyle = '#4c6457'
dot(centerX + 10, centerY + 160)
dot(centerX + 10, centerY + 170)
ctx.fillStyle = '#40574f'
dot(centerX + 20, centerY + 150)
dot(centerX + 20 , centerY + 160)
dot(centerX + 20 , centerY + 170)
ctx.fillStyle = '#4c6457'
dot(centerX + 30 , centerY + 150)
ctx.fillStyle = '#40574f'
dot(centerX + 30 , centerY + 160)
dot(centerX + 30 , centerY + 170)
ctx.fillStyle = '#283838'
dot(centerX + 40 , centerY + 150)
dot(centerX + 40 , centerY + 160)
dot(centerX + 40 , centerY + 170)
ctx.fillStyle = '#13191c'
dot(centerX + 50 , centerY + 150)
dot(centerX + 50 , centerY + 160)
dot(centerX + 50 , centerY + 170)
ctx.fillStyle = '#121617'
dot(centerX + 50 , centerY + 180)

// ctx.fillStyle = 'red'
