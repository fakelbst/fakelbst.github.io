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
    $(".back").css 'opacity', '0.95'
    a = make()
    # a.translation.set(two.width / 2, two.height / 2)
    # 
    uupdate(a)
    # a.velocity = new Two.Vector(Math.random() * 10, Math.random() * 10)
    # a.velocity.rotation = Math.random() * Math.PI  / 8
    # a.velocity.scale = Math.random() * 2
    # a.velocity.phase = 0
    # a.velocity.frequency = Math.random() * Math.PI / 32
    # a.rect = a.getBoundingClientRect()
    # a.translation.set(two.width / 2, two.height / 2)
    # two.scene.add(a)

uupdate =(a) ->
  a.velocity = new Two.Vector(Math.random() * 10, Math.random() * 10)
  a.velocity.rotation = Math.random() * Math.PI  / 8
  a.velocity.scale = Math.random() * 2
  a.velocity.phase = 0
  a.velocity.frequency = Math.random() * Math.PI / 32
  a.rect = a.getBoundingClientRect()
  a.translation.set(two.width / 2, two.height / 2)

  w = a.scale * a.rect.width / 2
  h = a.scale * a.rect.height / 2

  a.translation.addSelf a.velocity

  if (a.translation.x < w and a.velocity.x < 0) or (a.translation.x > two.width - w and a.velocity.x > 0)
    console.log 333
    a.velocity.x *= -1
  if (a.translation.y < h and a.velocity.y < 0) or (a.translation.y > two.height - h and a.velocity.y > 0)
    console.log 44
    a.velocity.y *= -1
  two.scene.add(a)
  particles.push(a)
  # a.scale = a.velocity.scale * Math.sin(a.velocity.phase % Math.PI) + 0.5
  # a.velocity.phase += a.velocity.frequency

radius = 50
particles = []

generate =(amount) ->
  r = Math.random() * radius + radius / 2
  _.map _.range(amount), (i) ->
    pct = i / amount
    angle = pct * Math.PI * 2
    x = r * Math.cos(angle)
    y = r * Math.sin(angle)
    anchor = new Two.Anchor(x, y)
    anchor.origin = new Two.Vector().copy(anchor)
    anchor

make = ->
  points = generate(3);
  poly = new Two.Polygon(points, true)
  poly

two = new Two(
  fullscreen: true
  autostart: true
).appendTo(document.body)

circle = two.makeCircle(72, 100, 50)
rect = two.makeRectangle(213, 100, 100, 100)
polygon = two.makePolygon(500, 500, 300, 400, 500, 300, false)

# The object returned has many stylable properties:
circle.fill = "#FF8000"
circle.stroke = "orangered" # Accepts all valid css color
circle.linewidth = 5
rect.fill = "rgb(0, 200, 255)"
rect.opacity = 0.75
rect.noStroke()

polygon.fill = "#151811"
polygon.stroke = "#8FB8CA" 
polygon.linewidth = 7

# two.update()

# update = ->
#   _.each particles, (particle) ->
#     console.log particle

# two.bind('update', update).scene.add(particles);
# two.bind("update", (frameCount) -> 
#   polygon.scale = 0.2 if polygon.scale > 0.9999
#   t = (1 - polygon.scale) * 0.125
#   polygon.scale += t
  # polygon.translation.set(two.width / 2, two.height / 2);
  # particle.translation.addSelf(particle.velocity)
  # polygon.velocity.x *= -1  if (polygon.translation.x < two.width/2 and polygon.velocity.x < 0) or (polygon.translation.x > two.width - two.widht/2 and polygon.velocity.x > 0)
  # polygon.velocity.y *= -1  if (polygon.translation.y < two.height/2 and polygon.velocity.y < 0) or (polygon.translation.y > two.height - two.height/2 and polygon.velocity.y > 0)
  # polygon.rotation += t * 4 * Math.PI
  # return
# ).play()
