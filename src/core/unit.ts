/*
  This class represents the shared functionality between every unit in the game
*/

class Unit {
  frames: HTMLImageElement[];
  properties: string[];
  handlers: Handler[];
  clickable: boolean;
  maxHealth: number;
  playable: boolean;
  spells: Spell[];
  health: number;
  tags: string[];
  speed: number;
  dead: boolean;
  name: string;
  x: number;
  y: number;

  constructor(name: string, health: number) {
    this.maxHealth = health;
    this.clickable = true;
    this.playable = false;
    this.properties = [];
    this.health = health;
    this.handlers = [];
    this.dead = false;
    this.spells = [];
    this.name = name;
    this.speed = 0;
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
    Sets whether or not this Unit is playable
  */
  setPlayable(playable: boolean): Unit {
    this.playable = playable;
    return this;
  }

  /*
    Sets this unit's speed
  */
  setSpeed(speed: number): Unit {
    this.speed = speed;
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
    Causes this user to take damage
  */
  takeDamage(damage: number) {
    if (!this.clickable) {
      return;
    }
    this.health -= damage;
    if (this.health <= 0) {
      Game.game.map.put(null, this.x, this.y);
      this.emit(new DeathSignal(this));
      this.dead = true;
    }
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

  /*
    Displays this unit's information on the console
  */
  display(console: Console): void {
    console.clear();
    console.append(`${this.name} (${this.health}/${this.maxHealth})`);
    console.append(this.tags.length ? ('Tags: ' + this.tags.join(', ')) : '');
    this.properties.map((prop) => console.append(prop));
    this.spells.map((spell) => console.append(spell.description, this.playable ? () => {
      if (Game.game.turnUnit === this) {
        spell.effect(this);
      }
    } : undefined));
  }
}
