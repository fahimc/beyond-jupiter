import * as Phaser from 'phaser';
import { LoadingView } from '../loading/loading';
import { Galaxy } from '../background/galaxy';
export class PlanetView extends Phaser.Scene {
  private sun: Phaser.GameObjects.Image = (null as unknown) as Phaser.GameObjects.Image;
  private planets: Phaser.GameObjects.Image[] = [];
  constructor() {
    super({ key: 'planet-view' });
  }
  public preload() {
    LoadingView.create(this);
    Galaxy.preload(this);
    this.load.image('sun', 'images/planets/sun1.png');
    this.load.image('planet1', 'images/planets/planet-1.png');
    this.load.image('planet2', 'images/planets/planet-2.png');
    this.load.image('planet3', 'images/planets/planet-3.png');
  }
  public create() {
    LoadingView.destroy();
    Galaxy.create(this);

    this.createSun();
    this.createPlanet();
    this.createPlanet();
    this.createPlanet();
  }
  private createPlanet() {
    const randomIndex = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    const rect = {
      width: Number(this.game.config.width),
      height: Number(this.game.config.height),
    };
    const planet = this.add.image(
      rect.width / 4,
      rect.height / 2,
      `planet${randomIndex}`,
    );
    planet.setDisplaySize(20, 20);
    // planet.setVisible(false);
    this.planets.push(planet);
  }
  private createSun() {
    const rect = {
      width: Number(this.game.config.width),
      height: Number(this.game.config.height),
    };
    this.sun = this.add.image(rect.width / 2, rect.height / 2, 'sun');
    this.sun.setDisplaySize(100, 100);
    var tween = this.tweens.add({
      targets: [...this.planets, this.sun],
      rotation: { start: 0, to: 360 },
      ease: 'Linear',
      duration: 500000,
      repeat: -1, // -1: infinity
      yoyo: false,
    });
  }
  public update() {
    let distance = 100;
    let start = 0;
    this.planets.forEach(planet => {
      Phaser.Actions.RotateAroundDistance(
        [planet],
        { x: this.sun.x, y: this.sun.y },
        0.06,
        distance,
      );
      planet.setVisible(true);
      planet.setAngle(start);
      distance += 30;
      start += 100;
    });
  }
}
