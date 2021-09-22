/*
  This class represents the stack-based text console present in the game
*/

class Console {
  private ctx: CanvasRenderingContext2D;
  stack: Line[][];
  offset: number;
  lines: Line[];

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    this.offset = 0;
    this.stack = [];
    this.lines = [];
  }

  /*
    Clears all text from the Console
  */
  clear(): void {
    this.offset = 0;
    this.lines = [];
  }

  /*
    Adds a line or lines to the Console
  */
  append(msg: string, click: () => void = null): void {
    if (this.ctx.measureText(msg).width > 490) {
      let line = [];
      const stack = msg.split(' ');
      while (stack.length > 0) {
        line.push(stack.shift());
        if (this.ctx.measureText(line.join(' ')).width > 490) {
          if (line.length > 1) {
            stack.unshift(line.pop());
          }
          this.lines.push(new Line(line.join(' '), click));
          line = [];
        }
      }
      this.lines.push(new Line(line.join(' '), click));
    } else {
      this.lines.push(new Line(msg, click));
    }
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
  click(x: number, y: number): void {
    const index = Math.floor(y / 25);
    if (index < this.lines.length && this.lines[index].click !== null) {
      if ((this.offset || this.lines.length > 8) && index === 7) {
        if (this.offset + 7 < this.lines.length && x < 250) {
          this.offset++;
        }
        if (this.offset && x >= 250) {
          this.offset--;
        }
      } else {
        this.lines[this.offset + index].click();
      }
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
    let end = (this.offset || this.lines.length > 8) ? 7 : 8;
    end = Math.min(end, this.lines.length - this.offset);
    for (let a = 0; a < end; a++) {
      this.ctx.fillText(this.lines[this.offset + a].msg, 5, (a + 1) * 25);
    }
    if (end === 7) {
      if (this.offset + 7 < this.lines.length) {
        this.ctx.fillText('Down', 5, 200);
      }
      if (this.offset) {
        this.ctx.fillText('Up', 400, 200);
      }
    }
    this.ctx.translate(0, -500);
  }
}
