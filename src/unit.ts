/*
  This class represents the shared functionality between every unit in the game
*/

class Unit {
  tags: string[];
  health: number;
  x: number;
  y: number;

  constructor(health: number, tags: string[]) {
    this.health = health;
    this.tags = tags;
  }

  /*
    Spawns this unit on the map
  */
  spawn(x: number, y: number): void {
    Game.game.map.put(this, x, y);
    this.x = x;
    this.y = y;
  }

  /*
    Moves this unit to a different spot on the map
  */
  move(x: number, y: number): void {
    Game.game.map.put(null, this.x, this.y);
    Game.game.map.put(this, x, y);
    this.x = x;
    this.y = y;
  }
}
