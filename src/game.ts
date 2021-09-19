/*
  This class is the central data structure for the game logic
*/

class Game {
  static game: Game;
  selection: (x: number, y: number) => void;
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
        const ux = Math.floor(x / Renderer.TILE_SIZE);
        const uy = Math.floor(y / Renderer.TILE_SIZE);
        const unit: Unit = that.map.get(ux, uy);
        that.console.clear();
        if (that.selection !== null) {
          that.selection(ux, uy);
          that.selection = null;
        } else if (unit !== null && unit.clickable) {
          that.console.append(`${unit.name} (${unit.health}/${unit.maxHealth})`);
          that.console.append(unit.tags.join(', '));
          unit.properties.map((prop) => that.console.append(prop));
          unit.spells.map((spell) => that.console.append(spell.description, () => spell.effect(unit)));
        }
      } else {
        that.console.click(y - 500);
      }
    }
  }

  /*
    Tells the game to wait for a selection
  */
  select(effect: (x: number, y: number) => void): void {
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