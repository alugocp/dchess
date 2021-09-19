function initialize(): void {
  Game.game = new Game();
  Game.game.start();
}

class Game {
  static game: Game;
  canvas: HTMLCanvasElement;
  renderer: Renderer;
  map: Map;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.renderer = new Renderer(this.canvas);
    this.map = new Map();
    let that = this;
    this.canvas.onclick = function(e) {
      let rect = that.canvas.getBoundingClientRect();
      let x = Math.floor((e.clientX - rect.x) / Renderer.TILE_SIZE);
      let y = Math.floor((e.clientY - rect.y) / Renderer.TILE_SIZE);
      let unit: Unit = that.map.get(x, y);
      if (unit !== null && unit.clickable) {
        that.renderer.selected = unit;
      } else {
        that.renderer.selected = null;
      }
    }
  }

  /*
    Initializes the game renderer
  */
  start(): void {
    Bestiary.getBat().spawn(0, 0);
    Bestiary.getRock().spawn(2, 1);
    this.renderer.frame();
  }
}
