/*
  This class represents a line on the console
*/

class Line {
  msg: string;
  click: () => void;

  constructor(msg: string, click: () => void = null) {
    this.click = click;
    this.msg = msg;
  }
}
