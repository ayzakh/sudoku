import Controller from './mvc/controller'

/**
 * Sudoku
 * @constructor
 */
class Sudoku {
  constructor () {
    let config = {
      display: {
        monitor: {
          x: 600,
          y: 600
        }
      },
      speed: 30,
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

(new Sudoku())
