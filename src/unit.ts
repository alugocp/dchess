/*
  This class represents the shared functionality between every unit in the game
*/

class Unit {
  frames: HTMLImageElement[];
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
    Adds an animation to this Unit
  */
  setFrames(...frames: string[]): Unit {
    this.frames = frames.map(x => {
      const img = new Image();
      img.src = `img/${x}`;
      return img;
    });
    return this;
  }

  /*
    Sets whether or not this Unit is clickable
  */
  setClickable(clickable: boolean) {
    this.clickable = clickable;
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
    const oldx = this.x;
    const oldy = this.y;
    this.x = x;
    this.y = y;
    this.emit(new MoveSignal(this, oldx, oldy));
  }

  /*
    Emits a signal to every other unit
  */
  emit(signal: Signal): void {
    for (let x = 0; x < Map.WIDTH; x++) {
      for (let y = 0; y < Map.HEIGHT; y++) {
        const unit: Unit = Game.game.map.get(x, y);
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
    for (const handler in this.handlers) {
      if (handler.trigger === signal.type) {
        handler.activate(signal, this);
      }
    }
  }
}
