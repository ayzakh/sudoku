import Model from './model'
import View from './view'
import Mouse from '../core/mouse'

/**
 * Controller ^_^
 * @constructor
 * @param config
 */
class Controller {
  constructor (config) {
    this.config = config
    this.model = new Model(this.config.map)
    this.view = new View(this.config)
    this.mapMaxOrdinate = Math.pow(this.config.map.mapSize, 2)

    // mouse position
    this.mouse = new Mouse()
  
    this._getCellByCursor = (cursor) => Math.floor(cursor / (this.config.display.monitor.x / this.mapMaxOrdinate))
    this._getMainCellByCell = (cell) => Math.floor(cell / this.config.map.mapSize)
  
    // click events
    this.mouseEvent = {
      clicked: false, // click detector
      onMouseDown: () => {
        console.log('mousedown on pos:', this._getCellByCursor(this.mouse.x), this._getCellByCursor(this.mouse.y))
      },
      onMouseUp: () => {
        console.log('mouseup on pos:', this._getCellByCursor(this.mouse.x), this._getCellByCursor(this.mouse.y))
      }
    }
    
    
  }
  start () {
    let map = this.model.generateMap()
    setInterval(() => {
      // click detection
      if (this.mouse.clicked == true) {
        if (this.mouseEvent.clicked == false) {
          this.mouseEvent.onMouseDown()
        }
        this.mouseEvent.clicked = true
      } else if (this.mouse.clicked == false) {
        if (this.mouseEvent.clicked == true) {
          this.mouseEvent.clicked = false
          this.mouseEvent.onMouseUp()
        }
      }
      this.view.update(map, this.mouse)
    }, 1000/this.config.display.fps)
  }
}

export default Controller
