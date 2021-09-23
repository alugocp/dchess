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
      .addTag(Tags.FLYING)
      .addSpell(Spellbook.move())
      .addSpell(Spellbook.attack('Bite', 5));
  }

  /*
    Rat enemy
  */
  static rat(): Unit {
    return new Unit('Rat', 20)
      .setFrames('rat.png')
      .addSpell(Spellbook.move())
      .addSpell(Spellbook.attack('Nibble', 5));
  }

  /*
    Slime enemy
  */
  static slime(): Unit {
    return new Unit('Slime', 10)
      .setFrames('slime.png')
      .addSpell(Spellbook.attack('Acid', 10));
  }

  /*
    Cactus enemy
  */
  static cactus(): Unit {
    return new Unit('Cactus', 10)
      .setFrames('cactus.png')
      .addProperty(new Property('Spiky - any unit that moves next to this unit will take damage', MoveSignal.type, (signal: Signal, self: Unit): void => {
        const data: MoveSignal = signal as MoveSignal;
        if (Math.abs(data.unit.x - self.x) <= 1 && Math.abs(data.unit.y - self.y) <= 1) {
          data.unit.takeDamage(1);
        }
      }));
  }

  /*
    Spook enemy
  */
  static spook(): Unit {
    return new Unit('Spook', 10)
      .setFrames('spook.png')
      .addSpell(Spellbook.move(2));
  }

  /*
    Poncho Warrior hero
  */
  static ponchoWarrior(): Unit {
    return new Unit('Poncho Warrior', 40)
      .setFrames('poncho.png')
      .setPlayable(true)
      .setSpeed(1)
      .addSpell(Spellbook.move(1))
      .addSpell(Spellbook.smash())
      .addSpell(Spellbook.attack('Punch', 1))
      .addSpell(Spellbook.attack('Kick', 2))
      .addSpell(Spellbook.attack('Slash', 3))
      .addSpell(Spellbook.attack('Haymaker', 4))
      .addSpell(Spellbook.attack('Body slam', 5));
  }
}
