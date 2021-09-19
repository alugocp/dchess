/*
  This class represents a spell that a Unit has access to
*/

class Spell {
  effect: (self: Unit) => void;
  description: string;

  constructor(description: string, effect: (self: Unit) => void) {
    this.description = description;
    this.effect = effect;
  }
}
