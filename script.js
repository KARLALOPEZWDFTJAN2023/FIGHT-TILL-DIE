const canvas = document.getElementById("space")
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)


const gravedad = 0.7

const background = new Personajes({
    posicion: {
        x: 0,
        y: 0
    },
    imageSrc: '../FIGHT-TILL-DIE/ASSETS/fondo2.jpeg',
    escala : 1.85
})

const dragon = new Personajes({
    posicion: {
        x: 550,
        y: 50
    },
    imageSrc: '../FIGHT-TILL-DIE/ASSETS/rcjrbB6Li (1).gif',
    escala: 0.6
})




const jugador = new Peleadores({
   posicion: {
    x: 0,
    y: 0
    },
    velocidad: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }

})



const enemigo = new Peleadores({
    posicion: {
     x: 400,
     y: 100
     },
     velocidad:{
         x: 0,
         y: 0
     },
     color: 'blue',
     offset: {
        x: -50,
        y: 0
    }
 })



console.log(jugador)

const keys = {
    a:{
        apretado: false
    },
    d:{
        apretado: false
    },
    w:{
        apretado:false
    },
    ArrowRight:{
        apretado:false
    },
    ArrowLeft:{
        apretado:false
    }

}


decrementoTiempo()

function animacion(){
    window.requestAnimationFrame(animacion)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    dragon.update()
    jugador.update()
    enemigo.update()

    jugador.velocidad.x = 0
    enemigo.velocidad.x = 0
    
    //Movimiento del jugador
    if(keys.a.apretado && jugador.ultKey === 'a'){
        jugador.velocidad.x = -5
    } else if (keys.d.apretado && jugador.ultKey === 'd'){
        jugador.velocidad.x = 5
    }

     //Movimiento del enemigo
     if(keys.ArrowLeft.apretado && enemigo.ultKey === 'ArrowLeft'){
        enemigo.velocidad.x = -5
    } else if (keys.ArrowRight.apretado && enemigo.ultKey === 'ArrowRight'){
        enemigo.velocidad.x = 5
    }

    //Hacemos la colision 
if(
    colisionRectangular({
        rectangulo1: jugador,
        rectangulo2: enemigo
    }) &&
    jugador.estaAtacando
){
    jugador.estaAtacando = false
    enemigo.vida -= 20
    document.getElementById("vidaEnemigo").style.width = enemigo.vida + '%'
}

if(
    colisionRectangular({
        rectangulo1: enemigo,
        rectangulo2: jugador
    }) &&
    enemigo.estaAtacando
){
    enemigo.estaAtacando = false
    jugador.vida -= 20
    document.getElementById("vidaJugador").style.width = jugador.vida + '%'
}
//Terminar el juego  basado en la vida
if(enemigo.vida <= 0 || jugador.vida <= 0 ){
determinarGanador({jugador, enemigo, cronometroId})
}


}
animacion()

window.addEventListener('keydown', (evento) => {
  
    switch(evento.key){
        case 'd':
        keys.d.apretado = true
            jugador.ultKey= 'd'
        break
        case 'a':
            keys.a.apretado = true
            jugador.ultKey= 'a'
        break
            
        case 'w':
            jugador.velocidad.y = -19
        break
        case ' ':
            jugador.ataque()
            break

        case 'ArrowRight':
            keys.ArrowRight.apretado = true
            enemigo.ultKey = 'ArrowRight'
         
        break
        case 'ArrowLeft':
            keys.ArrowLeft.apretado = true
            enemigo.ultKey= 'ArrowLeft'
        break
        case 'ArrowUp':
            enemigo.velocidad.y = -19
        break
        case 'ArrowDown':
            enemigo.ataque()
            break
    }



})

window.addEventListener('keyup', (evento) => {
    switch(evento.key){
        case 'd':
            keys.d.apretado = false
        break
        case 'a':
            keys.a.apretado = false
        break
      
    }
//Teclas del enemigo

switch(evento.key){
    case 'ArrowRight':
        keys.ArrowRight.apretado = false
    break
    case 'ArrowLeft':
        keys.ArrowLeft.apretado = false
    break
   
}

    
})