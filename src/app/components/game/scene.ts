import * as Phaser from 'phaser';

export class Scene extends Phaser.Scene {
  private music: any = null;
  private button: Phaser.GameObjects.DOMElement | undefined = undefined;
  private loadingObject: Phaser.GameObjects.DOMElement | undefined = undefined;
  constructor() {
    super({ key: 'intro' });
  }
  public preload() {
    this.cameras.main.setBackgroundColor('#1d1d1d');
    this.loadingObject = this.add.dom(
      0,
      100,
      'div',
      `color:#fff;left:50%;font-size:1.5rem;top:${
        Number(this.game.config.height) / 3
      }px;`,
      'LOADING',
    );
    this.load.image('logo', 'logo-1.png');
    this.load.image('jupiter', 'world-edited.png');
    this.load.image('star', 'star.png');
    this.load.image('bg', 'bg.png');
    this.load.image('play-button', 'play-button.png');
    this.load.image('loading', 'loading.png');
    this.load.audio('intro-music', 'sounds/discovery.ogg');
  }
  public create() {
    if (this.loadingObject) this.loadingObject.destroy();
    this.music = this.sound.add('intro-music', {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });
    //this.music.play();
    const rect = {
      width: Number(this.game.config.width),
      height: Number(this.game.config.height),
    };
    const globalPadding = rect.width * 0.1;
    const paddingDoubled = globalPadding * 2;
    const imageWidth = rect.width - paddingDoubled;
    const bg = this.add.image(rect.width / 2, rect.height * 0.3, 'bg');
    const logo = this.add.image(rect.width / 2, rect.height * 0.3, 'logo');
    logo.setDisplaySize(
      imageWidth,
      imageWidth / Math.abs(logo.width / logo.height),
    );
    var rectGemo = new Phaser.Geom.Rectangle(0, 0, rect.width, rect.height);
    const particles = this.add.particles('star');
    var emitter = particles.createEmitter({
      speed: 1,
      scale: { start: 0.01, end: 0.01 },
      blendMode: Phaser.BlendModes.LIGHTEN,
      emitZone: {
        type: 'random', // 'random', or 'edge'
        source: rectGemo,
        quantity: 1,
        stepRate: 0,
        yoyo: false,
        seamless: true,
      },
    });

    const jupiter = this.add.image(rect.width, rect.height, 'jupiter');
    jupiter.setDisplaySize(
      rect.width * 2,
      (rect.width * 2) / Math.abs(jupiter.width / jupiter.height),
    );
    var tween = this.tweens.add({
      targets: jupiter,
      rotation: { start: 0, to: 360 },
      // alpha: 1,
      // alpha: '+=1',
      ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 10000000,
      repeat: -1, // -1: infinity
      yoyo: false,
    });

    let buttonElement = document.createElement('button');
    buttonElement.className = 'start-button';
    buttonElement.innerText = 'new game';
    this.button = this.add.dom(
      rect.width / 2,
      rect.height * 0.8,
      buttonElement,
    );

    buttonElement.addEventListener('click', this.onPlayClick.bind(this));
  }
  private onPlayClick(event) {
    const rect = {
      width: Number(this.game.config.width),
      height: Number(this.game.config.height),
    };
    const loading = this.add.image(
      rect.width / 2,
      rect.height * 0.7,
      'loading',
    );
    this.music.stop();
    this.scene.start('stars-view');
  }
}
