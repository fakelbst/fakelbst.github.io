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
  $("body").keypress (e) ->
    if(String.fromCharCode(e.keyCode|e.charCode) == 'c')
      two.clear()
      return
    else
      # a = make((Math.random()*8) + 1)
      a = make(3)
    uupdate(a)

uupdate =(a) ->
  a.velocity = new Two.Vector(Math.random() * 10, Math.random() * 10)
  a.velocity.rotation = Math.random() * Math.PI  / 8
  a.velocity.scale = Math.random() * 2
  a.velocity.phase = 0
  a.velocity.frequency = Math.random() * Math.PI / 32
  a.rect = a.getBoundingClientRect()
  a.translation.set(two.width / 2, two.height / 2)
  a.fill = rainbowArray[Math.floor(Math.random() * rainbowArray.length)]

  two.scene.add(a)
  particles.push(a)

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

make = (c) ->
  points = generate(c)
  poly = new Two.Polygon(points, true)
  poly

two = new Two(
  type: Two.Types['canvas']
  fullscreen: true
  autostart: true
).appendTo(document.body)

two.bind("update", (frameCount) -> 
  _.each particles, (particle) ->
    particle.scale = particle.velocity.scale * Math.sin(particle.velocity.phase % Math.PI) + 0.5
    particle.velocity.phase += particle.velocity.frequency
    w = particle.scale * particle.rect.width / 2
    h = particle.scale * particle.rect.height / 2
    particle.translation.addSelf particle.velocity
    if (particle.translation.x < w and particle.velocity.x < 0) or (particle.translation.x > two.width - w and particle.velocity.x > 0)
      particle.velocity.x *= -1
    if (particle.translation.y < h and particle.velocity.y < 0) or (particle.translation.y > two.height - h and particle.velocity.y > 0)
      particle.velocity.y *= -1
  return
).play()
