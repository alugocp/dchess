/*
  This class represents an event handler
*/

class Handler {
  activate: (signal: Signal, self: Unit) => void;
  trigger: string;

  constructor(trigger: string, activate: (signal: Signal, self: Unit) => void) {
    this.activate = activate;
    this.trigger = trigger;
  }
}
