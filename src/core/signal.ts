/*
  The base Signal class
*/
class Signal {
  type: string;

  constructor(type: string) {
    this.type = type;
  }
}

/*
  Gets emitted when a Unit is spawned
*/
class SpawnSignal extends Signal {
  static readonly type: string = 'spawn';
  unit: Unit;

  constructor(unit: Unit) {
    super(SpawnSignal.type);
    this.unit = unit;
  }
}

/*
  Gets emitted when a Unit moves
*/
class MoveSignal extends Signal {
  static readonly type: string = 'move';
  oldx: number;
  oldy: number;
  unit: Unit;

  constructor(unit: Unit, oldx: number, oldy: number) {
    super(MoveSignal.type);
    this.unit = unit;
    this.oldx = oldx;
    this.oldy = oldy;
  }
}

/*
  Gets emitted when a Unit selects another Unit to attack
*/
class AttackSignal extends Signal {
  static readonly type: string = 'attack';
  attacker: Unit;
  damage: number;
  target: Unit;

  constructor(attacker: Unit, target: Unit, damage: number) {
    super(AttackSignal.type);
    this.attacker = attacker;
    this.target = target;
    this.damage = damage;
  }
}

/*
  Gets emitted when a Unit dies
*/
class DeathSignal extends Signal {
  static readonly type: string = 'death';
  unit: Unit;

  constructor(unit: Unit) {
    super(DeathSignal.type);
    this.unit = unit;
  }
}
