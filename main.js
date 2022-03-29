const throttle = (fn, sec) => {
  let timer = null
  return function() {
    if (timer) return
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fn.apply(this, arguments)
    }, sec)
  }
}

(() => {
  let containerX = 0
  const MAXWIDTH = innerWidth
  document.querySelector('body').addEventListener('wheel', throttle((event) => {
    const delta = Math.sign(event.deltaY)
    containerX += delta * 20
    if (containerX < 0 || containerX >= MAXWIDTH) {
      return
    }
    document.querySelector('.container').style.transform = `translateX(-${containerX}px)`
  }, 50))


  const app = new PIXI.Application({
    autoResize: true,
    resizeTo: document.querySelector('.container'),
    backgroundColor: 0x000,
    resolution: window.devicePixelRatio
  });

  document.querySelector('.container').appendChild(app.view);

  PIXI.Loader.shared
	.add('1.svg', '/assets/dot1.svg')
	.add('2.svg', '/assets/dot2.svg')
	.add('3.svg', '/assets/dot3.svg')
  .load(() => {
  	app.stage.addChild(...Array.from({length: 1300}, (_, i) => {
    	const sprite = PIXI.Sprite.from(`${Math.random() * 3 + 1 | 0}.svg`)
      sprite.anchor.set(.5)
      sprite.scale.set(0.009 + Math.random() * 0.12)
      sprite.rotation = Math.PI * 2 * Math.random()
      sprite.position.set(
      	app.screen.width * Math.random(),
      	app.screen.height * Math.random(),
      )
      return sprite
    }))

    const graphics = new PIXI.Graphics()
    graphics.beginFill(0x000)
    const screenWidth = innerWidth
    const screenHeight = innerHeight
    const rWidth = 500
    const rHeight = 660
    graphics.drawRect(screenWidth - rWidth / 2, (screenHeight - rHeight) / 2 , rWidth, rHeight)
    app.stage.addChild(graphics)
  })

})()
