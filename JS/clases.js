class Personajes{
    constructor({posicion, imageSrc, escala = 1}){
        this.posicion = posicion
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.escala = escala
        
        }

dibujarse(){
     ctx.drawImage(
        this.image, 
        this.posicion.x,
         this.posicion.y, 
         this.image.width * this.escala, 
         this.image.height * this.escala
         )
}

update(){
    this.dibujarse()

    }
}





class Peleadores {
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
    if(this.posicion.y + this.height + this.velocidad.y >= canvas.height - 97 ){
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