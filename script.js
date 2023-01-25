const canvas = document.getElementById("space")
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)

const gravedad = 0.7

class Personajes{
    constructor({posicion, velocidad, color = 'red', offset}){
        this.posicion = posicion
        this.velocidad = velocidad
        this.width = 50
        this.height = 150
        this.ultKey
        this.cajaGolpe = {
            posicion:{
                x: this.posicion.x,
                y: this.posicion.y
            },
            offset: offset,
            width :100,
            height:50
        }
        this.color = color
        this.estaAtacando
        this.vida = 100
        }

dibujarse(){
    ctx.fillStyle = this.color
    ctx.fillRect(this.posicion.x, this.posicion.y, this.width, this.height)

    //Donde se dibuja la caja de golpe
    if(this.estaAtacando){   
    ctx.fillStyle = 'green'
    ctx.fillRect(this.cajaGolpe.posicion.x, 
        this.cajaGolpe.posicion.y, 
        this.cajaGolpe.width,
         this.cajaGolpe.height
         )
    }
}


update(){
    this.dibujarse()
    this.cajaGolpe.posicion.x = this.posicion.x + this.cajaGolpe.offset.x
    this.cajaGolpe.posicion.y = this.posicion.y
    this.posicion.x += this.velocidad.x
    this.posicion.y += this.velocidad.y
    if(this.posicion.y + this.height + this.velocidad.y >= canvas.height){
        this.velocidad.y = 0
    } else{
        this.velocidad.y += gravedad
    }
}

ataque(){
    this.estaAtacando = true
    setTimeout(() => {
        this.estaAtacando = false
    }, 100)
}
}

const jugador = new Personajes({
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



const enemigo = new Personajes({
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

function colisionRectangular({  rectangulo1,  rectangulo2})
{
    return (  
        rectangulo1.cajaGolpe.posicion.x + rectangulo1.cajaGolpe.width >= rectangulo2.posicion.x && 
       rectangulo1.cajaGolpe.posicion.x <= rectangulo2.posicion.x + rectangulo2.width &&
        rectangulo1.cajaGolpe.posicion.y + rectangulo1.cajaGolpe.height >= rectangulo2.posicion.y &&
        rectangulo1.cajaGolpe.posicion.y <= rectangulo2.posicion.y + rectangulo2.height
        )
}
let cronometro = 10
function decrementoTiempo() {

if(cronometro > 0){
    setTimeout(decrementoTiempo, 1000)
    cronometro--
    document.getElementById('cronometro').innerHTML = cronometro
}
}
if(cronometro === 0){

    if(jugador.vida === enemigo.vida){
    console.log('EMPATE')
    
    }
}
    
    

decrementoTiempo()

function animacion(){
    window.requestAnimationFrame(animacion)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
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