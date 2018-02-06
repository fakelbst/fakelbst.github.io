const startDay = new Date(2018, 0, 1, 0, 0, 0)
const fullYear = 365 * 24 * 60 * 60 * 1000
let now = new Date()

const sDay = [{
  date: 'February 3, 2018 19:30:00',
  title: 'The xx'
}]

const yearProgress = document.querySelector('.year-progress')
const readingGold = 50

let timeRemaining = Math.round( (now.getTime() - startDay.getTime()) / fullYear * 10000) / 100
yearProgress.style.width = timeRemaining + '%'

for (let i = 0, j = sDay.length; i < j; i++) {
  let dotEl = document.createElement('span')
  dotEl.className = 'dot'
  let dotPercent = Math.round( (new Date(sDay[i].date).getTime() - startDay.getTime()) / (now.getTime() - startDay.getTime()) * 10000) / 100
  dotEl.style.left = dotPercent + '%'

  let tooltipEl = document.createElement('span')
  tooltipEl.className = 'tooltip'

  dotEl.addEventListener('mouseenter', ( event ) => {
    setTimeout(() => {
    }, 500)
  })

  dotEl.addEventListener("mouseover", ( event ) => {
    setTimeout(function() {
    }, 500)
  }, false)
  yearProgress.appendChild(dotEl)
}

for (let i = 0, j = readingGold; i < j; i++) {
  let els = document.createElement('span')
  els.className = 'books'
  document.querySelector('.six').appendChild(els)
}

let resHandler

function getJSONP(url, cb) {
  if (url.indexOf('?') === -1) {
    url += '?callback=resHandler'
  } else {
    url += '&callback=resHandler'
  }

  var script = document.createElement('script')

  resHandler = function(json) {
    try {
      cb(json)
    } finally {
      script.parentNode.removeChild(script)
    }
  }

  script.setAttribute('src', url)
  document.body.appendChild(script)
}

getJSONP('https://api.douban.com/v2/book/user/wber/collections?tag=2018', function(data){
  console.log(data)

  for(let i = 0, j = data.total; i < j; i++) {
  }
})
