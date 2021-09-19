/*
  This class represents a property of a Unit
*/

class Property {
  effect: (signal: Signal, self: Unit) => void;
  description: string;
  trigger: string;

  constructor(description: string, trigger: string, effect: (signal: Signal, self: Unit) => void) {
    this.description = description;
    this.trigger = trigger;
    this.effect = effect;
  }
}
