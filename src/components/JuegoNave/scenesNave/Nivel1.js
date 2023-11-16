import Phaser from "phaser";
class Nivel1 extends Phaser.Scene {
    constructor() {
        super('Nivel1');
        this.vida = 100;
        this.puntaje = 0;
    }

    preload() {
        this.load.image('sky', './img/background1.png')
        this.load.image('enemy', './img/enemy.png')
        this.load.image('white','./img/white.png')
        this.load.image('shoot', './img/shoot.png')
        this.load.image('item', './img/shoot4.png')
        this.load.image('pared', './img/pipe.png')
        this.load.spritesheet('sega', './img/nave4.png', { frameWidth: 60, frameHeight: 56 })
        this.load.audio('fondo', './sound/menu.mp3');
        this.load.audio('laser', './sound/blaster.mp3');
        this.load.audio('muerteEnemigo', './sound/alien_death.wav');
        this.load.audio('muerte', './sound/player_death.wav');
        this.load.audio('vida', './sound/vida.mp3');
    }

    create() {
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
        this.disparoDoble=false;

        this.puntaje = 0;
        this.vida = 100;
        this.reload = true;
        this.balas = this.physics.add.group();
        this.bala;

        this.skyline = this.add.blitter(0, 0, 'sky');
        this.skyline.create(0, 0);
        this.skyline.create(800, 0);

        this.flame = this.add.particles(0, 0, 'white',
        {
            color: [ 0x96e0da, 0x937ef3 ],
            colorEase: 'quad.out',
            lifespan: 1000,
            angle: { min: 175, max: 185 },
            scale: { start: 0.40, end: 0, ease: 'sine.out' },
            speed: 220,
            advance: 2000,
            blendMode: 'ADD'
        });


        // se crean paredes para eliminar elementos fuera del mundo
        this.paredes = this.physics.add.staticGroup();
        this.paredes.create(-100, this.game.config.height / 2, 'pared').setScale(2).refreshBody();
        this.paredes.create(this.game.config.width + 200, this.game.config.height / 2, 'pared').setScale(2).refreshBody();


        this.player = this.physics.add.sprite(this.game.config.width / 8, this.game.config.height / 2, 'sega');
        this.player.setCollideWorldBounds(true);
        this.flame.startFollow(this.player,-25,0);

        // para el movimiento de la nave player (animaciones)
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'sega', frame: 0 }],
            frameRate: 20
        })
        this.anims.create({
            key: 'up',
            frames: [{ key: 'sega', frame: 1 }],
            frameRate: 10
        })
        this.anims.create({
            key: 'down',
            frames: [{ key: 'sega', frame: 2 }],
            frameRate: 10
        })

        // para detectar las entradas de teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        // para los enemigos
        this.createEnemy();

        this.time.addEvent({
            delay: 1000,
            callback: this.createEnemy,
            callbackScope: this,
            repeat: -1
        })

        this.physics.add.collider(this.balas, this.paredes, this.outBullet, null, this);
        this.puntajeText = this.add.text(16, 16, 'Puntaje: ' + this.puntaje + '/250', { fontSize: '32px', fill: '#fff' })
        this.vidaText = this.add.text(16, 50, 'Vida: ' + this.vida + '%', { fontSize: '32px', fill: '#fff' })

    }

    update() {
        this.skyline.x -= 1;
        this.skyline.x %= -800;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-400);
            this.player.anims.play('turn');
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(400);
            this.player.anims.play('turn');
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-500);
            this.player.anims.play('up')
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(500)
            this.player.anims.play('down')
        }
        else {
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
            this.player.anims.play('turn', true)
        }
        // cuando se pulse la tecla 32(espacio) la nave dispara
        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode == 32 && this.reload) {
                this.disparar();
                this.disparo = this.sound.add('laser', {volume: 0.1});
                this.disparo.play();
                
            }
        })
        this.physics.add.collider(this.player, this.powerup, this.obtenerPowerup, null, this);
        this.physics.add.collider(this.player, this.doubleShot, this.obtenerDoubleShot, null, this);
    }


    recarga() {
        this.reload = false;
        if (!this.addreload) {
            this.time.addEvent({
                delay: 700,
                callback: () => {
                    this.reload = true;
                },
                callbackScope: this,
                repeat: 0
            })
        }
    }
  
    disparar() {
        
        if(this.disparoDoble==true){
            this.balaDoble()
        }else{
            this.balaUnica();
        }
    }
    balaUnica(){
        this.recarga();
        this.posicionPlayer = this.player.body.position;
        this.bala = this.balas.create(this.posicionPlayer.x + 70, this.posicionPlayer.y + 30, 'shoot');
        this.bala.body.velocity.x = 800;
    }
    balaDoble(){
        this.recarga();
        this.posicionPlayer = this.player.body.position;
        this.bala = this.balas.create(this.posicionPlayer.x + 70, this.posicionPlayer.y + 10, 'shoot');
        this.bala2 = this.balas.create(this.posicionPlayer.x + 70, this.posicionPlayer.y + 50, 'shoot');
        this.bala2.body.velocity.x = 800;
        this.bala.body.velocity.x = 800;
    }

    createEnemy() {
        let enemyOrigenHorizontal = 750;
        for (let i = 0; i < 1; i++) {
            let enemyOrigenVertical = Phaser.Math.Between(31, 569);
            this.enemy = this.physics.add.sprite(enemyOrigenHorizontal, enemyOrigenVertical, "enemy");
            this.enemy.body.velocity.x = -200;
            this.physics.add.overlap(this.player, this.enemy, this.hitenemy, null, this);
            this.physics.add.collider(this.enemy, this.balas, this.hitbullet, null, this);
            this.physics.add.collider(this.enemy, this.paredes, this.outEnemy, null, this);
        }
    }

    outBullet(balas) {
        balas.destroy();
        //console.log('se elimino la bala')
    }

    outEnemy(enemy) {
        enemy.destroy();
        //console.log('se elimino el enemigo')
    }

    hitenemy(player, enemy) {
        enemy.destroy();
        this.vida -= 25;
        this.vidaText.setText('Vida: ' + this.vida + '%');
        player.setTint(0xff0000)
            this.time.addEvent({
                delay: 400,
                callbackScope: this,
                callback: function () {
                    player.setTint();
                }
            })
        if (this.vida == 0) {
            this.vida = 100;
            this.sound.play('muerte');
            this.sonido.stop('fondo');
            this.scene.start('GameOver', { puntaje: this.puntaje });
        }

    }
 

    hitbullet(enemy, balas) {
        // console.log("funca");
        let contPower=Phaser.Math.Between(1,100);
        this.puntaje += 10;
        balas.destroy();
        enemy.destroy();
        this.muerteEnemigo = this.sound.add('muerteEnemigo', {volume: 0.1});
        this.muerteEnemigo.play();
        this.puntajeText.setText("Puntaje: " + this.puntaje + "/250");
        if (this.puntaje == 250) {
            this.scene.start("Nivel2", { puntaje: this.puntaje , vida: this.vida, sonido: this.sonido});
        }
        if (this.puntaje == 100) {
            this.particlesItem = this.add.particles(0, 0, 'item', {
                speed: 100,
                scale: { start: 1, end: 0 },
                blendMode: 'ADD',
            })
            this.powerup = this.physics.add.sprite(600, 400, 'item').setVelocity(150, 200).setCollideWorldBounds(true, 1, 1, true).setScale();
            this.particlesItem.startFollow(this.powerup);
        }
        if(contPower>90){
            this.doubleShotParticles = this.add.particles(0, 0, 'item', {
                speed: 100,
                scale: { start: 1, end: 0 },
                blendMode: 'ADD',
            })
            this.doubleShot = this.physics.add.sprite(600, 400, 'item').setVelocity(150, 200).setCollideWorldBounds(true, 1, 1, true).setScale();
            this.doubleShotParticles.startFollow(this.doubleShot);
        }

    }

    obtenerDoubleShot(){
        console.log('double shot agarrado');
        this.doubleShot.destroy();
        this.doubleShotParticles.destroy();
        this.disparoDoble=true;
        this.time.addEvent({
            delay: 7000,
            callback: () => {
                this.disparoDoble = false;
            },
            callbackScope: this,
            repeat:0 
        })
    }
    obtenerPowerup() {
        console.log('powerup agarrado');
        this.vida += 100;
        this.vidaJugador = this.sound.add('vida', {volume: 0.1});
        this.vidaJugador.play();
        this.vidaText.setText('Vida: ' + this.vida + '%');
        this.powerup.destroy();
        this.particlesItem.destroy();
        this.player.setTint(0x90ee90);
            this.time.addEvent({
                delay: 400,
                callbackScope: this,
                callback: function () {
                    this.player.setTint();
                }

            })
    }

}
export default Nivel1;