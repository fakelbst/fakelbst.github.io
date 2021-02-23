import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

const COLORS = [
  [82, 60, 78],
  [42, 42, 58],
  [62, 84, 66],
  [132, 84, 92],
  [56, 96, 124],
  [92, 122, 86],
  [16, 16, 36],
  [178, 126, 86],
  [4, 78, 82],
  [85, 171, 148],
  [128, 172, 64],
  [236, 138, 75],
  [139, 208, 186],
  [255, 204, 104],
  [255, 248, 192]
]

function PixelCanvas() {
  const previewRef = useRef(null)
  const pixelGridRef = useRef(null)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [usingEraser, setUsingEraser] = useState(false)
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    const el = pixelGridRef.current
    for(let i = 0; i < 100; i++) {
      const wrapperDiv = document.createElement('div')
      wrapperDiv.className = 'dot-wrapper'
      for(let ii = 0; ii < 100; ii++) {
        const div = document.createElement('div')
        div.className = 'dot'
        wrapperDiv.append(div)
      }
      el.append(wrapperDiv)
    }
  }, [])

  const draw = (e: any) => {
    setDrawing(true)
    const el = e.target
    if (usingEraser) {
      el.style.background = null
      el.removeAttribute('data-color-index')
    } else {
      el.style.background = `rgb(${COLORS[selectedColorIndex][0]}, ${COLORS[selectedColorIndex][1]}, ${COLORS[selectedColorIndex][2]})`
      el.setAttribute('data-color-index', selectedColorIndex)
    }
    genPreviw()
  }

  const move = (e: any) => {
    if (drawing) {
      const el = e.target
      if (usingEraser) {
        el.style.background = null
        el.removeAttribute('data-color-index')
      } else {
        el.style.background = `rgb(${COLORS[selectedColorIndex][0]}, ${COLORS[selectedColorIndex][1]}, ${COLORS[selectedColorIndex][2]})`
        el.setAttribute('data-color-index', selectedColorIndex)
      }
    }
  }

  const stop = () => {
    setDrawing(false)
    genPreviw()
  }

  const genPreviw = () => {
    const data = getPixel().split(',')
    const canvas = previewRef.current
    const ctx = canvas.getContext('2d')
    let imageData = ctx.createImageData(100, 100)
    for (let i = 0; i < data.length; i++) {
      if (!data[i]) continue
      imageData.data[i * 4 + 0] = COLORS[+data[i]][0]
      imageData.data[i * 4 + 1] = COLORS[+data[i]][1]
      imageData.data[i * 4 + 2] = COLORS[+data[i]][2]
      imageData.data[i * 4 + 3] = 255
    }
    ctx.putImageData(imageData, 0, 0)
  }

  const getPixel = () => {
    const els = document.querySelectorAll('.dot')
    let arr = ''
    els.forEach((el, index) => {
      if (!el.hasAttribute('data-color-index')) {
        arr += ','
      } else {
        arr += el.getAttribute('data-color-index') + ','
      }
    })
    return arr
  }

  const exportArr = () => {
    const arr = getPixel()

    const downloadLink = document.createElement('a')
    const file = new Blob([arr], {type: 'text/plain'})
    downloadLink.href = URL.createObjectURL(file)
    downloadLink.download = 'pixels.js'
    downloadLink.click()
    downloadLink.remove()
  }

  return (
    <div className="container">
      <div className="toolbar">
        <div className="toolbox">
          <div className="current-color" style={{ background: `rgb(${COLORS[selectedColorIndex][0]}, ${COLORS[selectedColorIndex][1]}, ${COLORS[selectedColorIndex][2]})` }}></div>
          <div className="colors">
            {
              COLORS.map((el, index) => {
                return <div onClick={() => {
                  setUsingEraser(false)
                  setSelectedColorIndex(index)
                }} className={`color ${selectedColorIndex === index ? 'active' : ''}`} style={{ background: `rgb(${el[0]}, ${el[1]}, ${el[2]})` }}></div>
              })
            }
          </div>
        </div>
        <div className="toolbox">
          <svg onClick={() => setUsingEraser(true)} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4066" width="200" height="200"><path d="M993.7408 381.0816l-322.56-322.56a94.4128 94.4128 0 0 0-133.5296 0l-507.392 507.1872a94.4128 94.4128 0 0 0 0 133.5296L250.88 919.7568a238.7968 238.7968 0 0 0 337.92 0l405.1456-405.1456a94.4128 94.4128 0 0 0-0.2048-133.5296z m-366.08-279.1936l322.56 322.56a33.024 33.024 0 0 1 0 46.6432l-363.9808 364.1344L216.9344 465.92l364.0832-364.032a33.024 33.024 0 0 1 46.6432 0zM294.2464 876.3392L73.728 655.8208a33.024 33.024 0 0 1 0-46.6432l99.7888-99.7888L542.72 878.592a177.5616 177.5616 0 0 1-248.4736-2.2528z" p-id="4067" fill={usingEraser ? '#e91e63' : '#cccfe2'}></path></svg>
          <svg onClick={exportArr} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5946" width="200" height="200"><path d="M394.6 689.8c-13.2 3.2-27.4-9.5-31.7-23.2-8.4-28.5-12.7-58.6-12.7-88.1 0-159.4 151.5-325.1 314.1-352.1v-5.3c0-1.6 0-3.7 0.5-5.3l0.5-2.1c1.6-11.6 5.8-38.5 32.2-55.4 10.6-6.9 22.2-10 34.3-10 14.8 0 26.9 5.3 34.3 9.5 1.6 0.5 2.6 1.6 4.2 2.6L929.2 286c17.4 13.2 28 34.8 28 57 0 22.7-10.6 44.3-28.5 57.5L770.5 525.7c-11.6 9-25.3 13.7-39.1 13.7-12.1 0-23.8-3.7-34.8-10.6-21.1-13.7-31.7-34.8-31.7-64.4v-1.1C559.3 475 442.2 569 416.3 657.6c-4.8 14.3-13.7 32.2-21.7 32.2z m335.7-466.6V256c0 17.4-13.7 31.7-31.1 32.7-125.6 6.9-257.6 131.4-279.7 254.4C486 458.7 595.2 390 699.7 397.4c17.4 1.1 30.6 15.3 30.6 32.7V465c0 4.7 0.5 6.9 0.5 7.9l157.3-124.6c2.1-1.6 2.6-3.2 2.6-5.3 0-2.1-1.1-4.2-2.6-5.3L731.9 214.3c-1.1 1.6-1.6 5.8-2.1 8.4l0.5 0.5z m0 0" p-id="5947" fill="#cccfe2"></path><path d="M715.6 916.3H188.3c-67 0-121.9-54.9-121.9-121.9v-568c0-67 54.9-121.9 121.9-121.9h436.5v69.7H188.3c-28.5 0-52.3 23.2-52.3 52.3V795c0 28.5 23.2 52.3 52.3 52.3h527.3c28.5 0 52.3-23.2 52.3-52.3V593.2H837v201.6c0 66.6-54.4 121.5-121.4 121.5z m0 0" p-id="5948" fill="#cccfe2"></path><path d="M183 566.9h112.4V626H183v-59.1z m0 154.1h296.1v59.1H183V721z m0-425.4h237v59.1H183v-59.1z m0 140.9h112.4v59.1H183v-59.1z m0 0" p-id="5949" fill="#cccfe2"></path></svg>
        </div>
        <div className="toolbox">
          <canvas ref={previewRef} className="preview-canvas" width="100" height="100"></canvas>
        </div>
      </div>
      <div className="draw-container">
        <div onMouseUp={stop} onMouseMove={move} onMouseDown={draw} className="pixel-grid" ref={pixelGridRef}></div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <PixelCanvas />,
  document.getElementById('root')
)
