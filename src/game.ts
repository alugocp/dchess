/*
  This class is the central data structure for the game logic
*/

class Game {
  static game: Game;
  selection: (x: number, y: number) => void;
  canvas: HTMLCanvasElement;
  turnHolders: Unit[];
  renderer: Renderer;
  console: Console;
  turnUnit: Unit;
  map: Map;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.renderer = new Renderer(this.canvas);
    this.console = new Console(this.canvas);
    this.turnHolders = [];
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
          unit.display(that.console);
        }
      } else {
        that.console.click(x, y - 500);
      }
    }
  }

  /*
    Handles turn-based progression
  */
  nextTurn(): void {
    if (!this.turnHolders.length) {
      let speeds = {};
      let units: Unit[] = this.map.getAllUnits();
      for (const a in units) {
        if (speeds[units[a].speed] === undefined) {
          speeds[units[a].speed] = [];
        }
        speeds[units[a].speed].push(units[a]);
      }
      for (const k in speeds) {
        speeds[k].sort((a, b) => Math.round(Math.random()) * 2 - 1);
        this.turnHolders = [...speeds[k], ...this.turnHolders];
      }
    }
    this.turnUnit = this.turnHolders.shift();
    while (this.turnUnit.dead && this.turnHolders.length) {
      this.turnUnit = this.turnHolders.shift();
    }
    if (this.turnUnit.dead) {
      this.nextTurn();
    }
    if (this.turnUnit.playable) {
      this.turnUnit.display(this.console);
    } else {
      let that = this;
      this.console.clear();
      this.console.append(`${this.turnUnit.name}'s turn...`);
      setTimeout(() => that.nextTurn(), 500);
    }
  }

  /*
    Tells the game to wait for a selection
  */
  select(effect: (x: number, y: number) => void): void {
    this.console.clear();
    this.console.append('Please select a tile');
    this.selection = effect;
  }

  /*
    Initializes the game renderer
  */
  start(): void {
    // TESTING
    Bestiary.bat().spawn(0, 0);
    Bestiary.rock().spawn(2, 1);
    Bestiary.rat().spawn(3, 0);
    Bestiary.slime().spawn(2, 3);
    Bestiary.cactus().spawn(2, 2);
    Bestiary.spook().spawn(0, 4);
    Bestiary.rock().spawn(4, 4);
    Bestiary.ponchoWarrior().spawn(4, 2);
    // END TESTING
    this.nextTurn();
    this.renderer.frame();
  }
}
