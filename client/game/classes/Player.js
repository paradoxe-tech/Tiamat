export class Player extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, sprite_name = "player") {
    
    super(scene, x, y, sprite_name, 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    this.scene = scene;
    
  }

  followMouse(pointer) {
    if (!pointer) return;

    const angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY);
    const distance = Phaser.Math.Distance.Between(this.x, this.y, pointer.worldX, pointer.worldY);

    const speed = Math.min(this.scene.config.player.speed * 3, distance * 0.3);

    this.rotation = angle
    this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity);

    console.log(this.x, this.y)
  }

}
