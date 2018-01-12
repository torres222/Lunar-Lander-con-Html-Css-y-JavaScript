var y = 10; 
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
var fuel = 100;
var activo = true;

//al cargar la página
window.onload = function(){
	
    document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	
	document.getElementById("hidem").onclick = function () {
	document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	
	
//encender/apagar el motor al hacer click en la pantalla***************
	
	  document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
}
	}
	
	
	
	
	//Empezar a mover nave 
	start();
	if (y > 0)
  {

  //encender/apagar al apretar/soltar una tecla
  document.onkeydown = motorOn;
  document.onkeyup = motorOff;
}
}
 

//Definición de funciones

function start(){
	//cada intervalo de tiempo moverá la nave	
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}


function moverNave(){
		//cambia velocidad y posicion
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=Math.round(v);
	y +=v*dt;
	document.getElementById("altura").innerHTML=Math.round(80-y);

	//mover hasta que top sea un 80% de la pantalla
	if (y<80){
		document.getElementById("nave").style.top = y+"%";
	} else {
    if (v>=5){
		
	//explota si velocidad mayor a 5ms
      explota();
      activo = false;
      document.getElementById('loose').style.display = 'inline-block';
      window.setTimeout(function(){ document.location.reload(true); }, 10000);


      stop();
    } else aterrizado();

  if (fuel == 0){
    activo = false;
    timerFuel = null;
    stop();
  }
	}
}

function motorOn (){
	//el motor da aceleración a la nave y sale fuego de debajo
	
	a = -g;
  if (activo == true){
  a = -g;
  document.getElementById("imgNave").src = "img/naveencendida.png";
  if (timerFuel == null)
      timerFuel = setInterval(function() {
        actualizar();
      },100);
if (fuel <= 0 ){
	//el motor se apaga si la gasolina se acaba
  motorOff();
  document.getElementById("fuel").innerHTML = 0;
}
}
}

function motorOff (){
  if (activo == true){
	  //el motor no da aceleración a la nave y no sale fuego de debajo
  a = g;
  document.getElementById("imgNave").src = "img/nave.png";
  clearInterval(timerFuel);
  timerFuel = null;
}
}

function actualizar(){
		//Restamos combustible hasta que se agota
  fuel -= 1;
  document.getElementById("fuel").innerHTML = fuel;
}

function aterrizado(){
		//Cuando aterriza con éxito aparecen imagenes de celebración
  motorOff();
  stop();
  activo = false;
  document.getElementById('confeti').style.display = 'block';
  document.getElementById('win').style.display = 'inline-block';
}

function explota(){
	//Cuando aterriza muy rápido explota
  document.getElementById("imgNave").src = "img/explota.gif";
  stop();
}


function pausar(){
	//Pausa el juego
 motorOff();
 clearInterval(timerFuel);
 timerFuel = null;
 activo = false;
 stop();
 document.getElementById("pausa").style.display = 'none';
 document.getElementById("reanudar").style.display = 'inline-block';

}

function play(){
	//Play, reanuda la partida
  activo = true;
  start();
clearInterval(timerFuel);
  document.getElementById("pausa").style.display = 'inline-block';
  document.getElementById("reanudar").style.display = 'none';
  
}

function reload(){
	//Cuando se pulsa hace reset, reinicia el juego
  location.reload(true);
}



