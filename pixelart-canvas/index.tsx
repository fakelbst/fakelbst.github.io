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
  const pixelGridRef = useRef(null)
  const [selectedColor, setSelectedColor] = useState(0)

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

  return (
    <div className="container">
      <div className="toolbar">
        <div className="toolbox">
          <div className="current-color" style={{ background: `rgb(${COLORS[selectedColor][0]}, ${COLORS[selectedColor][1]}, ${COLORS[selectedColor][2]})` }}></div>
          <div className="colors">
            {
              COLORS.map((el, index) => {
                return <div onClick={() => setSelectedColor(index)} className={`color ${selectedColor === index ? 'active' : ''}`} style={{ background: `rgb(${el[0]}, ${el[1]}, ${el[2]})` }}></div>
              })
            }
          </div>
        </div>
      </div>
      <div className="draw-container">
        <div className="pixel-grid" ref={pixelGridRef}></div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <PixelCanvas />,
  document.getElementById('root')
)
