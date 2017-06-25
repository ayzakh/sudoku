import Model from './model'
import View from './view'

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
  }
  start () {
    let map = this.model.generateMap()
    setInterval(() => {
      this.view.update(map)
    }, this.config.speed)
  }
}

export default Controller
