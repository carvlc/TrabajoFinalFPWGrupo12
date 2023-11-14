import Phaser from "phaser";

class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }

    preload(){
        this.load.audio('musica', './sound/fondo.mp3');
        this.load.image('inicio', './img/Inicio.png');
        this.load.image('button', './img/boton1.png');
        this.load.audio('comenzar', './sound/game_start.mp3');
    }

    create(){
        this.sonido = this.sound.add('musica');
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

        this.startButton = this.add.image(400, 500, 'button').setInteractive();
        this.startButton.on('pointerdown', () =>{
            this.comenzar = this.sound.add('comenzar', {volume: 0.1});
            this.comenzar.play();
            this.scene.start('Nivel1', {sonido: this.sonido});
            
        });
    }
}

export default Menu;