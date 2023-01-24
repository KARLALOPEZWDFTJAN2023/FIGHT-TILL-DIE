const canvas = document.getElementById("space")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)

const gravedad= 0.2

class Sprite{
    constructor(posicion, velocidad){
       this.posicion = posicion
       this.velocidad = velocidad
        this.height = 150
    }

    dibujarse(){
        ctx.fillStyle = "red"
        ctx.fillRect(this.posicion.x, this.posicion.y,  50, this.height)
    }

    moverse(){
        this.dibujarse()
        this.velocidad += gravedad
        this.posicion.y += this.velocidad.y
    
        if(this.posicion.y + this.height + this.velocidad.y >= canvas.height){
            this.velocidad.y = 0 
        }else{
            this.velocidad.y += gravedad
        }
    }

}

const jugador = new Sprite({
    posicion: {
    x: 0,
    y: 0
    },
    velocidad: {
        x: 0,
        y: 0
    }

})

jugador.dibujarse()

const enemigo = new Sprite({
posicion:{
    x:400,
    y:100
},
velocidad:{
    x: 0,
    y: 0
}
})

enemigo.dibujarse()


console.log(jugador)
    
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    jugador.moverse()
    enemigo.moverse()
    console.log("empieza")


window.addEventListener("keydown", () => {
    switch(evento){
        
    }
console.log(evento,)
})


