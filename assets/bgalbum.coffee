$ = jQuery

rainbowColor = {
  red: '#FF0000',
  yellow: '#FFFF00',
  green: '#00FF00',
  blue: '#0000FF',
  indigo: '#4B0082',
  violet: '#8B00FF'
}

rainbowArray = ['#FF0000', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF']

$(document).ready ->
  $('.nav').hide()
  $("body").keypress ->
    $(".back").css 'background-color', rainbowArray[Math.floor(Math.random()*7)]
    $(".back").css 'opacity', '0.8'

# two = new Two(
#   fullscreen: true
#   autostart: true
# ).appendTo(document.body)
# rect = two.makeRectangle(two.width / 2, two.height / 2, 50, 50)
# two.bind "update", ->
#   rect.scale = 0.7
#   return

elem = document.getElementById("draw-animation")
two = new Two(
  # width: 285
  # height: 200
).appendTo(elem)
circle = two.makeCircle(-70, 0, 50)
rect = two.makeRectangle(70, 0, 100, 100)
circle.fill = "#FF8000"
rect.fill = "rgba(0, 200, 255, 0.75)"
group = two.makeGroup( rect)
group.translation.set two.width / 2, two.height / 2
group.scale = 0
group.noStroke()

two.bind("update", (frameCount) -> # Finally, start the animation loop
  group.scale = group.rotation = 0  if group.scale > 0.9999
  # t = (1 - group.scale) * 0.125
  t = (1 - group.scale) * 0.1
  group.scale += t
  group.rotation += t * 4 * Math.PI
  return
).play()


