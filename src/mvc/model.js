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

  _createMap () {
    
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

    for (let x = 0, currentY; x < this.ordinateMax - this.mapConfig.mapSize; x++) {
      for (let y = 0; y < this.mapConfig.mapSize; y++) {
        currentY = y + 1
        if (currentY >= this.mapConfig.mapSize) {
          currentY = currentY - this.mapConfig.mapSize
        }
        this.map[x + this.mapConfig.mapSize][currentY] = this.map[x][y]
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

    for (let y = 0; y < this.ordinateMax - this.mapConfig.mapSize; y++) {
      for (let x = 0, currentX; x < this.ordinateMax; x++) {
        currentX = x + 1
        if (currentX >= this.ordinateMax) {
          currentX = currentX - this.ordinateMax
        }
        this.map[currentX][y + this.mapConfig.mapSize] = this.map[x][y]
      }
    }
  }

  /**
   * @param {number} n count of randomization (by default 100)
   */
  _randomizeMap (n) {
    if (n == void 0) {
      n = 100
    }

    /*
    > 1 2 3 7 8 9 4 5 6
      4 5 6 1 2 3 7 8 9
    > 7 8 9 4 5 6 1 2 3
      6 1 2 3 7 8 9 4 5
      9 4 5 6 1 2 3 7 8
      3 7 8 9 4 5 6 1 2
      5 6 1 2 3 7 8 9 4
      8 9 4 5 6 1 2 3 7
      2 3 7 8 9 4 5 6 1
            ^   ^
    */

    let getReversePositions = () => {
      let basePosition = Math.floor(Math.random() * this.mapConfig.mapSize)
      let getPosition = () => basePosition * this.mapConfig.mapSize + Math.floor(Math.random() * this.mapConfig.mapSize)
      let pos1 = getPosition()
      let pos2 = pos1
      while (pos2 == pos1) {
        pos2 = getPosition()
      }
      return { pos1: pos1, pos2: pos2 }
    }

    let reverseMapByPositionX = (positions) => {
      // console.log('reverseMapByPositionX', positions)
      for (var y = 0, t; y < this.ordinateMax; y++) {
        t = this.map[positions.pos1][y]
        this.map[positions.pos1][y] = this.map[positions.pos2][y]
        this.map[positions.pos2][y] = t
      }
    }

    let reverseMapByPositionY = (positions) => {
      // console.log('reverseMapByPositionY', positions)
      for (var x = 0, t; x < this.ordinateMax; x++) {
        t = this.map[x][positions.pos1]
        this.map[x][positions.pos1] = this.map[x][positions.pos2]
        this.map[x][positions.pos2] = t
      }
    }

    for (let i = n; i > 0; i--) {
      reverseMapByPositionX(getReversePositions())
      reverseMapByPositionY(getReversePositions())
    }

  }

  /**
   * @param {number} n count of emptytization (by default mapSize)
   */
  _emptyMap (n) {
    if (n == void 0) {
      n = this.ordinateMax
    }
    for (let i = n; i > 0; i--) {
      this.map[Math.floor(Math.random() * this.ordinateMax)][Math.floor(Math.random() * this.ordinateMax)] = ''
    }
  }

  /**
   * @return array Map
   */
  generateMap () {
    this._createMap()
    this._randomizeMap()
    this._emptyMap(100)
    return this.map
  }
}

export default Model