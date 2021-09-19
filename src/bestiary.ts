/*
  This class contains the definitions of every unit
*/

class Bestiary {

  /*
    Rock obstacle
  */
  static getRock(): Unit {
    return new Unit('Rock', 0)
      .setFrames('rock.png')
      .setClickable(false);
  }

  /*
    Bat enemy
  */
  static getBat(): Unit {
    return new Unit('Bat', 20)
      .setFrames('bat.png')
      .addTag('flying')
      .addProperty('Friendly - this unit introduces itself with a console.log() message', SpawnSignal.type, (signal: Signal, self: Unit): void => {
        const data: SpawnSignal = signal as SpawnSignal;
        if (data.unit === self) {
          console.log('A bat has spawned!');
        }
      })
      .addSpell(new Spell('Bite - the bat bites a target', (self: Unit) => {
        console.log('Chomp');
      }));
  }
}
