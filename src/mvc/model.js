/**
 * Model ^_^
 * @constructor
 * @param mapConfig
 */
class Model {
  constructor (mapConfig) {
    this.mapConfig = mapConfig
    this.ordinateMax = Math.pow(this.mapConfig.mapSize, 2)
    this.map = []
  }
  /**
   * Генерация карты
   * @return array Map
   */
  generateMap () {

    // move([1, 2, 3], 1) => [3, 1, 2]
    let move = (array, step) => {
      let result = []
      for (let i = array.length - step; i < array.length; i++) {
        result.push(array[i])
      }
      for (let i = 0; i < array.length - step; i++) {
        result.push(array[i])
      }
      return result
    }

    /*
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
    */

    for (let y = 0; y < this.ordinateMax; y++) {
      this.map[y] = []
      for (let x = 0; x < this.ordinateMax; x++) {
        this.map[y][x] = 0
      }
    }

    /*
      1 2 3 0 0 0 0 0 0
      4 5 6 0 0 0 0 0 0
      7 8 9 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
    */

    for (let x = 0, i = 1; x < this.mapConfig.mapSize; x++) {
      for (let y = 0; y < this.mapConfig.mapSize; y++) {
        this.map[y][x] = i
        i++
      }
    }

    /*
      1 2 3 7 8 9 4 5 6
      4 5 6 1 2 3 7 8 9
      7 8 9 4 5 6 1 2 3
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
      0 0 0 0 0 0 0 0 0
    */

    for (let x = 0; x < this.mapConfig.mapSize; x++) {
      for (let y = 0; y < this.mapConfig.mapSize; y++) {
        this.map[x + this.mapConfig.mapSize][y + 1] = this.map[x][y]
      }
    }

    /*
      1 2 3 7 8 9 4 5 6
      4 5 6 1 2 3 7 8 9
      7 8 9 4 5 6 1 2 3
      6 1 2 3 7 8 9 4 5
      9 4 5 6 1 2 3 7 8
      3 7 8 9 4 5 6 1 2
      5 6 1 2 3 7 8 9 4
      8 9 4 5 6 1 2 3 7
      2 3 7 8 9 4 5 6 1
    */

    return this.map
  }
}

export default Model