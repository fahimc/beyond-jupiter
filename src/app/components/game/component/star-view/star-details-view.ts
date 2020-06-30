import * as Phaser from 'phaser';
export const StarDetailsView = {
  view: (null as unknown) as HTMLElement,
  viewObject: (null as unknown) as Phaser.GameObjects.DOMElement,
  create(scene: Phaser.Scene) {
    const rect = {
      width: Number(scene.game.config.width),
      height: Number(scene.game.config.height),
    };
    this.view = document.createElement('div');
    this.view.className = 'star-details-view';

    this.viewObject = scene.add.dom(rect.width / 2, rect.height / 2, this.view);

    this.view.innerHTML = `
      <div class="star-title">
        <div>
          <span class="planet-name">Earth</span>
          <span class="owner">Colonised by Aumatex</span>
        </div>
        <i class="close-button flaticon-close"></i>
      </div>
      <div class="star-details-header">
      </div>
    `;

    this.viewObject.setVisible(false);
    this.view
      .querySelector('.close-button')
      ?.addEventListener('click', this.onClose.bind(this));
  },
  onClose() {
    this.viewObject.setVisible(false);
  },
  open(starData: any) {
    const planetName = this.view.querySelector('.planet-name');
    if (planetName) planetName.textContent = starData.name;
    this.viewObject.setVisible(true);
  },
};
