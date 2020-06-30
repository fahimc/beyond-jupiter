import * as Phaser from 'phaser';
export const LoadingView = {
  loadingObject: (null as unknown) as Phaser.GameObjects.DOMElement,
  preload(scene: Phaser.Scene) {},
  create(scene: Phaser.Scene) {
    this.loadingObject = scene.add.dom(
      0,
      100,
      'div',
      `color:#fff;left:50%;font-size:1.5rem;top:${
        Number(scene.game.config.height) / 3
      }px;`,
      'LOADING',
    );
  },
  destroy() {
    this.loadingObject.destroy();
  },
};
