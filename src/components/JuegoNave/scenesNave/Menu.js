import Phaser from "phaser";
class Menu extends Phaser.Scene{

    // constructor por defecto
    constructor(){
        super("Menu");
    }

    preload(){
        this.load.image('inicio', './img/space3.png');
        this.load.spritesheet('nave', './img/nave.png', { frameWidth: 70, frameHeight: 62 });
        this.load.image('white', './img/white.png');
        this.load.spritesheet('sega', './img/nave4.png', { frameWidth: 60, frameHeight: 56});
        this.load.image('nombre', './img/titulo.png');
        this.load.audio('fondo', './sound/menu.mp3');
    }

    create(){

        //se carga el sonido de fondo
        this.sonido = this.sound.add('fondo');
        const soundConfig = {
            volume: 0.3,
            loop: true
        }
        if (!this.sound.locked) {
            this.sonido.play(soundConfig)
        }
        else {
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () =>{
                this.sonido.play(soundConfig)
            })
        }

        this.add.image(400, 300, 'inicio');
        this.add.image(400,275, 'nombre');
        this.nave = this.add.image(200, 100, "nave");
        this.sega = this.add.image(600, 400, 'sega');
        this.sega.setFlipX(true);

        //se agrega efecto de pixeleado a la camara
        const pixelated = this.cameras.main.postFX.addPixelate(-1);

        //se agrega un boton interactivo
        const buttonBox = this.add.rectangle(this.sys.scale.width / 2, this.sys.scale.height - 100, 150, 50, 0x000000, 1);
        buttonBox.setInteractive();
        //se agrega texto al boton
        const buttonText = this.add.text(this.sys.scale.width / 2, this.sys.scale.height - 100, "START").setOrigin(0.5).setColor('#66FFFF').setFontSize(20);

        // click para cambiar escena
        buttonBox.on('pointerdown', () => {
            // transicion a siguiente escena
            this.add.tween({
                //objetivo
                targets: pixelated,
                //duracion
                duration: 700,
                //numero de milisegundos para buscar
                amount: 40,
                //cuando se completa
                onComplete: () => {
                    //desvanecimiento de la camara
                    this.cameras.main.fadeOut(100);
                    //cambio de escena
                    this.scene.start('Seleccion',{sonido: this.sonido});
                }
            })
        });

         // Hover
         //cuando el puntero esta encima
         buttonBox.on('pointerover', () => {
            //le da un relleno determinado al boton
            buttonBox.setFillStyle(0x66FFFF, 1);
            //cambia el puntero
            this.input.setDefaultCursor('pointer');
            //establece el color del texto
            buttonText.setColor('#000000');
        });

        //cuando el puntero esta afuera
        buttonBox.on('pointerout', () => {
             //le da un relleno determinado al boton
            buttonBox.setFillStyle(0x000000, 1);
            //cambia el puntero al por defecto
            this.input.setDefaultCursor('default');
            //establece el color del texto
            buttonText.setColor('#66FFFF');
        });

        //agrega particulas
        this.flame = this.add.particles(this.nave.x -90, this.nave.y, 'white',
            {
                //colores de la particulas
                color: [ 0xfacc22, 0xf89800, 0xf83600, 0x9f0404 ],
                colorEase: 'quad.out',
                lifespan: 1000,
                angle: { min: 175, max: 185 },
                scale: { start: 0.40, end: 0, ease: 'sine.out' },
                speed: 200,
                advance: 2000,
                blendMode: 'ADD'
            });

        this.flame2 = this.add.particles(this.sega.x +90, this.sega.y, 'white',
        {
            color: [ 0x96e0da, 0x937ef3 ],
            colorEase: 'quad.out',
            lifespan: 1000,
            angle: { min: 175, max: 185 },
            scale: { start: 0.40, end: 0, ease: 'sine.out' },
            speed: 200,
            advance: 2000,
            blendMode: 'ADD'
        });
        this.flame2.setRotation(3.14159);
    }

    update(){

        this.nave.x = Phaser.Math.Wrap(this.nave.x + 1, 1,this.sys.scale.width+70);
        this.flame.setPosition(this.nave.x -25, this.nave.y);
        this.sega.x = Phaser.Math.Wrap(this.sega.x - 1, -70,this.sys.scale.width+1);
        this.flame2.setPosition(this.sega.x +25, this.sega.y);
    }

}

export default Menu;