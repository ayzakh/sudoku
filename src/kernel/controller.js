import Level from '../controllers/level'

/**
 * Controller ^_^
 * @constructor
 * @param config
 */
class Controller {
  constructor (config) {
    this.level = new Level(config)
  }
  start () {
    this.level.start()
  }
}

export default Controller
