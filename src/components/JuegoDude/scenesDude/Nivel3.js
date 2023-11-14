import Phaser from "phaser";

class Nivel3 extends Phaser.Scene{
    constructor(){
        super("Nivel3");
        this.platforms = null;
        this.scoreText="";
        this.puntaje=0;
        this.soundConfig={
            volume:1,
            loop:false
        }
    }
    init(data){
        this.puntaje = data.puntaje;
        this.sonidom = data.sonido;
    }
    
    preload(){

        this.load.audio("bum","./sound/prum.mp3");
        this.load.audio("A","./sound/A.mp3");
        this.load.image('sky','./img/sky.png');
        this.load.image('ground','./img/platform.png');
        this.load.image('star','./img/star.png');
        this.load.image('bomb','./img/bomb.png');
        this.load.spritesheet('dude', './img/dude.png', { frameWidth: 32, frameHeight: 48 });

        this.load.audio('recolectar', './sound/recolectar.mp3');
        this.load.audio('salto', './sound/salto.mp3');
        this.load.audio('muerte', './sound/muerte.mp3');
        
    }

    create()
    {
        this.sonido= this.sound.add("bum");
        this.sonidoEstrella= this.sound.add("A");
        //creamos las paltaformas 
        this.add. image(400,300,"sky");
        this.platforms=this.physics.add.staticGroup();
        this.platforms.create(400,568,"ground").setScale(2).refreshBody();
        this.platforms.create(200,150,"ground");
        this.platforms.create(70,400,"ground");
        this.platforms.create(750,200,"ground");
        this.platforms.create(600,350,"ground");
        //añadimos jugador y estrella
        this.player=this.physics.add.sprite(100,500,"dude");
        //colisiones jugador con los bordes de la escena
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        //creacion de las animaciondes del player
        this.anims.create({
            key:"left",
            frames:this.anims.generateFrameNumbers("dude",{start:0,end:3}),
            frameRate:10,
            repeat:-1
        });
        this.anims.create({
            key:"turn",
            frames:[{key:"dude",frame:4}],
            frameRate:20,
        });
        this.anims.create({
            key:"right",
            frames:this.anims.generateFrameNumbers("dude",{start:5,end:8}),
            frameRate:10,
            repeat:-1
        });
        //colisiones jugador plataformas
        this.physics.add.collider(this.player,this.platforms);
        //configurar movimiento del player
        this.cursors = this.input.keyboard.createCursorKeys();
        //agregar estrellitas y sus colisiones
        this.stars = this.physics.add.group({
            key:"star",
            repeat:11,//cantidad de estrellitas
            setXY:{x:12,y:0,stepX:70,stepY:40 } //determina la posicion inicial y cada cuantos pasos se generara la siguiente
        });
       
        //que reboten que reboten!!!!
       
        this.stars.children.iterate(function(child){
            child.setBounceY(Phaser.Math.FloatBetween(0.9,1));
        });
        //colisiones de las estrellas
        this.physics.add.overlap(this.player,this.stars,this.collectStar,null,this);
        this.physics.add.collider(this.stars,this.platforms);
        //puntajes
        this.scoreText = this.add.text(16,16,"Puntaje: " + this.puntaje,{fontSize: "32px",fill: "#000"});
        //Para agregar las bombas
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        let x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) :
        Phaser.Math.Between(0, 400);
        let bomb = this.bombs.create(x, 10, 'bomb');  
        let bomb1= this.bombs.create(x, 250, 'bomb');     
        let bomb2= this.bombs.create(x, 450, 'bomb');    
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        
        bomb1.setBounce(1);
        bomb1.setCollideWorldBounds(true);
        bomb1.setVelocity(Phaser.Math.Between(-200, 200), 20);

        bomb2.setBounce(1);
        bomb2.setCollideWorldBounds(true);
        bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);

        
    }
    update() {
          //configurar movimiento del player izquierda derehca quieto y saltar
          if(this.cursors.left.isDown){
            this.player.setVelocityX(-160);

            this.player.anims.play("left",true);
          }else if(this.cursors.right.isDown){
            this.player.setVelocityX(160);

            this.player.anims.play("right",true);
          }else {
            this.player.setVelocityX(0);

            this.player.anims.play("turn",true);
          }
          if(this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-330);
            this.sound.play('salto');
          }
        }
        //recollectar estrellitas
        collectStar(player, star) {
            star.disableBody(true, true);
            this.sonidoEstrella.play(this.soundConfig);
            this.puntaje +=10;
            this.scoreText.setText("Puntaje: "+this.puntaje);
            //Para las bombas
            if (this.stars.countActive(true) === 0) {
                this.scene.start("Nivel4",{
                    puntaje: this.puntaje,
                    sonido: this.sonidom
                }); 
            }
            }

        hitBomb(player, bomb) {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            //delay antes de finalizar escena
            this.sonidom.stop();
            this.sonido.play(this.soundConfig);
           this.time.addEvent({
                delay:900,
                callbackScope:this,
                callback:function(){
                    this.scene.start("GameOver",{puntaje: this.puntaje});
                    this.sonidom.stop();
            }
            });
            
         
        }
}
export default Nivel3;