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


// Dark Side of The Moon
//

ctx.fillStyle = '#000'
// let centerX = 1050
// let centerY = 800

// Math.floor(Math.random() * (max - min + 1) + min)
// for (let i = 0; i < 300; i++) {
//   let randomX = Math.floor(Math.random() * 501) + 800
//   let randomY = Math.floor(Math.random() * 301) + 600
//   let randomLength = Math.floor(Math.random() * 1) + 36
//   makeColumn(randomX, randomY, randomLength)
//   if (randomX % 2) {
//     makeColumn(randomX, randomY, randomLength)
//   } else {
//     makeRow(randomX, randomY, randomLength)
//   }
//   // makeRow(randomX, randomY, randomLength)
// }
// for (let x = 1600; x < 1800; x = x + PIXEL) {
//   for (let y = 400; y < 600; y = y + PIXEL) {
//     dot(x, y)
//   }
// }

// makeCross(1600, 400, 30)
// makeCross(1600, 1810, 21)

let line1 = '#fe0100'
let line2 = '#fb872a'
let line3 = '#feff01'
let line4 = '#65cd00'
let line5 = '#03cbff'
let line6 = '#a0319d'

ctx.fillStyle = line1
dot(1990, 600)
dot(1990, 610)
ctx.fillStyle = line2
dot(1990, 620)
dot(1990, 630)
ctx.fillStyle = line3
dot(1990, 640)
dot(1990, 650)
ctx.fillStyle = line4
dot(1990, 660)
dot(1990, 670)
ctx.fillStyle = line5
dot(1990, 680)
dot(1990, 690)
ctx.fillStyle = line6
dot(1990, 700)
dot(1990, 710)

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
