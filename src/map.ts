/*
  This class represents the game map
*/

class Map {
  static readonly HEIGHT: number = 5;
  static readonly WIDTH: number = 5;
  tiles: Unit[][];

  constructor() {
    this.tiles = [];
    for(var a = 0; a < Map.WIDTH; a++) {
      this.tiles.push([]);
      for(var b = 0; b < Map.HEIGHT; b++) {
        this.tiles[a].push(null);
      }
    }
  }

  /*
    Grabs the Unit currently at x,y on the map
  */
  get(x: number, y: number): Unit {
    return this.tiles[x][y];
  }

  /*
    Places a Unit at x,y on the map
  */
  put(unit: Unit, x: number, y: number): Unit {
    return this.tiles[x][y]=unit;
  }
}