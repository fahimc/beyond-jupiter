import * as Phaser from 'phaser';
export class Fleet {
  public create(
    scene: Phaser.Scene | undefined,
    container: Phaser.GameObjects.Container | undefined,
    star: Phaser.GameObjects.Shape | undefined,
    color: number | undefined,
  ) {
    if (scene && star && container) {
      const fleet = scene.add.triangle(
        star.x,
        star.y - 5,
        0,
        20,
        10,
        20,
        5,
        0,
        color || 0xffffff,
      );
      fleet.setStrokeStyle(1, 0x000000, 0.8);
      container.add(fleet);
    }
  }
}
