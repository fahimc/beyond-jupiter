import * as Phaser from 'phaser';
import { LoadingView } from './component/loading/loading';

export class Scene extends Phaser.Scene {
  private music: any = null;
  private button: Phaser.GameObjects.DOMElement | undefined = undefined;
  private loadingObject: Phaser.GameObjects.DOMElement | undefined = undefined;
  private buttonElement: HTMLElement | undefined = undefined;
  constructor() {
    super({ key: 'intro' });
  }
  public preload() {
    this.cameras.main.setBackgroundColor('#1d1d1d');
    LoadingView.create(this);
    this.load.image('logo', 'images/logo.svg');
    this.load.image('jupiter', 'world-edited.png');
    this.load.image('star', 'star.png');
    this.load.image('bg', 'bg.png');
    this.load.image('play-button', 'play-button.png');
    this.load.image('loading', 'loading.png');
    this.load.audio('intro-music', 'sounds/discovery3.ogg');
  }
  public create() {
    LoadingView.destroy();
    this.music = this.sound.add('intro-music', {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });
    this.music.setLoop(true);
    this.music.play();
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

    this.buttonElement = document.createElement('button');
    this.buttonElement.className = 'start-button';
    this.buttonElement.innerText = 'new game';
    this.button = this.add.dom(
      rect.width / 2,
      rect.height * 0.8,
      this.buttonElement,
    );

    this.buttonElement.addEventListener('click', this.onPlayClick.bind(this));
  }
  private onPlayClick(event) {
    if (this.buttonElement) this.buttonElement.style.pointerEvents = 'none';
    const rect = {
      width: Number(this.game.config.width),
      height: Number(this.game.config.height),
    };
    const loading = this.add.image(
      rect.width / 2,
      rect.height * 0.7,
      'loading',
    );
    this.scene.start('stars-view');
    this.music.setVolume(0.5);
  }
}
