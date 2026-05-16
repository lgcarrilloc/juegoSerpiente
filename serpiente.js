const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarParte(5, 5);
  pintarParte(10, 2);
  pintarParte(5, 23);
  pintarParte(23, 15);
  pintarParte(0, 12);
  pintarParte(23, 0);

}

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero(){
  ctx.strokeStyle = "#b8d400";
  ctx.lineWidth = 1;
  for(let x = 0; x <= canvas.width; x += TAMANIO_CELDA){
    ctx.beginPath();
    ctx.moveTo(x, 0); 
    ctx.lineTo(x, canvas.height); 
    ctx.stroke();
  }
  for(let y = 0; y <= canvas.height; y += TAMANIO_CELDA){
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

}
function pintarParte(lineaX, lineaY){
  let x = lineaX * TAMANIO_CELDA;
  let y = lineaY * TAMANIO_CELDA;
  ctx.fillStyle = "orange";
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}
// ✅ IMPORTANTE: dibujar al cargar, dibujar tablero
dibujarTodo();



