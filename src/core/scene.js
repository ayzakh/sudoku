/**
 * Scene
 * @constructor
 * @param monitorConfig
 * @return renderer and container
 */
class Scene {
  constructor (monitorConfig) {
    this.renderer = PIXI.autoDetectRenderer(monitorConfig.x, monitorConfig.y, {
      antialias: false,
      transparent: false,
      resolution: 1
    })
    document.body.appendChild(this.renderer.view)
    this.container = new PIXI.Container()
  }
}

export default Scene
