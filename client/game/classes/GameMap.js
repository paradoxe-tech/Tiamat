export class GameMap {
  constructor(scene, tilesets_names, tilesets_dir_path, tilemap_path) {
    
    this.scene = scene
    this.tilesets_names = tilesets_names

    for (var tileset of tilesets_names) {
      scene.load.image(tileset, `${tilesets_dir_path}/${tileset}.png`)
      scene.load.tilemapTiledJSON('map', tilemap_path)
    }
    
  }

  build(layers) {

    const map = this.scene.make.tilemap({
      key: "map", tileWidth: 16, tileHeigth: 16
    });

    let tilesets = new Map();

    for(var tileset of this.tilesets_names) {
      tilesets.set(tileset, map.addTilesetImage(tileset, tileset));
    }

    for(var i=0; i<layers.length; i++) {
      let layer = layers[i];
      map.createStaticLayer(i, tilesets.get(layer), 0, 0);
    }

    this.scene.hitboxes = this.scene.physics.add.group();

    for(var object of map.getObjectLayer('hitboxes').objects) {
      
      let rect = this.scene.add.rectangle(
        object.x + (object.width/2), 
        object.y + (object.height/2), 
        object.width, 
        object.height, 
        0x6666ff, 0
      );
      
      this.scene.physics.world.enable(rect);
      rect.body.moves = false;
      rect.setImmovable = true;
      rect.body.allowGravity = false;
      this.scene.hitboxes.add(rect);
    }
    
  }
}