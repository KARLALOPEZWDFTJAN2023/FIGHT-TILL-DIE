function colisionRectangular({  rectangulo1,  rectangulo2})
{
    return (  
        rectangulo1.cajaGolpe.posicion.x + rectangulo1.cajaGolpe.width >= rectangulo2.posicion.x && 
       rectangulo1.cajaGolpe.posicion.x <= rectangulo2.posicion.x + rectangulo2.width &&
        rectangulo1.cajaGolpe.posicion.y + rectangulo1.cajaGolpe.height >= rectangulo2.posicion.y &&
        rectangulo1.cajaGolpe.posicion.y <= rectangulo2.posicion.y + rectangulo2.height
        )
}

function determinarGanador({jugador, enemigo, cronometroId}) {
    clearTimeout(cronometroId)
    document.querySelector('#apareceTexto').style.display = 'flex'
    if(jugador.vida === enemigo.vida){
    document.querySelector('#apareceTexto').innerHTML = 'Empate'     
} else if (jugador.vida > enemigo.vida){
    document.querySelector('#apareceTexto').innerHTML = 'Gana jugador 1'
} else if (jugador.vida < enemigo.vida){
    document.querySelector('#apareceTexto').innerHTML = 'Gana jugador 2'
}
}

let cronometro = 10
let cronometroId

function decrementoTiempo() {
if(cronometro > 0){
   cronometroId = setTimeout(decrementoTiempo, 1000)
    cronometro--
    document.getElementById('cronometro').innerHTML = cronometro
}

if(cronometro === 0){
    determinarGanador({jugador, enemigo, cronometroId})
}
}