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
