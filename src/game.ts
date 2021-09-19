/*
  This class is the central data structure for the game logic
*/

class Game {
  static game: Game;
  selection: (target: Unit) => void;
  canvas: HTMLCanvasElement;
  renderer: Renderer;
  console: Console;
  map: Map;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.renderer = new Renderer(this.canvas);
    this.console = new Console(this.canvas);
    this.selection = null;
    this.map = new Map();
    const that = this;
    this.canvas.onclick = (e) => {
      const rect = that.canvas.getBoundingClientRect();
      const x = e.clientX - rect.x;
      const y = e.clientY - rect.y;
      if (y < 500) {
        const unit: Unit = that.map.get(Math.floor(x / Renderer.TILE_SIZE), Math.floor(y / Renderer.TILE_SIZE));
        that.console.clear();
        if (that.selection !== null) {
          if (unit !== null && unit.clickable) {
            that.selection(unit);
          }
          that.selection = null;
        } else {
          if (unit !== null && unit.clickable) {
            that.console.append(`${unit.name} (${unit.health}/${unit.maxHealth})`);
            that.console.append(unit.tags.join(', '));
            for (const a in unit.properties) {
              that.console.append(unit.properties[a]);
            }
            for (const a in unit.spells) {
              that.console.append(unit.spells[a].description, () => unit.spells[a].effect(unit));
            }
          }
        }
      } else {
        that.console.click(y - 500);
      }
    }
  }

  /*
    Tells the game to wait for a selection
  */
  select(effect: (target: Unit) => void): void {
    this.console.clear();
    this.console.append('Please select a unit');
    this.selection = effect;
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
