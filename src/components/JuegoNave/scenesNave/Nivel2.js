import Phaser from "phaser";
class Nivel2 extends Phaser.Scene {
    constructor() {
        super('Nivel2');
        this.scoreText="";
        this.vida=0;
        this.puntaje=0;
    }
    init(data){
        this.puntaje = data.puntaje;
        this.vida = data.vida;
        this.sonido = data.sonido;
        this.numJugador = data.numJugador;
    }
    preload() {
        this.load.image('space', './img/space3.png');
        this.load.image('enemy', './img/enemy.png');
        this.load.image('shoot', './img/shoot.png');
        this.load.spritesheet('nave', './img/nave.png', { frameWidth: 70, frameHeight: 62 });
        this.load.spritesheet('sega', './img/nave4.png', { frameWidth: 60, frameHeight: 56 });
        this.load.image('pared', './img/pipe.png')
        this.load.audio('laser', './sound/blaster.mp3');
        this.load.audio('muerteEnemigo', './sound/alien_death.wav');
        this.load.audio('muerte', './sound/player_death.wav');
        this.load.image('white', './img/white.png');
        this.load.spritesheet('meteoro', './img/meteo.png',{ frameWidth : 34.1, frameHeight: 34});
    }

    create() {
        this.doubleCheck=false;
        this.reload = true;
        this.balas = this.physics.add.group();
        this.bala;
        this.disparoDoble = false;
        this.add.image(400, 300, 'space');
        console.log(this.numJugador);

        this.skyline = this.add.blitter(0, 0, 'space');
        this.skyline.create(0, 0);
        this.skyline.create(800, 0);

        if (this.numJugador == 1) {

            this.player = this.physics.add.sprite(100, 200, 'nave');
            this.player.setCollideWorldBounds(true);

            this.flame = this.add.particles(0, 0, 'white',
            {
                color: [ 0xfacc22, 0xf89800, 0xf83600, 0x9f0404 ],
                colorEase: 'quad.out',
                lifespan: 1000,
                angle: { min: 175, max: 185 },
                scale: { start: 0.40, end: 0, ease: 'sine.out' },
                speed: 200,
                advance: 2000,
                blendMode: 'ADD'
            });

            this.flame.startFollow(this.player,-20,0);

            this.anims.create({
                key: 'izquierda',
                frames: [{ key: 'nave', frame: 0 }],
                frameRate: 10
            });
            this.anims.create({
                key: 'quieto',
                frames: [{ key: 'nave', frame: 0 }],
                frameRate: 20
            })
            this.anims.create({
                key: 'derecha',
                frames: [{ key: 'nave', frame: 0 }],
                frameRate: 10
            })
            this.anims.create({
                key: 'arriba',
                frames: [{ key: 'nave', frame: 2 }],
                frameRate: 10
            })
            this.anims.create({
                key: 'abajo',
                frames: [{ key: 'nave', frame: 1 }],
                frameRate: 10
            })
            
        }
        
        if (this.numJugador == 2) {

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

            this.player = this.physics.add.sprite(this.game.config.width / 8, this.game.config.height / 2, 'sega');
            this.player.setCollideWorldBounds(true);
            this.flame.startFollow(this.player,-25,0);

            this.anims.create({
                key: 'segaquieto',
                frames: [{ key: 'sega', frame: 0 }],
                frameRate: 20
            })
            this.anims.create({
                key: 'segaarriba',
                frames: [{ key: 'sega', frame: 1 }],
                frameRate: 10
            })
            this.anims.create({
                key: 'segaabajo',
                frames: [{ key: 'sega', frame: 2 }],
                frameRate: 10
            })
            this.anims.create({
                key: 'segaizquierda',
                frames: [{ key: 'sega', frame: 0 }],
                frameRate: 10
            });
            this.anims.create({
                key: 'segaderecha',
                frames: [{ key: 'sega', frame: 0 }],
                frameRate: 10
            })
            
        }

        // se crean paredes para eliminar elementos fuera del mundo
        this.paredes = this.physics.add.staticGroup();
        this.paredes.create(-100, this.game.config.height / 2, 'pared').setScale(2).refreshBody();
        this.paredes.create(this.game.config.width + 200, this.game.config.height / 2, 'pared').setScale(2).refreshBody();

        this.createMeteoro();

        this.time.addEvent({
            delay: 500,
            callback: this.createMeteoro,
            callbackScope: this,
            repeat: -1
        })

        this.cursors = this.input.keyboard.createCursorKeys();

        // para los enemigos
        this.createEnemy();

        this.time.addEvent({
            delay: 500,
            callback: this.createEnemy,
            callbackScope: this,
            repeat: -1
        })

        this.anims.create({
            key: 'meteoritoAnimacion',
            frames: this.anims.generateFrameNames('meteoro', {star: 0, end:26}),
            frameRate: 10,
        })

        this.physics.add.collider(this.balas, this.paredes, this.outBullet, null, this);
        this.scoreText = this.add.text(16, 16, 'Puntaje: ' + this.puntaje + '/750', { fontSize: '32px', fill: '#FFFFFF' });
        this.vidaText = this.add.text(16, 50, "Vida: " + this.vida + '%', { fontSize: '32px', fill: '#FFFFFF' });

    }

    update() {

        this.skyline.x -= 1;
        this.skyline.x %= -800;

        if (this.numJugador == 1) {

            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-400);
                this.player.anims.play('izquierda');
            }
            else if (this.cursors.right.isDown) {
                this.player.setVelocityX(400);
                this.player.anims.play('derecha');
            }
            else if (this.cursors.up.isDown) {
                this.player.setVelocityY(-500);
                this.player.anims.play('arriba')
            }
            else if (this.cursors.down.isDown) {
                this.player.setVelocityY(500)
                this.player.anims.play('abajo')
            }
            else {
                this.player.setVelocityY(0);
                this.player.setVelocityX(0);
                this.player.anims.play('quieto', true)
            }
            
        }

        if (this.numJugador == 2) {

            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-400);
                this.player.anims.play('segaizquierda');
            }
            else if (this.cursors.right.isDown) {
                this.player.setVelocityX(400);
                this.player.anims.play('segaderecha');
            }
            else if (this.cursors.up.isDown) {
                this.player.setVelocityY(-500);
                this.player.anims.play('segaarriba')
            }
            else if (this.cursors.down.isDown) {
                this.player.setVelocityY(500)
                this.player.anims.play('segaabajo')
            }
            else {
                this.player.setVelocityY(0);
                this.player.setVelocityX(0);
                this.player.anims.play('segaquieto', true)
            }
            
        }

        // if (this.cursors.left.isDown) {
        //     this.player.setVelocityX(-400);
        //     this.player.anims.play('izquierda');
        // }
        // else if (this.cursors.right.isDown) {
        //     this.player.setVelocityX(400);
        //     this.player.anims.play('derecha');
        // }
        // else if (this.cursors.up.isDown) {
        //     this.player.setVelocityY(-500);
        //     this.player.anims.play('arriba')
        // }
        // else if (this.cursors.down.isDown) {
        //     this.player.setVelocityY(500)
        //     this.player.anims.play('abajo')
        // }
        // else {
        //     this.player.setVelocityY(0);
        //     this.player.setVelocityX(0);
        //     this.player.anims.play('quieto', true)
        // }
        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode == 32 && this.reload) {
                this.disparar();
                this.disparo = this.sound.add('laser', {volume: 0.1});
                this.disparo.play();
            }
        })
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
    
        let enemyDistanciaHorizontal = 800;

        for (let i = 0; i < 1; i++) {
            let enemyPosicionAltura = Phaser.Math.Between(31, 569);
            this.enemy = this.physics.add.sprite(enemyDistanciaHorizontal, enemyPosicionAltura, 'enemy');
            this.enemy.body.velocity.x = -200;
            
            this.physics.add.overlap(this.player, this.enemy, this.hitenemy, null, this);
            this.physics.add.collider(this.enemy,this.balas,this.hitbullet, null, this);
            this.physics.add.collider(this.enemy, this.paredes, this.outEnemy, null, this);
        }
    }

    createMeteoro() {
    
        let meteoroHorizontal = 800;

        for (let i = 0; i < 1; i++) {
            let meteoroPosicionAltura = Phaser.Math.Between(31, 569);
            this.meteoro = this.physics.add.sprite(meteoroHorizontal, meteoroPosicionAltura, 'meteoro');
            this.meteoro.body.velocity.x = -200;
            this.meteoro.checkWorldBounds= true;

            this.meteoro.play({key:'meteoritoAnimacion', repeat: -1});

            this.physics.add.overlap(this.player, this.meteoro, this.hitmeteoro, null, this);
            this.physics.add.collider(this.meteoro, this.paredes, this.outMeteoro, null, this);
            this.physics.add.overlap(this.balas,this.meteoro,this.bulletmeteor,null,this)
        }
    }
    bulletmeteor(balas,meteoro){
        meteoro.destroy();
    }   
    outBullet(balas) {
        balas.destroy();
    }

    outEnemy(enemy) {
        enemy.destroy();
    }

    outMeteoro(meteoro) {
        meteoro.destroy();
    }

    hitenemy(player,enemy){
        enemy.destroy();
        this.vida=this.vida-25;
        this.vidaText.setText("Vida: "+this.vida+"%");
        player.setTint(0xff0000)
            this.time.addEvent({
                delay: 400,
                callbackScope: this,
                callback: function () {
                    player.setTint();
                }
            })     
        if(this.vida ==0){
            this.sound.play('muerte');
            this.sonido.stop();
            this.scene.start("GameOver",{puntaje: this.puntaje});
        }
    }

    hitmeteoro(player,meteoro){
        meteoro.destroy();
        this.vida=this.vida-25;
        this.vidaText.setText("Vida: "+this.vida+"%");
        player.setTint(0xff0000)
            this.time.addEvent({
                delay: 400,
                callbackScope: this,
                callback: function () {
                    player.setTint();
                }
            })     
        if(this.vida ==0){
            this.sound.play('muerte');
            this.sonido.stop();
            this.scene.start("GameOver",{puntaje: this.puntaje});
        }
    }
    
    hitbullet(enemy,bala){
        let contPower=Phaser.Math.Between(1,100);
        this.puntaje=this.puntaje+10;
        bala.destroy();
        enemy.destroy();
        this.muerteEnemigo = this.sound.add('muerteEnemigo', {volume: 0.1});
        this.muerteEnemigo.play();
        this.scoreText.setText("Puntaje: "+this.puntaje+"/750");  
        if(this.puntaje==750){
            const pixelated = this.cameras.main.postFX.addPixelate(-1);
            this.add.tween({
                targets: pixelated,
                duration: 700,
                amount: 40,
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                    this.scene.start("Nivel3",{puntaje: this.puntaje, vida: this.vida, sonido: this.sonido, numJugador: this.numJugador});
                }
            })
        }
        if(contPower>90 &&    this.doubleCheck == false){
            this.doubleCheck = true;
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
                this.doubleCheck = false;
            },
            callbackScope: this,
            repeat:0 
        })
    }
}
export default Nivel2;