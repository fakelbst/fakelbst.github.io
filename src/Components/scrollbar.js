import Vue from 'vue'
import style from './style.css'

export default {
  props: ['sy', 'h'],
  data() {
    return {
      style,
      positionY: 0,
      dragHeight: 50,
    }
  },
  watch: {
    sy: function(v){
      this.positionY = v;
    },
    h: function(v) {
      let newWh = window.innerHeight
      this.dragHeight = Math.max((newWh / v) * newWh, 50)
    }
  },
  template: `<div v-bind:class="style.scrollbar">
      <div v-bind:class="style.drag" v-bind:style="{height: dragHeight + 'px'}"></div>
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
    let domWrap = this.$el.parentNode.firstElementChild
    let domDrag = this.$el.firstElementChild

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
      this.positionY = y

      let prescent =  Math.abs(y) / domWrap.offsetHeight
      let sbarPrescent = domDrag.offsetHeight/ window.innerHeight
      let scrollbar = Math.round(window.innerHeight * prescent * 1000) / 1000
      // if(prescent < 0.02){
      //   scrollbar = 0
      // }
      // if(prescent + sbarPrescent > 0.95){
      //   scrollbar = window.innerHeight - domDrag.offsetHeight
      // }

      domDrag.style.transform = `translate3d(0, ${scrollbar}px, 0)`

      this.$emit('scrolling', y);

    };
    // for Firefox
    this.$el.parentNode.firstElementChild.addEventListener('DOMMouseScroll', handleScroll, false)
    this.$el.parentNode.firstElementChild.addEventListener('mousewheel', handleScroll, false)

    window.onresize = throttle (() => {
      this.dragHeight = this.calcBarHeight()
    })

    window.onload = () => {
      this.dragHeight = this.calcBarHeight()
    }

  },
  methods: {
    calcBarHeight () {
      let domWrap = this.$el.parentNode.firstElementChild
      let newWh = window.innerHeight
      return Math.max((newWh / domWrap.offsetHeight) * newWh, 50)
    },
  },
}

