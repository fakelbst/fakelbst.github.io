const startDay = new Date(2018, 0, 1, 0, 0, 0)
const fullYear = 365 * 24 * 60 * 60 * 1000
let now = new Date()

const sDay = [{
  date: 'February 3, 2018 19:30:00',
  title: 'The xx'
}]

const yearProgress = document.querySelector('.year-progress')

let timeRemaining = Math.round( (now.getTime() - startDay.getTime()) / fullYear * 10000) / 100
yearProgress.style.width = timeRemaining + '%'

for (let i = 0, j = sDay.length; i < j; i++) {
  let dotEl = document.createElement('span')
  dotEl.className = 'dot'
  let dotPercent = Math.round( (new Date(sDay[i].date).getTime() - startDay.getTime()) / (now.getTime() - startDay.getTime()) * 10000) / 100
  dotEl.style.left = dotPercent + '%'
  yearProgress.appendChild(dotEl)
}
