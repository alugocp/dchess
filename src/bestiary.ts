/*
  This class contains the definitions of every unit
*/

class Bestiary {

  /*
    Rock obstacle
  */
  static getRock(): Unit {
    let rock: Unit = new Unit('Rock', 0);
    rock.clickable = false;
    return rock;
  }

  /*
    Bat enemy
  */
  static getBat(): Unit {
    return new Unit('Bat', 20, ['flying'], [new Handler('spawn', (signal: Signal, self: Unit): void => {
      let data: SpawnSignal = signal as SpawnSignal;
      if (data.unit === self) {
        console.log('A bat has spawned!');
      }
    })]);
  }
}
