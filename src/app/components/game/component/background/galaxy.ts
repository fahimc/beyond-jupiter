import * as Phaser from 'phaser';
export const Galaxy = {
  preload(scene: Phaser.Scene) {
    scene.cameras.main.setBackgroundColor('#1d1d1d');
    scene.load.image('star', 'star.png');
    scene.load.image('bg', 'bg2.png');
  },
  create(scene: Phaser.Scene) {
    const rect = {
      width: Number(scene.game.config.width),
      height: Number(scene.game.config.height),
    };
    const bg = scene.add.image(rect.width / 2, rect.height * 0.3, 'bg');
    bg.setAlpha(0.6);
    const particles = scene.add.particles('star');
    var rectGemo = new Phaser.Geom.Rectangle(0, 0, rect.width, rect.height);
    var emitter = particles.createEmitter({
      speed: 1,
      scale: { start: 0.01, end: 0.01 },
      blendMode: Phaser.BlendModes.LIGHTEN,
      emitZone: {
        type: 'random',
        source: rectGemo,
        quantity: 1,
        stepRate: 0,
        yoyo: false,
        seamless: true,
      },
    });
    var tween = scene.tweens.add({
      targets: bg,
      rotation: { start: 0, to: 360 },
      ease: 'Linear',
      duration: 10000000,
      repeat: -1,
      yoyo: false,
    });
  },
};
