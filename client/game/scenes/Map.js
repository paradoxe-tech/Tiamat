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
        "sea"
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

    this.input.on('pointermove', (pointer) => {
      this.pointer = pointer;
    });

    this.map.build([
      "sea"
    ]);

    console.log(this.anims)

    this.anims.create({
      key: `player_swim`,
      frames: this.anims.generateFrameNumbers(
        "player_6_12", 
        { start: 12, end: 23}
      ),
      frameRate: 15,
      repeat: -1
    });
    
    this.player = new Player(this, 0, 0, "player_6_12");
    this.player.play("player_swim")

    new Mob(this, "whale_1_14", 0, 0, { start: 0, end: 13 });

    this.physics.add.collider(this.player, this.hitboxes);

    this.cameras.main.setSize(this.config.main.width, this.config.main.height);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoomTo(this.config.settings.zoom);
    
  }

  update() {

    this.cursor = this.input.keyboard.createCursorKeys();

    console.log(this.cursor)


    if (this.pointer) {
      this.player.followMouse(this.pointer);
    }
    
  }

}