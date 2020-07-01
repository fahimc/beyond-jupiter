import * as Phaser from 'phaser';
import { StarDetailsView } from './star-view/star-details-view';
import { Fleet } from './fleet/fleet';
export class Star {
  private data: any;
  private gameData: any;
  private radiusObject: Phaser.GameObjects.Shape | undefined = undefined;
  private radiusObjectRange: Phaser.GameObjects.Shape | undefined = undefined;
  public x: number = 0;
  public y: number = 0;
  private size: number = 20;
  private scene: Phaser.Scene | undefined = undefined;
  private circleObject: Phaser.GameObjects.Shape | undefined = undefined;
  private ringObject: Phaser.GameObjects.Shape | undefined = undefined;
  private textObject: Phaser.GameObjects.DOMElement | undefined = undefined;
  private container: Phaser.GameObjects.Container | undefined = undefined;
  private clickCount: number = 0;
  private clickTimer: any = undefined;
  private color: number | undefined = undefined;
  private detailsObject: Phaser.GameObjects.DOMElement | undefined = undefined;
  constructor(
    data: any,
    container: Phaser.GameObjects.Container,
    gameData: any,
  ) {
    this.data = data;
    this.gameData = gameData;
    this.container = container;
  }
  public create(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    c?: number,
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    var circle = scene.add.circle(x, y, 10, 0xffffff);
    let color = 0x5d6d7e;

    if (this.data.puid !== undefined) {
      const player = this.gameData.players[Number(this.data.puid)];
      color = Number(player.color);
      this.color = color;
    }
    this.color = color;
    var ring = scene.add.circle(x, y, 12.5, this.color, 0);
    ring.setStrokeStyle(3, this.color, 1);

    circle.setDisplaySize(10, 10);
    ring.setDisplaySize(this.size, this.size);

    const text = scene.add.dom(
      x,
      y + this.size + 1,
      'div',
      `
    color:#fff;
    font-size:10px;
    font-family:'Arial';
    text-shadow: 1px 1px #000000;
    `,
      name,
    );
    // text.setAlign('center');
    text.setX(x);
    circle.setInteractive().on('pointerup', this.onClick.bind(this));
    ring.setInteractive().on('pointerup', this.onClick.bind(this));

    circle
      .setInteractive()
      .on('pointerdownoutside', this.onClickOut.bind(this));
    ring.setInteractive().on('pointerdownoutside', this.onClickOut.bind(this));
    // text.setInteractive().on('pointerup', this.onClick.bind(this));

    scene.input.on('gameobjectout', this.onClickOut.bind(this));
    scene.input.on('pointerdownoutside', this.onOut.bind(this));
    scene.input.on('gameout', this.onOut.bind(this));

    this.circleObject = circle;
    this.ringObject = ring;
    this.textObject = text;
    if (this.container) this.container.add([circle, ring, text]);
  }
  private onOut() {
    this.clearTimeout();
    if (this.radiusObject && this.radiusObjectRange) {
      this.radiusObject.destroy();
      this.radiusObjectRange.destroy();
    }
  }
  private onClickOut(pointer, gameObject) {
    if (
      this.radiusObject &&
      this.radiusObjectRange &&
      gameObject !== this.circleObject &&
      gameObject !== this.ringObject &&
      gameObject !== this.textObject
    ) {
      this.radiusObject.destroy();
      this.radiusObjectRange.destroy();
    }
  }
  private createFleet() {
    const fleet = new Fleet();
    fleet.create(this.scene, this.container, this.circleObject, this.color);
  }
  private openStarDetails = () => {
    if (!this.scene || !this.container || this.detailsObject) return;
  };
  public getColor() {
    return this.color;
  }
  public setColor(color: number) {
    this.color = color;
    if (this.ringObject) this.ringObject.setStrokeStyle(5, color, 1);
  }

  private clearTimeout = () => {
    this.clickCount = 0;
    clearTimeout(this.clickTimer);
    this.clickTimer = undefined;
  };
  private onClick(pointer, localX, localY, event) {
    if (this.clickCount == 0) {
      this.clickCount++;
      this.clickTimer = setTimeout(this.clearTimeout, 500);
    } else if (this.clickTimer) {
      this.clearTimeout();
      // if (this.scene) this.scene.scene.start('planet-view');
      StarDetailsView.open(this.data, this);
      return;
    }
    // //level 2 range upto 80px

    // //level 3 range upto 90px

    // //level 2 range upto 80px
    const scanning = 130;
    const range = 140;
    if (this.radiusObject && this.radiusObjectRange) {
      this.radiusObject.destroy();
      this.radiusObjectRange.destroy();
    }
    if (this.scene && this.container && this.circleObject) {
      this.radiusObject = this.scene.add.circle(
        this.circleObject.x,
        this.circleObject.y,
        this.size + 10,
        0xa6a6a6,
        0,
      );
      this.radiusObject.setStrokeStyle(1, 0xa6a6a6, 0.6);
      this.radiusObject.setDisplaySize(
        this.circleObject.displayWidth + scanning,
        this.circleObject.displayWidth + scanning,
      );

      this.radiusObjectRange = this.scene.add.circle(
        this.circleObject.x,
        this.circleObject.y,
        this.size + 10,
        0xa6a6a6,
        0,
      );
      this.radiusObjectRange.setStrokeStyle(1.1, 0xa6a6a6, 0.6);
      this.radiusObjectRange.setDisplaySize(
        this.circleObject.displayWidth + range,
        this.circleObject.displayWidth + range,
      );

      this.container.add(this.radiusObject);
      this.container.add(this.radiusObjectRange);
    }
  }
}
