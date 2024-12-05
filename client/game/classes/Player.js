export class Player extends Phaser.Physics.Arcade.Sprite {

  constructor(scene) {

    super(scene, 40, 74, 'player', 0)
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true)

    this.scene = scene

  }

  left() {
    // this.anims.play('left', true)
    this.setVelocityX(-this.scene.config.player.speed)
  }

  right() {
    // this.anims.play('right', true)
    this.setVelocityX(this.scene.config.player.speed)
  }

  down() {
    // this.anims.play('left', true)
    this.setVelocityY(-this.scene.config.player.speed)
  }

  up() {
    // this.anims.play('left', true)
    this.setVelocityY(+this.scene.config.player.speed)
  }

  stand() {
    // this.anims.play('stand', true)
    this.setVelocityX(0)
    this.setVelocityY(0)
  }
}