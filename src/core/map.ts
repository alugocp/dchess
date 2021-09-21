/*
  This class represents the game map
*/

class Map {
  static readonly HEIGHT: number = 5;
  static readonly WIDTH: number = 5;
  tiles: Unit[][];

  constructor() {
    this.tiles = [];
    for (let a = 0; a < Map.WIDTH; a++) {
      this.tiles.push([]);
      for (let b = 0; b < Map.HEIGHT; b++) {
        this.tiles[a].push(null);
      }
    }
  }

  /*
    Grabs the Unit currently at x,y on the map
  */
  get(x: number, y: number): Unit {
    if (x < 0 || y < 0 || x >= Map.WIDTH || y >= Map.HEIGHT) {
      return null;
    }
    return this.tiles[x][y];
  }

  /*
    Places a Unit at x,y on the map
  */
  put(unit: Unit, x: number, y: number): Unit {
    return this.tiles[x][y] = unit;
  }
}
