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
    sy(v) {
      this.positionY = v;
    },
    h(v) {
      const newWh = window.innerHeight
      this.dragHeight = Math.max((newWh / v) * newWh, 50)
    },
  },
  template: `<div v-bind:class="style.scrollbar">
      <div v-bind:class="style.drag" v-bind:style="{height: dragHeight + 'px'}"></div>
    </div>`,
  mounted() {
    function throttle(callback) {
      let wait = false
      return () => {
        if (!wait) {
          callback.call()
          wait = true
          setTimeout(() => {
            wait = false
          }, 100)
        }
      }
    }

    let y = 0
    const domWrap = this.$el.parentNode.firstElementChild
    const domDrag = this.$el.firstElementChild

    const handleScroll = (evt) => {
      const direction = (evt.detail < 0 || evt.wheelDelta > 0) ? 1 : -1
      y += Math.abs(evt.deltaY) * direction
      if (y < 0 && Math.abs(y) < ((domWrap.offsetHeight - window.innerHeight) + 30)) {
        domWrap.style.transform = `translate3d(0, ${y}px, 0)`
      } else {
        y += evt.deltaY
      }
      this.positionY = y

      const prescent = Math.abs(y) / domWrap.offsetHeight
      const scrollbar = Math.round(window.innerHeight * prescent * 1000) / 1000

      domDrag.style.transform = `translate3d(0, ${scrollbar}px, 0)`

      this.$emit('scrolling', y);
    };
    // for Firefox
    this.$el.parentNode.firstElementChild.addEventListener('DOMMouseScroll', handleScroll, false)
    this.$el.parentNode.firstElementChild.addEventListener('mousewheel', handleScroll, false)

    window.onresize = throttle(() => {
      this.dragHeight = this.calcBarHeight()
    })

    window.onload = () => {
      this.dragHeight = this.calcBarHeight()
    }
  },
  methods: {
    calcBarHeight() {
      const domWrap = this.$el.parentNode.firstElementChild
      const newWh = window.innerHeight
      return Math.max((newWh / domWrap.offsetHeight) * newWh, 50)
    },
  },
}

