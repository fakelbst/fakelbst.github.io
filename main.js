const DPI = window.devicePixelRatio
const canvas = document.querySelector('canvas')

const styleHeight = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2)
const styleWidth = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2)

// const canvasHeight = styleHeight * DPI
// const canvasWidth = styleWidth * DPI
const canvasHeight = 494
const canvasWidth = 800

function fixDpi() {
  canvas.setAttribute('height', canvasHeight)
  canvas.setAttribute('width', canvasWidth)
}
fixDpi()

const ctx = canvas.getContext('2d')

let trigleColors = ["#CDCBD2", "#B3ADB9", "#B3ADB9", "#877283", "#735667", "#454655", "#A7A8CD", "#FFDADA", "#DEA3A4", "#474748", "#785B00", "#CFA616"]

// let trigleColors = ["#fbffff", "#ced8e1", "#b1ced7", "#a6ctxd2", "#a0b9c8", "#9ab0c0", "#8da2ae", "#8095a1", "#7e95a0", "#78919c", "#68858e", "#5e7e84", "#597674", "#496c68"]

function clear() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
}

let angle = 0, points = []
const H = 180
function createParticles() {
  let pos = { x: canvasWidth/2, y: canvasHeight/2 - 150 }
  for (let i = 0; i < 3; i++) {
    angle += 60;
    angle = (60 + angle) % 360;
    for (let ii = 0; ii < H; ii++) {
      let dotColorIndex = ~~(Math.random() * trigleColors.length)
      let dotColor = trigleColors[dotColorIndex]
      pos = getAngle(pos.x, pos.y, 300 + angle, 2);
      points.push({
        color: dotColor,
        x: pos.x,
        y: pos.y,
        firstX: pos.x,
        firstY: pos.y,
      })
    }
  }
}

function getAngle(x, y, angle, H) {
  var radians = angle * (Math.PI / 180);
  return { x: x + H * Math.cos(radians), y: y + H * Math.sin(radians) }
}

function drawT() {
  for(let i=0, j = points.length; i<j; i++) {
    ctx.beginPath()
    ctx.fillStyle = points[i].color
    ctx.arc(points[i].x, points[i].y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }
  ctx.stroke()
  requestAnimationFrame(update)
}

function update() {
  clear()
  let range = 5
  for(let i = 0, j = points.length; i<j; i++) {
    let dx = Math.random() - 0.5
    let dy = Math.random() - 0.5
    if (points[i].x > points[i].firstX + range) {
      dx = -Math.abs(dx)
    } else if (points[i].x < points[i].firstX - range) {
      dx = Math.abs(dx)
    }
    if (points[i].y > points[i].firstY + range) {
      dy = -Math.abs(dy)
    } else if (points[i].y < points[i].firstY - range) {
      dy = Math.abs(dy)
    }
    points[i].x += dx
    points[i].y += dy
  }
  drawT()
}

createParticles()
drawT()

