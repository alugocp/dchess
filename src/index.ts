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
    this.canvas.onclick = function() {
      console.log('Canvas clicked!');
    }
  }

  /*
    Initializes the game renderer
  */
  start(): void {
    Bestiary.getBat().spawn(0, 0);
    this.renderer.frame();
  }
}
