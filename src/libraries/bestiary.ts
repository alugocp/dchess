/*
  This class contains the definitions of every unit
*/

class Bestiary {

  /*
    Rock obstacle
  */
  static rock(): Unit {
    return new Unit('Rock', 0)
      .setFrames('rock.png')
      .setClickable(false);
  }

  /*
    Bat enemy
  */
  static bat(): Unit {
    return new Unit('Bat', 20)
      .setFrames('bat.png')
      .addTag('flying')
      .addProperty(new Property('Friendly - this unit introduces itself with a console.log() message', SpawnSignal.type, (signal: Signal, self: Unit): void => {
        const data: SpawnSignal = signal as SpawnSignal;
        if (data.unit === self) {
          console.log('A bat has spawned!');
        }
      }))
      .addSpell(Spellbook.move())
      .addSpell(new Spell('Bite - the bat bites a target', (self: Unit) => {
        Game.game.select((x: number, y: number) => {
          Game.game.console.append('The bat bit someone, oh no');
        });
      }));
  }
}
