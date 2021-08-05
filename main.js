const throttle = (fn, sec) => {
  let timer = null
  return function() {
    if (timer) return
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fn.apply(this, arguments)
    }, sec)
  }
}

(() => {
  // gsap.registerPlugin(ScrollTrigger)

  // gsap.to('.container', {
  //   xPercent: -100, 
  //   x: () => innerWidth,
  //   ease: 'none',
  //   scrollTrigger: {
  //     trigger: '.container',
  //     start: 'top top',
  //     end: () => innerWidth * 3,
  //     scrub: true,
  //     pin: true,
  //     invalidateOnRefresh: true,
  //     anticipatePin: 1
  //   }
  // })
  let containerX = 0
  const MAXWIDTH = innerWidth * 3
  document.querySelector('body').addEventListener('wheel', throttle((event) => {
    const delta = Math.sign(event.deltaY)
    console.log(delta, 111111)
    containerX += delta * 20
    console.info(containerX, 112)
    if (containerX < 0 || containerX >= MAXWIDTH) {
      return
    }
    console.info(containerX, 3333)
    document.querySelector('.container').style.transform = `translateX(-${containerX}px)`
  }, 50))
})()
