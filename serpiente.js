const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;
const serpiente = [
  {x: 10, y: 10}, 
  {x: 9, y: 10},
  {x: 8, y: 10},
  {x: 7, y: 10},
  {x: 6, y: 10},
  {x: 5, y: 10},
  {x: 4, y: 10},
  {x: 3, y: 10}  
];


function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();

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
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente(){
  for(let i=0; i< serpiente.length; i++){
    let parte = serpiente[i];
    if(i===0){
      ctx.fillStyle = "#ff9d00";
    }else{
      ctx.fillStyle = "#ff0090";
    }
    pintarParte(parte.x, parte.y);
  }
}
dibujarTodo();



