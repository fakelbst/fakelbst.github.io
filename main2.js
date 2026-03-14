const MOVESTEP = 3
const BGWIDTH = 800
const BGHEIGHT = 600

;(() => {
  const app = new PIXI.Application({
    autoResize: true,
    backgroundColor: 0xffffff,
    resolution: window.devicePixelRatio,
  })
  document.body.appendChild(app.view)

  const keys = {}

  const pWidth = 10
  const pHeight = 10

  const pBuffer = new Uint8Array(4 * pWidth * pHeight)
  for (let i = 0; i < 4 * pWidth * pHeight; i += 4) {
    pBuffer[i] = 255
    pBuffer[i + 1] = 0
    pBuffer[i + 2] = 0
    pBuffer[i + 3] = 255
  }

  const mapBuffer = new Uint8Array(4 * BGWIDTH * BGHEIGHT)
  for (let i = 0; i < 4 * BGWIDTH * BGHEIGHT; i += 4) {
    mapBuffer[i] = 111
    mapBuffer[i + 1] = 111
    mapBuffer[i + 2] = 111
    mapBuffer[i + 3] = 255
  }

  const pTexture = PIXI.Texture.fromBuffer(pBuffer, pWidth, pHeight)
  const mapTexture = PIXI.Texture.fromBuffer(mapBuffer, BGWIDTH, BGHEIGHT)

  const player = PIXI.Sprite.from(pTexture)
  const map = PIXI.Sprite.from(mapTexture)

  player.x = app.screen.width / 2
  player.y = app.screen.height / 2

  app.stage.addChild(map, player)

  app.ticker.add(gameLoop)

  window.addEventListener('keydown', keysDown)
  window.addEventListener('keyup', keysUp)

  function keysDown(e) {
    keys[e.keyCode] = true
  }

  function keysUp(e) {
    keys[e.keyCode] = false
  }

  function gameLoop() {
    if (keys['37']) {
      if (player.x < MOVESTEP) return
      player.x -= MOVESTEP
    }

    if (keys['38']) {
      if (player.y < MOVESTEP) return
      player.y -= MOVESTEP
    }

    if (keys['39']) {
      if (player.x + pWidth + MOVESTEP > BGWIDTH) return
      player.x += MOVESTEP
    }

    if (keys['40']) {
      if (player.y + pHeight + MOVESTEP > BGHEIGHT) return
      player.y += MOVESTEP
    }
  }
})()
