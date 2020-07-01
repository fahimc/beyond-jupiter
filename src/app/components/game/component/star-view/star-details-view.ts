import * as Phaser from 'phaser';
export const StarDetailsView = {
  view: (null as unknown) as HTMLElement,
  viewObject: (null as unknown) as Phaser.GameObjects.DOMElement,
  currentStar: null as any,
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
      <div>
        <ul class="planet-resources">
          
        </ul>
      </div>
      <div class="upgrades">
        <button id="buy-new-carrier" class="upgrade-button">build new carrier<br><span>pay </span><span class="money">$25</span></button>
        <button class="upgrade-button">upgrade economy<br><span>pay </span><span class="money">$11</span></button>
        <button class="upgrade-button">upgrade industry<br><span>pay </span><span class="money">$22</span></button>
        <button class="upgrade-button">upgrade science<br><span>pay </span><span class="money">$108</span></button>
        <button class="upgrade-button">build warpgate<br><span>pay </span><span class="money">$200</span></button>
      </div>
    `;

    this.viewObject.setVisible(false);
    this.view
      .querySelector('#buy-new-carrier')
      ?.addEventListener('click', this.onBuyFleet.bind(this));
    this.view
      .querySelector('.close-button')
      ?.addEventListener('click', this.onClose.bind(this));
  },
  onBuyFleet() {
    this.currentStar.createFleet();
  },
  onClose() {
    this.viewObject.setVisible(false);
  },
  open(starData: any, star: any) {
    this.currentStar = star;
    console.log(starData);
    const planetName = this.view.querySelector('.planet-name');
    const planetResources = this.view.querySelector('.planet-resources');

    if (planetName) planetName.textContent = starData.name;

    if (planetResources) {
      let html = '';
      html += this.createResourceItem(
        'Natural Resources',
        starData.naturalResource,
      );
      html += this.createResourceItem(
        'Terraformed Resources',
        starData.terraformedResource,
      );
      html += this.createResourceItem('Ships', '24');
      html += this.createResourceItem('Shipments per hour', '0.8');
      html += this.createResourceItem('Economy', '1');
      html += this.createResourceItem('Industry', '3');
      html += this.createResourceItem('Science', '0');
      planetResources.innerHTML = html;
    }

    this.viewObject.setVisible(true);
  },
  createResourceItem(label, value) {
    return `
    <li>
      <span class="resource-label">${label}</span>
      <span class="resource-value">${value}</span>
    </li>
    `;
  },
};
