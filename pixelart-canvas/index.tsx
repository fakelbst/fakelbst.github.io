import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import CodeEditor from './components/CodeEditor'

enum ZoomType {
  IN,
  OUT
}

const COLORS = [
  [16, 16, 36],
  [178, 126, 86],
  [255, 248, 192],
  [132, 84, 92],
  [82, 60, 78],
  [42, 42, 58],
  [62, 84, 66],
  [56, 96, 124],
  [92, 122, 86],
  [212, 78, 82],
  [85, 168, 148],
  [128, 172, 64],
  [139, 208, 186],
  [255, 204, 104],
  [236, 138, 75]
]

function PixelCanvas() {
  const previewRef = useRef(null)
  const pixelGridRef = useRef(null)
  const uploadRef = useRef(null)

  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0)
  const [usingEraser, setUsingEraser] = useState<boolean>(false)
  const [usingColorPicker, setUsingColorPicker] = useState<boolean>(false)
  const [drawing, setDrawing] = useState(false)
  const [codeEditing, setCodeEditing] = useState(false)
  const [pixelsData, setPixelsData] = useState<string>('')
  const [editingCode, setEditingCode] = useState<string>('')
  const [loadedPixelData, setLoadedPixelData] = useState<string>('')

  useEffect(() => {
    if (codeEditing) {
      // check code
    } else {
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
    }
  }, [codeEditing])

  useEffect(() => {
    if (!loadedPixelData) return
    const allEls = document.querySelectorAll<HTMLElement>('.dot')
    const data = loadedPixelData.split(',')
    for (let i = 0, j = data.length; i < j; i++) {
      allEls[i].style.background = null
      allEls[i].removeAttribute('data-color-index')
      if (!data[i]) continue
      allEls[i].style.background = `rgb(${COLORS[+data[i]][0]}, ${COLORS[+data[i]][1]}, ${COLORS[+data[i]][2]})`
      allEls[i].setAttribute('data-color-index', data[i])
    }
  }, [loadedPixelData])

  const draw = (e: any) => {
    setDrawing(true)
    const el = e.target
    if (usingColorPicker) {
      let colorIndex = el.getAttribute('data-color-index')
      if (colorIndex === null) return
      setSelectedColorIndex(colorIndex)
      return
    }
    if (usingEraser) {
      el.style.background = null
      el.removeAttribute('data-color-index')
    } else {
      el.style.background = `rgb(${COLORS[selectedColorIndex][0]}, ${COLORS[selectedColorIndex][1]}, ${COLORS[selectedColorIndex][2]})`
      el.setAttribute('data-color-index', selectedColorIndex)
    }
    genPreview()
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
    genPreview()
  }

  const zoom = (zoomType: ZoomType) => {
    const dots = document.querySelectorAll('.dot')
    switch (zoomType) {
      case ZoomType.IN:
        if (dots[0].classList.contains('zoomout')) {
          dots.forEach(el => el.classList.toggle('zoomout'))
        } else {
          dots.forEach(el => el.classList.toggle('zoomin'))
        }
      break
      case ZoomType.OUT:
        if (dots[0].classList.contains('zoomin')) {
          dots.forEach(el => el.classList.toggle('zoomin'))
        } else {
          dots.forEach(el => el.classList.toggle('zoomout'))
        }
      break
    }
  }

  const genPreview = () => {
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

  const importFile = () => {
    uploadRef.current.click()
  }

  const handleCodeMode = () => {
    if (!codeEditing) {
      genPixelCode()
      setCodeEditing(true)
    } else {
      let arr = editingCode.split('/n')
      if (arr.length !== 100) {
        alert('Lines not equals 100, please check Lines length.')
        return
      }
      let result = ''
      for (let i = 0; i < 100; i++) {
        let line = arr[i].slice(0, -1).split(',')
        if (line.length !== 100) {
          alert(`Please check line ${i + 1}`)
          break
        }
        for (let ii = 0; ii < 100; ii++) {
          // TODO: check color index
          if (!line[ii]) {
            result += ','
            continue
          }
          result += line[ii] + ','
        }
      }
      setCodeEditing(false)
      setLoadedPixelData(result.slice(0, -1))
    }
  }

  const handleUpload = (e: any) => {
    const files = e.target.files
    const reader = new FileReader()
    reader.onload = function(event) {
      const value = event.target.result
      const data = (value as string).slice(0, -1).split(',')
      const allEls = document.querySelectorAll<HTMLElement>('.dot')
      for (let i = 0, j = data.length; i < j; i++) {
        allEls[i].style.background = null
        allEls[i].removeAttribute('data-color-index')
        if (!data[i]) continue
        allEls[i].style.background = `rgb(${COLORS[+data[i]][0]}, ${COLORS[+data[i]][1]}, ${COLORS[+data[i]][2]})`
        allEls[i].setAttribute('data-color-index', data[i])
      }
    }
    reader.readAsText(files[0])
    genPreview()
  }

  const getPixel = () => {
    const els = document.querySelectorAll<HTMLElement>('.dot')
    let arr = ''
    els.forEach((el) => {
      if (!el.hasAttribute('data-color-index')) {
        arr += ','
      } else {
        arr += el.getAttribute('data-color-index') + ','
      }
    })
    return arr
  }

  const genPixelCode = () => {
    /*
     * Split every 100 pixels
     */
    const els = document.querySelectorAll<HTMLElement>('.dot')
    let arr = ''
    els.forEach((el, index) => {
      if (index !== 0 && index % 100 === 0) {
        arr += '/n'
      }
      if (!el.hasAttribute('data-color-index')) {
        arr += ','
      } else {
        arr += el.getAttribute('data-color-index') + ','
      }
    })
    setPixelsData(arr)
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

  const setEditorCode = (data: string) => {
    setEditingCode(data)
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
        <div className="toolbox tools">
          <svg onClick={() => setUsingEraser(!usingEraser)} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4066" width="200" height="200"><path d="M993.7408 381.0816l-322.56-322.56a94.4128 94.4128 0 0 0-133.5296 0l-507.392 507.1872a94.4128 94.4128 0 0 0 0 133.5296L250.88 919.7568a238.7968 238.7968 0 0 0 337.92 0l405.1456-405.1456a94.4128 94.4128 0 0 0-0.2048-133.5296z m-366.08-279.1936l322.56 322.56a33.024 33.024 0 0 1 0 46.6432l-363.9808 364.1344L216.9344 465.92l364.0832-364.032a33.024 33.024 0 0 1 46.6432 0zM294.2464 876.3392L73.728 655.8208a33.024 33.024 0 0 1 0-46.6432l99.7888-99.7888L542.72 878.592a177.5616 177.5616 0 0 1-248.4736-2.2528z" p-id="4067" fill={usingEraser ? '#e91e63' : '#cccfe2'}></path></svg>
          <svg onClick={() => setUsingColorPicker(!usingColorPicker)} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4278" width="200" height="200"><path d="M932.495185 175.642433l-80.716274 98.144967c-3.532061 4.284795-8.453785 6.542998-12.506969 10.132961l61.782112 49.101435c40.300234 31.962255 46.669524 90.443916 14.244048 129.933514l-19.10787 23.218957a95.423543 95.423543 0 0 1-132.249619 13.607119l-22.697833-18.065622-381.63627 464.205427c-42.674242 51.880761-105.961823 81.411105-165.196218 77.068408a138.097785 138.097785 0 0 1-76.257771-29.067123c-67.398668-53.502035-68.672526-162.127379-2.953035-242.148821L496.893659 287.568227l-22.697833-18.007719a91.659872 91.659872 0 0 1-14.244049-129.933514l19.165773-23.276859a95.36564 95.36564 0 0 1 132.191716-13.549217l61.782112 49.043532c2.721424-4.632211 3.937379-9.843448 7.46944-14.128243L761.219189 39.57124a111.578378 111.578378 0 0 1 154.600037-15.865322 107.119875 107.119875 0 0 1 16.675959 151.936515z m-398.949158 141.05082l-381.694172 464.205428c-49.448851 60.218741-51.359638 139.661156-4.16899 177.124161 13.954535 11.059403 30.804202 17.428693 50.085779 18.818357 44.121808 3.242548 92.06519-19.744799 125.185498-59.987131l381.63627-464.26333-171.044385-135.897485z" p-id="4279" fill={usingColorPicker ? '#e91e63': '#cccfe2'}></path></svg>
        </div>
        <div className="toolbox tools">
          <svg onClick={exportArr} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5946" width="200" height="200"><path d="M394.6 689.8c-13.2 3.2-27.4-9.5-31.7-23.2-8.4-28.5-12.7-58.6-12.7-88.1 0-159.4 151.5-325.1 314.1-352.1v-5.3c0-1.6 0-3.7 0.5-5.3l0.5-2.1c1.6-11.6 5.8-38.5 32.2-55.4 10.6-6.9 22.2-10 34.3-10 14.8 0 26.9 5.3 34.3 9.5 1.6 0.5 2.6 1.6 4.2 2.6L929.2 286c17.4 13.2 28 34.8 28 57 0 22.7-10.6 44.3-28.5 57.5L770.5 525.7c-11.6 9-25.3 13.7-39.1 13.7-12.1 0-23.8-3.7-34.8-10.6-21.1-13.7-31.7-34.8-31.7-64.4v-1.1C559.3 475 442.2 569 416.3 657.6c-4.8 14.3-13.7 32.2-21.7 32.2z m335.7-466.6V256c0 17.4-13.7 31.7-31.1 32.7-125.6 6.9-257.6 131.4-279.7 254.4C486 458.7 595.2 390 699.7 397.4c17.4 1.1 30.6 15.3 30.6 32.7V465c0 4.7 0.5 6.9 0.5 7.9l157.3-124.6c2.1-1.6 2.6-3.2 2.6-5.3 0-2.1-1.1-4.2-2.6-5.3L731.9 214.3c-1.1 1.6-1.6 5.8-2.1 8.4l0.5 0.5z m0 0" p-id="5947" fill="#cccfe2"></path><path d="M715.6 916.3H188.3c-67 0-121.9-54.9-121.9-121.9v-568c0-67 54.9-121.9 121.9-121.9h436.5v69.7H188.3c-28.5 0-52.3 23.2-52.3 52.3V795c0 28.5 23.2 52.3 52.3 52.3h527.3c28.5 0 52.3-23.2 52.3-52.3V593.2H837v201.6c0 66.6-54.4 121.5-121.4 121.5z m0 0" p-id="5948" fill="#cccfe2"></path><path d="M183 566.9h112.4V626H183v-59.1z m0 154.1h296.1v59.1H183V721z m0-425.4h237v59.1H183v-59.1z m0 140.9h112.4v59.1H183v-59.1z m0 0" p-id="5949" fill="#cccfe2"></path></svg>
          <svg onClick={importFile} className="icon" viewBox="0 0 1264 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14775" width="200" height="200"><path d="M1264.585487 705.114353c-0.210824 0-6.144-11.565176-13.191529-25.720471l-184.801883-370.838588c-7.047529-14.155294-25.720471-25.720471-41.472-25.72047l-153.178353 0.060235a28.792471 28.792471 0 0 0-28.672 28.762353v48.850823c0 15.811765 12.920471 28.762353 28.672 28.792471h48.700236c15.751529 0.030118 34.364235 11.625412 41.351529 25.810823l131.011765 265.60753c6.987294 14.155294-0.180706 25.750588-15.962353 25.750588h-208.052706a28.792471 28.792471 0 0 0-28.641882 28.762353v150.437647a28.792471 28.792471 0 0 1-28.672 28.762353H451.10784a28.792471 28.792471 0 0 1-28.641882-28.762353v-150.437647a28.792471 28.792471 0 0 0-28.672-28.762353H181.524781c-15.751529 0-22.738824-11.474824-15.510588-25.539765l137.005176-266.450823c7.228235-14.064941 26.021647-25.539765 41.773177-25.539765l47.435294 0.030118a28.762353 28.762353 0 0 0 28.672-28.732236v-48.429176a28.792471 28.792471 0 0 0-28.672-28.762353L239.772311 283.105882c-15.751529 0-34.454588 11.565176-41.532236 25.690353L12.504546 679.664941c-7.077647 14.155294-12.709647 25.690353-12.498824 25.690353 0.210824 0 0.361412 12.950588 0.361412 28.762353v261.12c0 15.811765 12.920471 28.762353 28.672 28.762353h1207.235765c15.781647 0 28.672-12.950588 28.672-28.762353v-261.360941c0-15.811765-0.150588-28.762353-0.361412-28.762353z m-364.242823-262.144h-157.274353V0h-210.642824v442.970353h-165.707294c-15.751529 0-20.088471 9.667765-9.637647 21.504l260.999529 295.514353a24.425412 24.425412 0 0 0 37.76753-0.210824l254.403764-295.062588c10.300235-11.986824 5.842824-21.744941-9.938823-21.744941z" p-id="14776" fill="#cccfe2"></path></svg>
          <svg onClick={() => { handleCodeMode() /*genPixelCode(); setCodeEditing(!codeEditing)*/ }} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3801" width="200" height="200"><path d="M280.234667 426.666667L183.253333 329.472a43.093333 43.093333 0 0 1 0-60.885333 42.922667 42.922667 0 0 1 60.757334 0l127.402666 127.658666a42.922667 42.922667 0 0 1 0 60.842667l-127.402666 127.658667a42.922667 42.922667 0 0 1-60.757334 0 43.093333 43.093333 0 0 1 0-60.885334L280.234667 426.666667z" p-id="3802" fill={codeEditing ? '#e91e63' : '#cccfe2'}></path><path d="M85.333333 170.666667v682.666666h853.333334V170.666667H85.333333z m0-85.333334h853.333334a85.333333 85.333333 0 0 1 85.333333 85.333334v682.666666a85.333333 85.333333 0 0 1-85.333333 85.333334H85.333333a85.333333 85.333333 0 0 1-85.333333-85.333334V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334z" p-id="3803" fill={codeEditing ? '#e91e63' : '#cccfe2'}></path><path d="M426.666667 512h170.666666a42.666667 42.666667 0 0 1 0 85.333333h-170.666666a42.666667 42.666667 0 0 1 0-85.333333z" p-id="3804" fill={codeEditing ? '#e91e63' : '#cccfe2'}></path></svg>
          <svg onClick={() => zoom(ZoomType.IN)} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2136" width="200" height="200"><path d="M630.272 439.808H331.264c-16.384 0-29.696 14.336-29.696 31.744 0 17.92 13.312 32.256 29.696 32.256h299.008c16.384 0 29.696-14.336 29.696-31.744 0-17.408-13.312-31.744-29.696-32.256z" fill="#cccfe2" p-id="2137"></path><path d="M512.512 621.568V322.56c0-16.384-14.336-29.696-31.744-29.696-17.92 0-32.256 13.312-32.256 29.696v299.008c0 16.384 14.336 29.696 31.744 29.696 17.408 0 31.744-13.824 32.256-29.696z" fill="#cccfe2" p-id="2138"></path><path d="M929.28 880.64l-165.376-165.376 2.56-3.072c56.832-67.072 87.552-152.576 87.552-240.128 0-205.824-167.424-373.76-373.76-373.76-205.824 0-373.76 167.424-373.76 373.76 0 205.824 167.424 373.76 373.76 373.76 84.992 0 168.448-29.696 234.496-83.456l3.072-2.56 165.888 165.888c6.656 6.656 15.36 9.728 23.552 9.216h1.024c16.384 0 29.696-13.312 29.696-29.696v-0.512c1.024-8.704-2.048-17.408-8.704-24.064z m-448.512-98.304c-171.008 0-310.272-139.264-310.272-310.272s139.264-310.272 310.272-310.272 310.272 139.264 310.272 310.272-139.264 310.272-310.272 310.272z" fill="#cccfe2" p-id="2139"></path></svg>
          <svg onClick={() => zoom(ZoomType.OUT)} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4191" width="200" height="200"><path d="M630.272 439.808H331.264c-16.384 0-29.696 14.336-29.696 31.744 0 17.92 13.312 32.256 29.696 32.256h299.008c16.384 0 29.696-14.336 29.696-31.744 0-17.408-13.312-31.744-29.696-32.256z" fill="#cccfe2" p-id="4192"></path><path d="M929.28 880.64l-165.376-165.376 2.56-3.072c56.832-67.072 87.552-152.576 87.552-240.128 0-205.824-167.424-373.76-373.76-373.76-205.824 0-373.76 167.424-373.76 373.76 0 205.824 167.424 373.76 373.76 373.76 84.992 0 168.448-29.696 234.496-83.456l3.072-2.56 165.888 165.888c6.656 6.656 15.36 9.728 23.552 9.216h1.024c16.384 0 29.696-13.312 29.696-29.696v-0.512c1.024-8.704-2.048-17.408-8.704-24.064z m-448.512-98.304c-171.008 0-310.272-139.264-310.272-310.272 0-171.008 139.264-310.272 310.272-310.272 171.008 0 310.272 139.264 310.272 310.272 0 171.008-139.264 310.272-310.272 310.272z" fill="#cccfe2" p-id="4193"></path></svg>
          <input type="file" onChange={handleUpload} ref={uploadRef} style={{ display: 'none' }} />
        </div>
        <div className="toolbox">
          <canvas ref={previewRef} className="preview-canvas" width="100" height="100"></canvas>
        </div>
      </div>
      <div className="draw-container">
        {
          codeEditing
            ? <CodeEditor data={pixelsData} editCode={setEditorCode}  /> :
            <div onMouseLeave={stop} onMouseUp={stop} onMouseMove={move} onMouseDown={draw} className="pixel-grid" ref={pixelGridRef}></div>
        }
      </div>
    </div>
  )
}

ReactDOM.render(
  <PixelCanvas />,
  document.getElementById('root')
)
