let dpi = window.devicePixelRatio
let canvas = document.getElementById('my-canvas')

function fixDpi() {
  let styleHeight = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2)
  //get CSS width
  let styleWidth = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2)
  //scale the canvas
  canvas.setAttribute('height', styleHeight * dpi)
  canvas.setAttribute('width', styleWidth * dpi)
}

fixDpi()

var ctx = canvas.getContext('2d')
ctx.font = '20px serif'
ctx.fillText('Under Construction', 10, 50)
