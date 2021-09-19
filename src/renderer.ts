/*
  This class handles canvas rendering functionality
*/

class Renderer {
  static readonly TILE_SIZE: number = 100;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  /*
    Logic behind a single graphical frame
  */
  frame(): void {
    this.ctx.fillStyle = 'white';
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.lineWidth = 2;
    const half = Renderer.TILE_SIZE/2;
    for (let x = 0; x < Map.WIDTH; x++) {
      for (let y = 0; y < Map.HEIGHT; y++) {
        const unit = Game.game.map.get(x, y);
        if (unit !== null) {
          if (unit.frames) {
            this.ctx.translate(x * Renderer.TILE_SIZE, y * Renderer.TILE_SIZE)
            this.ctx.scale(2, 2);
            this.ctx.drawImage(unit.frames[0], 1, 1);
            this.ctx.scale(0.5, 0.5);
            this.ctx.translate(- x * Renderer.TILE_SIZE, - y * Renderer.TILE_SIZE)
          } else {
            this.ctx.beginPath();
            this.ctx.arc((x * Renderer.TILE_SIZE) + half, (y * Renderer.TILE_SIZE) + half, half, 0, Math.PI*2);
            this.ctx.closePath();
            this.ctx.fill();
          }
        }
        this.ctx.strokeRect(x * Renderer.TILE_SIZE, y * Renderer.TILE_SIZE, Renderer.TILE_SIZE, Renderer.TILE_SIZE);
      }
    }
    Game.game.console.draw();

    // Schedule the next frame
    const that = this;
    setTimeout(() => that.frame(), 250);
  }
}
