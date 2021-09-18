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
  unit: Unit;

  constructor(unit: Unit) {
    super('spawn');
    this.unit = unit;
  }
}

/*
  Gets emitted when a Unit moves
*/
class MoveSignal extends Signal {
  oldx: number;
  oldy: number;
  unit: Unit;

  constructor(unit: Unit, oldx: number, oldy: number) {
    super('move');
    this.unit = unit;
    this.oldx = oldx;
    this.oldy = oldy;
  }
}
