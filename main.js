var can = document.getElementById('my-canvas')

function resizeCanvas() {
  can.style.width = window.innerWidth + 'px'
  setTimeout(function() {
    can.style.height = window.innerHeight + 'px'
  }, 0)
}

window.onresize = resizeCanvas

resizeCanvas()

var ctx = can.getContext('2d')
ctx.font = '10px serif'
ctx.fillText('Under Construction', 10, 50)
