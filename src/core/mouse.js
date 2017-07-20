/**
 * Mouse
 * @constructor
 */
class Mouse {
  constructor () {
    this.x = 0
    this.y = 0
    this.clicked = false
    document.addEventListener('mousemove', (e) => {
      this.x = e.clientX
      this.y = e.clientY
    })
    document.addEventListener('mousedown', (e) => {
      this.clicked = true
    })
    document.addEventListener('mouseup', (e) => {
      this.clicked = false
    })
  }
}

export default Mouse