const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;
let intervaloSerpiente;
let direccionActual = "derecha";
let puntaje = 0;
let velocidad = 300;
let comida = {x: 1, y: 1};
let serpiente = [
  {x: 10, y: 10},  
];

// funciones de dibujo 

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();

}
function saludar() {
  alert("Hola, bienvenido al juego de la serpiente!");
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
      ctx.fillStyle = "#000000";
    }else{
      ctx.fillStyle = "#ffffffce";
    }
    pintarParte(parte.x, parte.y);
  }
}
dibujarTodo();

//funciones de movimiento

function cambiarDireccion(direccion){
  if(direccionActual === "derecha" && direccion === "izquierda") return;
  if(direccionActual === "izquierda" && direccion === "derecha") return;
  if(direccionActual === "arriba" && direccion === "abajo") return;
  if(direccionActual === "abajo" && direccion === "arriba") return;
  direccionActual = direccion;
}
function moverDerecha(){
  let cabezaActual = serpiente[0];
  let nuevaCabeza = {
    x: cabezaActual.x + 1,
    y: cabezaActual.y 
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverIzquierda(){
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x - 1,
    y: cabeza.y
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba(){
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y - 1 
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function moverAbajo(){
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y + 1 
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function moverSerpiente(){
  let cola = serpiente[serpiente.length - 1];
  if(direccionActual === "derecha"){
    moverDerecha();
  } else if(direccionActual === "izquierda"){
    moverIzquierda();
  } else if(direccionActual === "arriba"){
    moverArriba();
  } else if(direccionActual === "abajo"){
    moverAbajo();
  }
  if(verificarColision()){
    clearInterval(intervaloSerpiente);
    document.getElementById("estado").innerText ="💀Game Over💀";
  }
  if(atrapaComida()){
    puntaje++;
    document.getElementById("puntaje").innerText = puntaje;
    serpiente.push({...cola});
    generarComida();
  }
  dibujarTodo();
}

//funciones comida
function generarComida(){
  let columnas = canvas.width / TAMANIO_CELDA;
  let filas = canvas.height / TAMANIO_CELDA;
  comida.x = Math.floor(Math.random() * columnas);
  comida.y = Math.floor(Math.random() * filas);
}
function pintarComida(){
  ctx.fillStyle = "#ffffff";
  pintarParte(comida.x, comida.y);
}
function atrapaComida(){
  let cabeza = serpiente[0];
  if(cabeza.x === comida.x && cabeza.y === comida.y){
    return true;
  } else {
    return false;
  }
}

//funciones de acciones juego

function iniciarJuego(){
  intervaloSerpiente = setInterval(moverSerpiente, velocidad);
}
function pausarJuego(){
  clearInterval(intervaloSerpiente);
}
function verificarColision(){
  let cabeza = serpiente[0];
  let columnas = canvas.width / TAMANIO_CELDA;
  let filas = canvas.height / TAMANIO_CELDA;
  if(cabeza.x < 0){
    return true;
  }
  if(cabeza.x >= columnas){
    return true;
  }
  if(cabeza.y < 0){
    return true;
  }
  if(cabeza.y >= filas){
    return true;
  }
  return false;
}
function reiniciarJuego(){
  clearInterval(intervaloSerpiente);
  serpiente = [{ x: 10, y: 10 }];
  direccionActual = "derecha";
  puntaje = 0;
  document.getElementById("puntaje").innerText = puntaje;
  document.getElementById("estado").innerText = "Listo";
  generarComida();
  dibujarTodo();
  iniciarJuego();
}
