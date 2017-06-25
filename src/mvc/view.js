import Scene from '../core/scene'

/**
 * View ^_^
 * @constructor
 * @param config
 */
class View extends Scene {
  constructor (config) {
    super(config.display.monitor)
    this.config = config
    this.init()
  }
  init () {
    // init empty map
    let mapMaxOrdinate = Math.pow(this.config.map.mapSize, 2)
    let textBoxSize = this.config.display.monitor.x / mapMaxOrdinate
    this.textBox = []
    for (var x = 0; x < mapMaxOrdinate; x++) {
      this.textBox[x] = []
      for (var y = 0; y < mapMaxOrdinate; y++) {
        this.textBox[x][y] = new PIXI.Text('', {
          // fontFamily: 'Arial',
          // fontSize: 32,
          fill: '#0ff'
        })
        this.textBox[x][y].position.set(textBoxSize * x, textBoxSize * y)
        this.textBox[x][y].width = textBoxSize
        this.textBox[x][y].height = textBoxSize
        this.container.addChild(this.textBox[x][y])
      }
    }
    // init lines
    let lineSpace = textBoxSize * this.config.map.mapSize
    for (let l = 0; l < this.config.map.mapSize - 1; l++) {
      for (let o = 0; o <= 1; o++) {
        this.line = new PIXI.Graphics()
        this.line.lineStyle(2, 0xFFFFFF, 1)
        if (o == 0) {
          // horizontal
          this.line.moveTo(lineSpace + lineSpace * l, 0)
          this.line.lineTo(lineSpace + lineSpace * l, lineSpace * this.config.map.mapSize)
        } else {
          // vertical
          this.line.moveTo(0, lineSpace + lineSpace * l)
          this.line.lineTo(lineSpace * this.config.map.mapSize, lineSpace + lineSpace * l)
        }
        this.container.addChild(this.line)
      }
    }
  }
  update (map) {
    for (var x = 0; x < map.length; x++) {
      for (var y = 0; y < map[x].length; y++) {
        this.textBox[x][y].text = map[x][y]
      }
    }
    this.renderer.render(this.container)
  }
}

export default View
