var startDay = new Date(2018, 0, 1, 0, 0, 0)
var fullYear = 365 * 24 * 60 * 60 * 1000
var now = new Date()

var timeRemaining = Math.round( (now.getTime() - startDay.getTime()) / fullYear * 10000) / 100
document.querySelector('.year-progress').style.width = timeRemaining + '%'

