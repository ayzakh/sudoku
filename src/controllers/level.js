import Map from '../models/map'
import View from '../kernel/view'

/**
 * Level ^_^
 * @constructor
 * @param config
 */
class Level {
  constructor (config) {
    this.config = config
    this.map = new Map(this.config.map)
    this.view = new View(this.config)
    this.mapMaxOrdinate = Math.pow(this.config.map.mapSize, 2)
  
    this._getCellByCursor = (cursor) => Math.floor(cursor / (this.config.display.monitor.x / this.mapMaxOrdinate))
    this._getMainCellByCell = (cell) => Math.floor(cell / this.config.map.mapSize)
  
  }
  start () {
    let map = this.map.generate()
    setInterval(() => {
      this.view.update(map)
    }, 1000/this.config.display.fps)
  }
}

export default Level
