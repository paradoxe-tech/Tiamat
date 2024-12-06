export class Mob extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, sprite_name, x, y, anim_config, message) {

    super(scene, x, y, sprite_name, 0)
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true)

    this.scene = scene

    this.scene.anims.create({
      key: `${sprite_name}_anim`,
      frames: this.scene.anims.generateFrameNumbers(
        sprite_name, 
        anim_config
      ),
      frameRate: 15,
      repeat: -1
    });

    this.play(`${sprite_name}_anim`);

    this.message = message;
    this.already_interacted = false;

  }
  
}