import { GameMap } from "../classes/GameMap.js"
import { Player } from "../classes/Player.js"

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
        "hs","interiors", "walls" // example tilesets
      ],
      `/assets/tilesets`,
      `/assets/tilemaps/outside.json`
    );
    
    this.load.spritesheet(
      'player', 
      '/assets/sprites/player.png', 
      { 
        frameWidth : 18, 
        frameHeight : 18 
      }
    )
    
  }

  create() {

    this.map.build([
      "walls", "interiors" // example tilemap layers
    ]);
    
    this.player = new Player(this);

    this.physics.add.collider(this.player, this.hitboxes);

    this.cameras.main.setSize(this.config.main.width, this.config.main.height);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoomTo(this.config.settings.zoom);
    
  }

  update() {

    this.keys = this.input.keyboard.addKeys(this.config.settings.keys);

    if (this.keys.left.isDown) this.player.left();
    else if (this.keys.right.isDown) this.player.right();
    else if (this.keys.forward.isDown) this.player.down();
    else if (this.keys.backward.isDown) this.player.up();
    else this.player.stand();
    
  }

}