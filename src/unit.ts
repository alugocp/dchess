/*
  This class represents the shared functionality between every unit in the game
*/

class Unit {
  handlers: Handler[];
  clickable: boolean;
  maxHealth: number;
  health: number;
  tags: string[];
  name: string;
  x: number;
  y: number;

  constructor(name: string, health: number, tags: string[] = [], handlers: Handler[] = []) {
    this.handlers = handlers;
    this.maxHealth = health;
    this.clickable = true;
    this.health = health;
    this.tags = tags;
    this.name = name;
  }

  /*
    Spawns this unit on the map
  */
  spawn(x: number, y: number): void {
    Game.game.map.put(this, x, y);
    this.x = x;
    this.y = y;
    this.emit(new SpawnSignal(this));
  }

  /*
    Moves this unit to a different spot on the map
  */
  move(x: number, y: number): void {
    Game.game.map.put(null, this.x, this.y);
    Game.game.map.put(this, x, y);
    let oldx = this.x;
    let oldy = this.y;
    this.x = x;
    this.y = y;
    this.emit(new MoveSignal(this, oldx, oldy));
  }

  /*
    Emits a signal to every other unit
  */
  emit(signal: Signal): void {
    for (var x = 0; x < Map.WIDTH; x++) {
      for (var y = 0; y < Map.HEIGHT; y++) {
        let unit: Unit = Game.game.map.get(x, y);
        if (unit !== null) {
          unit.trigger(signal);
        }
      }
    }
  }

  /*
    Triggers every handler for a certain signal
  */
  trigger(signal: Signal): void {
    for (var a = 0; a < this.handlers.length; a++) {
      if (this.handlers[a].trigger === signal.type) {
        this.handlers[a].activate(signal, this);
      }
    }
  }
}
