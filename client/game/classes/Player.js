export class Player extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, sprite_name = "player") {
    super(scene, x, y, sprite_name, 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    this.scene = scene;

    this.speed = this.scene.config.player.speed;
    this.maxSpeed = this.scene.config.player.speed * 3;
    
  }

  followMouse(pointer) {
    const dx = pointer.x - this.x;
    const dy = pointer.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5) {
      this.setVelocity(0);
      return;
    }

    const normalizedX = dx / distance;
    const normalizedY = dy / distance;

    const speed = Math.min(this.maxSpeed, distance);

    this.setVelocity(normalizedX * speed, normalizedY * speed);
    this.setRotation(Math.atan2(dy, dx));
  }
}
