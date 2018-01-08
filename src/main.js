import Controller from './kernel/controller'

/**
 *Game 
 * @constructor
 */
class Game {
  constructor () {
    let config = {
      display: {
        monitor: {
          x: window.innerHeight,
          y: window.innerHeight
        },
        fps: 60
      },
      map: {
        // mapSize: 2
        mapSize: 3
        // mapSize: 4
        // mapSize: 5
        // mapSize: 6
      }
    }
    let controller = new Controller(config)
    controller.start()
  }
}

(new Game())
