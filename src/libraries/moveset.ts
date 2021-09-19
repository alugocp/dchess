/*
  This class ia a dictionary for Moves
*/

class Spellbook {

  /*
    Allows a unit to move
  */
  static move(): Spell {
    return new Spell('Move', (self: Unit) => {
      Game.game.select((x: number, y: number) => {
        if(Game.game.map.get(x, y) === null) {
          self.move(x, y);
        }
      });
    });
  }
}
