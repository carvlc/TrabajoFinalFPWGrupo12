import Phaser from "phaser";

class Nivel4 extends Phaser.Scene {

    // constructor por defecto
    constructor() {
        super('Nivel4');
        this.platforms = null;
        this.countBomb = 0;
        this.puntaje = 0;
        this.tiempo = 0;
    }

    init(data) {
        this.puntaje = data.puntaje;
        this.sonido = data.sonido;
    }

    preload() {
        this.load.image('sky', './img/sky.png')
        this.load.image('ground', './img/platform.png')
        this.load.image('star', './img/star.png')
        this.load.image('bomb', './img/bomb.png')
        this.load.spritesheet('dude', './img/dude.png', { frameWidth: 32, frameHeight: 48 })
        this.load.spritesheet('corazon', './img/corazon.png', { frameWidth: 32, frameHeight: 32 })
        this.load.audio('recolectar', './sound/recolectar.mp3');
        this.load.audio('salto', './sound/salto.mp3');
        this.load.audio('muerte', './sound/muerte.mp3');
    }

    create() {
        this.add.image(400, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // configuracion para el player
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);//para que rebote
        this.player.setCollideWorldBounds(true);//para que colicione con los limites del mapa

        this.object = this.physics.add.staticSprite(400, 25, 'corazon');
        this.tiempo = 15;
        this.countBomb = 0;

        // para el movimiento del personaje
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        // para las coliciones entre los elementos player con las plataformas
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.object, this.collectObject, null, this);

        // para detectar las entradas del jugador a traves del teclado, tambien puede ser mouse
        this.cursors = this.input.keyboard.createCursorKeys();

        // ---------- se agregan las estrellas -----------
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 10, // cantidad de estrellas
            setXY: { x: 12, y: 0, stepX: 70 }//empieza en la posicion x e y , se repite cada 70 en x
        })

        // repote de las estrellas
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // coliciones de las estrellas con las plataformas
        this.physics.add.collider(this.stars, this.platforms);

        // coliciones de las estrellas con el player
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        // para controlar el puntaje
        this.scoreText = this.add.text(16, 16, 'Puntaje: ' + this.puntaje, { fontSize: '32px', fill: '#000' });

        //tiempo
        this.timeText = this.add.text(16, 50, 'Tiempo: ' + this.tiempo, { fontSize: '32px', fill: '#000' });

        // agregar las bombas
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        let x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) :
            Phaser.Math.Between(0, 400);
        let bomb = this.bombs.create(x, 10, 'bomb');
        let bomb1 = this.bombs.create(x, 250, 'bomb');
        let bomb2 = this.bombs.create(x, 450, 'bomb');
        let bomb3 = this.bombs.create(x, 150, 'bomb');
        let bomb4 = this.bombs.create(x, 300, 'bomb');

        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        bomb1.setBounce(1);
        bomb1.setCollideWorldBounds(true);
        bomb1.setVelocity(Phaser.Math.Between(-200, 200), 20);

        bomb2.setBounce(1);
        bomb2.setCollideWorldBounds(true);
        bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);

        bomb3.setBounce(1);
        bomb3.setCollideWorldBounds(true);
        bomb3.setVelocity(Phaser.Math.Between(-200, 200), 20);

        bomb4.setBounce(1);
        bomb4.setCollideWorldBounds(true);
        bomb4.setVelocity(Phaser.Math.Between(-200, 200), 20);

        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.restarTiempo();
            }
        })
    }



    // actualizaciones continuas del juego
    update() {

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
            this.sound.play('salto');
        }

    }
    //metodo para restar el tiempo
    restarTiempo() {
        this.tiempo--;
        this.timeText.setText('Tiempo: ' + this.tiempo);
        if (this.tiempo == 0) {
            this.sonido.stop();
            this.sound.play('muerte');
            this.scene.start("GameOver", {
                puntaje: this.puntaje
            });
        }
    }

    //metodo para recolectar el corazon
    collectObject(player, object) {
        object.disableBody(true, true);
        this.sonido.stop();
        this.scene.start("Win", {
            puntaje: this.puntaje
        });
    }

    // metodo que hace desaparecer a las estrellas y sumar puntaje
    collectStar(player, star) {
        star.disableBody(true, true);
        this.puntaje += 10;
        this.scoreText.setText('Puntaje: ' + this.puntaje);
        this.sound.play('recolectar');
    }

    // metodo para cuando choca con una bomba
    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.sound.play('muerte');
        this.sonido.stop();
        this.scene.start('GameOver', { puntaje: this.puntaje })
    }

}
export default Nivel4;