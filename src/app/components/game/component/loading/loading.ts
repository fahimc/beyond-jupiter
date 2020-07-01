import * as Phaser from 'phaser';
export const LoadingView = {
  loadingObject: (null as unknown) as Phaser.GameObjects.DOMElement,
  preload(scene: Phaser.Scene) {},
  create(scene: Phaser.Scene) {
    this.loadingObject = scene.add.dom(
      0,
      100,
      'div',
      `color:var(--lightblue-color);left:50%;font-size:1rem;top:${
        Number(scene.game.config.height) / 3
      }px;
      text-align: center;`,
      '',
    );
    this.loadingObject.setHTML(
      '<div class="lds-ripple"><div></div><div></div></div><span style="display:block;margin-top: -10px;">LOADING</span>',
    );
  },
  destroy() {
    this.loadingObject.destroy();
  },
};
