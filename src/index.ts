function initialize():void {
  let canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.onclick = function() {
    console.log('Canvas clicked!');
  }
  let renderer: Renderer = new Renderer(canvas);
  renderer.frame();
}
