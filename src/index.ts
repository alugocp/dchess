function initialize(): void {
  Game.game = new Game();
  Game.game.start();
}

class Game {
  static game: Game;
  canvas: HTMLCanvasElement;
  renderer: Renderer;
  console: Console;
  map: Map;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.renderer = new Renderer(this.canvas);
    this.console = new Console(this.canvas);
    this.map = new Map();
    const that = this;
    this.canvas.onclick = (e) => {
      const rect = that.canvas.getBoundingClientRect();
      const x = e.clientX - rect.x;
      const y = e.clientY - rect.y;
      if (y < 500) {
        const unit: Unit = that.map.get(Math.floor(x / Renderer.TILE_SIZE), Math.floor(y / Renderer.TILE_SIZE));
        that.console.clear();
        if (unit !== null && unit.clickable) {
          that.console.append(`${unit.name} (${unit.health}/${unit.maxHealth})`);
          that.console.append(unit.tags.join(', '));
        }
      } else {
        that.console.click(y - 500);
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
