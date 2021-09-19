/*
  This class represents the shared functionality between every unit in the game
*/

class Unit {
  frames: HTMLImageElement[];
  properties: string[];
  handlers: Handler[];
  clickable: boolean;
  maxHealth: number;
  spells: Spell[];
  health: number;
  tags: string[];
  name: string;
  x: number;
  y: number;

  constructor(name: string, health: number) {
    this.maxHealth = health;
    this.clickable = true;
    this.properties = [];
    this.health = health;
    this.handlers = [];
    this.spells = [];
    this.name = name;
    this.tags = [];
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
  setClickable(clickable: boolean): Unit {
    this.clickable = clickable;
    return this;
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
    for (const a in this.handlers) {
      if (this.handlers[a].trigger === signal.type) {
        this.handlers[a].activate(signal, this);
      }
    }
  }

  /*
    Adds a spell to this unit
  */
  addSpell(spell: Spell): Unit {
    this.spells.push(spell);
    return this;
  }

  /*
    Adds a passive property to this unit
  */
  addProperty(property: Property): Unit {
    this.handlers.push(new Handler(property.trigger, property.effect));
    this.properties.push(property.description);
    return this;
  }

  /*
    Adds a tag to this unit
  */
  addTag(tag: string): Unit {
    this.tags.push(tag);
    return this;
  }
}
