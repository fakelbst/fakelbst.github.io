import Vue from 'vue'
import style from './style.css'

export default {
  props: ['sy'],
  data() {
    return {
      style
    }
  },
  template: `<div v-bind:class="style.scrollbar">
      <div v-bind:class="style.drag"></div>
    </div>`,
  mounted() {

    function throttle (callback) {
      var wait = false
      return function () {
        if (!wait) {
          callback.call()
          wait = true
          setTimeout(function () {
            wait = false
          }, 100)
        }
      }
    }

    let y = 0
    let domWrap = document.querySelector('[class*=__wrap__]')
    let domDrag = document.querySelector('[class*=__drag__]')

    let handleScroll = (evt) => {

      if (!evt) evt = event
      let direction = (evt.detail<0 || evt.wheelDelta>0) ? 1 : -1
      y += Math.abs(evt.deltaY) * direction
      if( y < 0 && Math.abs(y) < (domWrap.offsetHeight - window.innerHeight + 30)){
        domWrap.style.transform = `translate3d(0, ${y}px, 0)`
      }
      else{
        y += evt.deltaY
      }
      this.sy = y

      let prescent =  Math.abs(y) / domWrap.offsetHeight
      let sbarPrescent = domDrag.offsetHeight/ window.innerHeight
      let scrollbar = Math.round(window.innerHeight * prescent * 10) / 10
      if(prescent < 0.02){
        scrollbar = 0
      }
      if(prescent + sbarPrescent > 0.95){
        scrollbar = window.innerHeight - domDrag.offsetHeight
      }
      domDrag.style.transform = `translate3d(0, ${scrollbar}px, 0)`
    };
    // for Firefox
    document.querySelector('[class*=main-content]').addEventListener('DOMMouseScroll', handleScroll, false)
    document.querySelector('[class*=main-content]').addEventListener('mousewheel', handleScroll, false)

    window.onresize = throttle (() => {
      domDrag.style.height = this.calcBarHeight()
    })

    window.onload = () => {
      domDrag.style.height = this.calcBarHeight()
    }
  },
  methods: {
    calcBarHeight: function(){
      let domWrap = document.querySelector('[class*=__wrap__]')
      let newWh = window.innerHeight
      return Math.max((newWh / domWrap.offsetHeight) * newWh, 50) + 'px'
    },
    setBarHeight: function(){
      let domDrag = document.querySelector('[class*=__drag__]')
      domDrag.style.height = this.calcBarHeight()
    }
  },
  events: {
    reSetBarHeight: function(){
      this.setBarHeight()
    }
  }
}

