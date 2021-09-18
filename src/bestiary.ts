/*
  This class contains the definitions of every unit
*/

class Bestiary {

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
