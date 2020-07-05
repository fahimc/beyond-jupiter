import * as Phaser from 'phaser';
export class Fleet {
  public preload(scene: Phaser.Scene | undefined) {
    if (scene) scene.load.image('fleet-icon', 'images/fleet-icon.svg');
  }
  public create(
    scene: Phaser.Scene | undefined,
    container: Phaser.GameObjects.Container | undefined,
    star: Phaser.GameObjects.Shape | undefined,
    color: number | undefined,
  ) {
    if (scene && star && container) {
      const fleet = scene.add.image(star.x, star.y - 5, 'fleet-icon');
      fleet.setDisplaySize(12, 25);
      // const fleet = scene.add.triangle(
      //   star.x,
      //   star.y - 5,
      //   0,
      //   20,
      //   10,
      //   20,
      //   5,
      //   0,
      //   color || 0xffffff,
      // );
      // fleet.setStrokeStyle(1, 0x000000, 0.8);
      container.add(fleet);
      return fleet;
    }
    return undefined;
  }
}
