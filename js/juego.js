// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla =
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia =
{
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano()
{
  if(grilla[0][0]==1 && grilla[0][1]==2 && grilla[0][2]==3 && grilla[1][0]==4 && grilla[1][1]==5 &&
     grilla[1][2]==6 && grilla[2][0]==7 && grilla[2][1]==8 && grilla[2][2]==9)
    {
      return true;
    }
  else
    {
      return false;
    }
}



// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador()
{
    alert("Enhorabuena has ganado!");
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2)
{
  var vacio=grilla[fila1][columna1];
  var imagen=grilla[fila2][columna2];
  var elementovacio=document.getElementById('imagen'+vacio);
  var elementoimagen=document.getElementById('imagen'+imagen);
  var clonvacio=elementovacio.cloneNode(true);
  var clonimagen=elementoimagen.cloneNode(true);
  var padre=elementovacio.parentNode;
  padre.replaceChild(clonvacio, elementoimagen);
  padre.replaceChild(clonimagen, elementovacio);
  grilla[fila1][columna1]=imagen;
  grilla[fila2][columna2]=vacio;
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna)
{
  posicionVacia.fila=nuevaFila;
  posicionVacia.columna=nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna)
{
if(fila <=2 && fila >=0)
{
if(columna <=2 && columna >=0)
  {
    return true;
  }
}
else
  {
    return false;
  }
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion)
{

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 38)
  {
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 40)
  {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 37)
  {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 39)
  {
    nuevaFilaPiezaVacia = posicionVacia.fila
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia))
  {
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}



// Extras, ya vienen dadas

function mezclarPiezas(veces)
{
  if(veces<=0)
  {
    return;
  }
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function()
  {
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas()
{
  document.body.onkeydown = (function(evento)
  {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano){
      setTimeout(function(){
        mostrarCartelGanador();
      },500);
    }
    evento.preventDefault();
  })
}

function iniciar()
{
  mezclarPiezas(60);
  capturarTeclas();
}
