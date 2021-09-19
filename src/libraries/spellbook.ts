/*
  This class is a dictionary for Moves
*/

class Spellbook {

  /*
    Allows a unit to move
  */
  static move(max: number = 1): Spell {
    return new Spell(`Move - move (${max})`, (self: Unit) => {
      Game.game.select((x: number, y: number) => {
        const dx = Math.abs(self.x - x);
        const dy = Math.abs(self.y - y);
        if (dx < max + 1 && dy < max + 1 && !(dx === 0 && dy === 0) && Game.game.map.get(x, y) === null) {
          self.move(x, y);
        }
      });
    });
  }

  /*
    A basic attack spell
  */
  static attack(name: string, damage: number): Spell {
    return new Spell(`${name} - Deals ${damage} damage`, (self: Unit) => {
      Game.game.select((x: number, y: number) => {
        const target: Unit = Game.game.map.get(x, y);
        if (target !== null) {
          const signal: AttackSignal = new AttackSignal(self, target, damage);
          self.emit(signal);
          target.takeDamage(signal.damage);
        }
      });
    });
  }
}
