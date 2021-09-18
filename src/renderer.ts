
class Renderer {
  readonly TILE_SIZE: number = 100;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  frame() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.lineWidth = 2;
    for (var a = 0; a < 5; a++) {
      for (var b = 0; b < 5; b++) {
        this.ctx.strokeRect(a * this.TILE_SIZE, b * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE);
      }
    }

    // Schedule the next frame
    let that = this;
    setTimeout(() => that.frame(), 250);
  }
}
