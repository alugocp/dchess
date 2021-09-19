/*
  This class represents the stack-based text console present in the game
*/

class Console {
  private ctx: CanvasRenderingContext2D;
  stack: Line[][];
  lines: Line[];

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    this.stack = [];
    this.lines = [];
  }

  /*
    Clears all text from the Console
  */
  clear(): void {
    this.lines = [];
  }

  /*
    Adds a line or lines to the Console
  */
  append(msg: string, click: () => void = null): void {
    this.lines.push(new Line(msg, click));
  }

  /*
    Creates a new set of Lines for the stack
  */
  push() {
    this.stack.push(this.lines);
    this.lines = [];
  }

  /*
    Pops the last set of Lines from the stack
  */
  pop() {
    this.lines = this.stack.pop();
  }

  /*
    Handles when the Console is clicked
  */
  click(y: number): void {
    let index = Math.floor(y / 25);
    if (index < this.lines.length && this.lines[index].click !== null) {
      this.lines[index].click();
    }
  }

  /*
    Handles rendering for the Console
  */
  draw(): void {
    this.ctx.translate(0, 500);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, 500, 200);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px serif';
    for (var a = 0; a < this.lines.length; a++) {
      this.ctx.fillText(this.lines[a].msg, 5, (a + 1) * 25);
    }
    this.ctx.translate(0, -500);
  }
}
