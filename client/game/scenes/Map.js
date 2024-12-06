import { GameMap } from "../classes/GameMap.js";
import { Mob } from "../classes/Mob.js";
import { Player } from "../classes/Player.js";
import { get } from "../../interface/get.js";

export class Map extends Phaser.Scene {

  constructor(config) {

    super({
      key: "Map",
      physics: {
        arcade: {
          gravity: { y: config.main.gravity },
          debug: config.settings.debug
        }
      }
    })

    this.config = config
    this.categories = {}
  }

  preload() {
    
    this.map = new GameMap(
      this, 
      [
        "sea", "reef", "marine", "kayou",
      ],
      `/assets/tilesets`,
      `/assets/tilemaps/world.json`
    );

    this.spritesData = JSON.parse(get('/sprites'))
    
    for(let sprite of this.spritesData) {
      this.load.spritesheet(
        sprite.fileName, 
        `./assets/sprites/${sprite.fileName}.png`, 
        { 
          frameWidth : sprite.width / sprite.cols, 
          frameHeight : sprite.height / sprite.rows
        }
      )
    }
    
  }

  create() {

    this.physics.world.setBounds(0, 0, 10000, 10000);

    this.input.on('pointermove', (pointer) => {
      this.pointer = pointer;
    });

    this.map.build([
      "sea", "reef2", "reef1", "marine", "kayou",
    ]);
    
    this.player = new Player(this, 580, 333, "player_1_6");
    //this.player = new Player(this, 1000, 500, "player_1_6");
    this.anims.create({
      key: `player_swim`,
      frames: this.anims.generateFrameNumbers(
        "player_1_6", 
        { start: 0, end: 4}
      ),
      frameRate: 15,
      repeat: -1
    });
    
    this.player.play("player_swim");

    this.whale = new Mob(this, "whale_filet", 1000, 500, { start: 0, end: 13 }, "SAUVEZ MOI !!!");

    
    // Ptits machins qui bougent
    new Mob(this, "gasteropod_6_1", 200, 608, { start: 0, end: 5 });
    new Mob(this, "seiche_1_5", 900, 558, { start: 0, end: 4 });
    let sl1 = new Mob(this, "slith_1_3", 182, 126, { start: 0, end: 2 }, "Les oceans sont finis").setRotation(Phaser.Math.DegToRad(90));
    let sl2 = new Mob(this, "slith_1_3", 346, 284, { start: 0, end: 2 }, "Les oceans se rechauffent").setRotation(Phaser.Math.DegToRad(270));

    // Ptis machins dans le void
    new Mob(this, "tomopteris_1_4", 200, 20, { start: 0, end: 3 }).setRotation(Phaser.Math.DegToRad(180));
    new Mob(this, "tomopteris_1_4", 450, 250, { start: 0, end: 3 });
    new Mob(this, "tomopteris_1_4", 750, 200, { start: 0, end: 3 }).setRotation(Phaser.Math.DegToRad(90));
    new Mob(this, "tomopteris_1_4", 100, 1200, { start: 0, end: 3 });
    
    // Herbes plafond
    let gr1 = new Mob(this, "grass_1_4", 874, 24, { start: 0, end: 3 }, "Les oceans sont finis")
      .setRotation(Phaser.Math.DegToRad(180));
    new Mob(this, "grass_1_4", 890, 24, { start: 0, end: 3 })
    .setRotation(Phaser.Math.DegToRad(180));
    new Mob(this, "grass_1_4", 858, 24, { start: 0, end: 3 })
    .setRotation(Phaser.Math.DegToRad(180));
    new Mob(this, "grass_1_4", 842, 24, { start: 0, end: 3 })
    .setRotation(Phaser.Math.DegToRad(180));
    new Mob(this, "grass_1_4", 826, 24, { start: 0, end: 3 })
    .setRotation(Phaser.Math.DegToRad(180));

    new Mob(this, "grass_1_4", 312, 24, { start: 0, end: 3 })
      .setRotation(Phaser.Math.DegToRad(180));
    new Mob(this, "grass_1_4", 328, 24, { start: 0, end: 3 })
    .setRotation(Phaser.Math.DegToRad(180));
    let gr2 = new Mob(this, "grass_1_4", 296, 24, { start: 0, end: 3 }, "1,5 deg en plus = 90% des coraux morts")
    .setRotation(Phaser.Math.DegToRad(180));
    new Mob(this, "grass_1_4", 280, 24, { start: 0, end: 3 })
    .setRotation(Phaser.Math.DegToRad(180));
    new Mob(this, "grass_1_4", 264, 24, { start: 0, end: 3 })
    .setRotation(Phaser.Math.DegToRad(180));

    this.npcList = [sl1, sl2, gr1, gr2, this.whale];

    this.physics.add.collider(this.player, this.hitboxes);

    if(this.config.settings.debug) {
      this.cameras.main.setBounds(0, 0, 10000, 10000);
    }
    
    this.cameras.main.setSize(this.config.main.width, this.config.main.height);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoomTo(this.config.settings.zoom);
    
  }

  update() {

    this.cursor = this.input.keyboard.createCursorKeys();

    if (this.pointer) {
      this.player.followMouse(this.pointer);
    }

    var nearbyNpc = this.npcList.find((npc) => {
      if(npc.body) {
        var ptA = npc.body.center.clone();
        var ptB = this.player.body.center.clone();
        var dist = ptA.distance(ptB);
        dist -= npc.width / 2;
        dist -= this.player.width / 2;
        return(dist <= 10);
      }
    });
    
    if(nearbyNpc) {
      if (nearbyNpc == this.whale) {
        if(!nearbyNpc.already_interacted) {
          nearbyNpc.already_interacted = true;
          var xy = nearbyNpc.body.center.clone();
          this.rectangle = this.add.rectangle(xy.x+15, xy.y+35, 5*nearbyNpc.message.length+20, 25, 0xFFFFFF, 1);
          this.dialog = this.add.text(xy.x+15, xy.y+35, nearbyNpc.message, { font: '8px Silkscreen', fill: '#000000' }).setOrigin(0.5);
         // this.bringToTop(this.dialog);

          this.time.addEvent({
            delay:3000,
            callback:() => {
              this.dialog.destroy();
              this.rectangle.destroy();
              this.whale.destroy();
              this.whale_to_spawn = new Mob(this, "whale_4_4", 1000, 500, { start: 0, end: 13 }, "Merci du fond du coeur");
              this.npcList.push(this.whale_to_spawn);
            }
          });
        }

      } else {
        if(!nearbyNpc.already_interacted) {
          nearbyNpc.already_interacted = true;
          var xy = nearbyNpc.body.center.clone();
          this.rectangle = this.add.rectangle(xy.x+15, xy.y+35, 5*nearbyNpc.message.length+20, 25, 0xFFFFFF, 1);
          this.dialog = this.add.text(xy.x+15, xy.y+35, nearbyNpc.message, { font: '8px Silkscreen', fill: '#000000' }).setOrigin(0.5);
         // this.bringToTop(this.dialog);

          this.time.addEvent({
            delay:3000,
            callback:() => {
              this.dialog.destroy();
              this.rectangle.destroy();
            }
          });
        }
      }
     
    }
    
  }

}