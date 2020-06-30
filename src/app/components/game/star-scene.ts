import * as Phaser from 'phaser';
import * as data from './game.json';
import * as Hammer from 'hammerjs';
import { Star } from './component/star';
import { StarDetailsView } from './component/star-view/star-details-view';
export class StarScene extends Phaser.Scene {
  private container: Phaser.GameObjects.Container | undefined = undefined;
  private loadingObject: Phaser.GameObjects.DOMElement | undefined = undefined;
  private containerWidth: number = 0;
  private containerHeight: number = 0;
  private stars: any[] = [];
  constructor() {
    super({ key: 'stars-view' });
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
    this.load.image('star', 'star.png');
    this.load.image('unoccupied-star', 'unoccupied-star.png');
    this.load.image('bg1', 'bg2.png');

    this.load.scenePlugin(
      'rexgesturesplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js',
      'rexGestures',
      'rexGestures',
    );
  }
  public create() {
    if (this.loadingObject) this.loadingObject.destroy();

    const rect = {
      width: Number(this.game.config.width),
      height: Number(this.game.config.height),
    };
    const bg = this.add.image(rect.width / 2, rect.height * 0.3, 'bg1');
    bg.setAlpha(0.6);
    const particles = this.add.particles('star');
    var rectGemo = new Phaser.Geom.Rectangle(0, 0, rect.width, rect.height);
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
    var tween = this.tweens.add({
      targets: bg,
      rotation: { start: 0, to: 360 },
      // alpha: 1,
      // alpha: '+=1',
      ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 10000000,
      repeat: -1, // -1: infinity
      yoyo: false,
    });
    this.container = this.add.container(0, 0);
    this.container.setScale(1.5, 1.5);
    this.generateStars();
    // this.createStars();
    const camera = this.cameras.main;

    var mc = new Hammer.Manager(document.body);
    var pinch = new Hammer.Pinch();
    var pan = new Hammer.Pan();
    mc.add([pinch, pan]);

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    const canvas = document.querySelector('canvas');
    canvas?.addEventListener('touchstart', event => {
      isDragging = true;
      if (event.touches && this.container) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
      }
    });

    canvas?.addEventListener('touchmove', event => {
      if (isDragging) {
        if (event.touches && this.container) {
          const diff =
            this.containerWidth * this.container.scale - rect.width / 2;
          const diffY =
            this.containerHeight * this.container.scale - rect.height / 2;
          const movementX = Math.abs(startX - event.touches[0].clientX);
          const movementY = Math.abs(startY - event.touches[0].clientY);
          const x = this.container.x - (startX - event.touches[0].clientX);
          const y = this.container.y - (startY - event.touches[0].clientY);
          // if (movementX > 10 && x >= -diff && x <= 0) this.container.setX(x);
          // if (movementY > 10 && y >= -diffY && y <= 0) this.container.setY(y);

          if (movementX > 2) this.container.setX(x);
          if (movementY > 2) this.container.setY(y);

          startX = event.touches[0].clientX;
          startY = event.touches[0].clientY;
        }
      }
    });
    canvas?.addEventListener('touchend', event => {
      isDragging = false;
    });
    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (deltaY < 0) {
        this.zoomIn();
      } else {
        this.zoomOut();
      }
    });
    mc.on('pinchin', event => {
      this.zoomOut();
    });
    mc.on('pinchout', event => {
      this.zoomIn();
    });
    this.createUI();
  }
  private zoomIn() {
    if (!this.container) return;
    let scale = this.container.scale;
    if (scale <= 2) scale += 0.03;
    this.container.setScale(scale, scale);
  }

  private zoomOut() {
    if (!this.container) return;
    let scale = this.container.scale;
    if (scale >= 0.5) scale -= 0.03;
    this.container.setScale(scale, scale);
  }

  private createUI() {
    const prodBar = this.add.dom(
      0,
      0,
      'div',
      `
    width:100%;
    left:calc(50%);
    `,
      `
     
      `,
    );
    prodBar.setHTML(`
    <div class="prod-bar">
    <span class="credits"><i class="icon green flaticon-finances"></i>800</span>
    <span class="time"><i class="icon red flaticon-clock"></i>8H 23M 12S</span>
  </div>
    `);

    StarDetailsView.create(this);
  }
  // private createStars() {
  //   const starList: any[] = [];

  //   let cx = 100;
  //   let cy = 100;
  //   this.createStarsFromCenter(starList);
  // }

  // createStarsFromCenter(starList: any[]) {
  //   const minCircle = 20;
  //   const maxCircle = 20;
  //   var innerRadius = 5;
  //   var x = 200;
  //   var y = 400;
  //   if (this.container) {
  //     const star = new Star({}, this.container);
  //     const gameObjects = star.create(this, x, y, '');
  //     this.stars.push(gameObjects);

  //     this.container?.add(gameObjects);
  //   }
  //   let maxRadius = 200;
  //   let minRadius = 25;
  //   //260
  //   //level 1 range upto 70px
  //   for (let a = 0; a < 10; ++a) {
  //     let pos = this.drawStar(starList, minCircle, maxCircle, 0, x, y, 75, 100);
  //   }
  //   for (let a = 0; a < 5; ++a) {
  //     let pos = this.drawStar(
  //       starList,
  //       minCircle,
  //       maxCircle,
  //       80,
  //       x,
  //       y,
  //       75,
  //       100,
  //     );
  //   }
  //   for (let a = 0; a < 10; ++a) {
  //     let pos = this.drawStar(
  //       starList,
  //       minCircle,
  //       maxCircle,
  //       100,
  //       x,
  //       y,
  //       80,
  //       89,
  //     );
  //   }
  //   for (let a = 0; a < 10; ++a) {
  //     let pos = this.drawStar(
  //       starList,
  //       minCircle,
  //       maxCircle,
  //       140,
  //       x,
  //       y,
  //       80,
  //       89,
  //     );
  //   }

  //   const numberOfPlayers = 8;
  //   const angleIncrement = 360 / numberOfPlayers;
  //   const colors = [
  //     0xf1c40f,
  //     0x1abc9c,
  //     0xd35400,
  //     0x2980b9,
  //     0x27ae60,
  //     0xe74c3c,
  //     0x52be80,
  //     0xcd00cd,
  //   ];
  //   let currentAngle = angleIncrement;
  //   let addInbetween = 0;
  //   let homeStarIndex = 8;
  //   for (let a = 0; a < numberOfPlayers; a++) {
  //     const colorIndex = Math.round(
  //       Math.random() * (Number(colors.length - 1) - 0 + 1) + 0,
  //     );
  //     const playerStars: any[] = [];
  //     for (let b = 0; b < 10; ++b) {
  //       playerStars.push(
  //         this.drawStar(
  //           starList,
  //           minCircle,
  //           maxCircle,
  //           200,
  //           x,
  //           y,
  //           20,
  //           200,
  //           b === homeStarIndex ? colors[colorIndex] : undefined,
  //           currentAngle,
  //         ),
  //       );
  //     }

  //     for (let b = 0; b < 3; ++b) {
  //       this.drawStar(
  //         starList,
  //         minCircle,
  //         maxCircle,
  //         600,
  //         x,
  //         y,
  //         80,
  //         120,
  //         undefined,
  //         currentAngle,
  //       );
  //     }

  //     //setHomeStar
  //     const homeStar = playerStars[homeStarIndex];
  //     let list: any[] = [...playerStars];
  //     for (let c = 0; c < 5; c++) {
  //       let shortestDistance: any = undefined;
  //       let closestIndex = 13;
  //       let closest;
  //       for (let i = 0; i < list.length; i++) {
  //         if (i !== homeStarIndex) {
  //           var d = this.distSquared(homeStar, list[i]);
  //           if (shortestDistance == undefined || d < shortestDistance) {
  //             closest = list[i];
  //             shortestDistance = d;
  //             closestIndex = i;
  //           }
  //         }
  //       }
  //       closest.setColor(homeStar.getColor());
  //       list.splice(closestIndex, 1);
  //     }

  //     colors.splice(colorIndex, 1);
  //     currentAngle += angleIncrement;
  //     if (addInbetween) {
  //       addInbetween = 0;
  //       for (let b = 0; b < 4; ++b) {
  //         let pos = this.drawStar(
  //           starList,
  //           minCircle,
  //           maxCircle,
  //           200,
  //           x,
  //           y,
  //           20,
  //           400,
  //           0x808080,
  //           currentAngle - 22.5,
  //         );
  //       }
  //     }
  //     addInbetween++;
  //   }

  //   // //level 2 range upto 80px

  //   // //level 3 range upto 90px

  //   // //level 2 range upto 80px
  // }
  // private distSquared(pt1, pt2) {
  //   var diffX = pt1.x - pt2.x;
  //   var diffY = pt1.y - pt2.y;
  //   return diffX * diffX + diffY * diffY;
  // }
  // private drawStar(
  //   starList,
  //   minCircle,
  //   maxCircle,
  //   innerRadius,
  //   cx,
  //   cy,
  //   minRadius,
  //   maxRadius,
  //   color?: number,
  //   angle?: number,
  // ) {
  //   let gameObjects;
  //   let star;
  //   let pos = {
  //     x: 0,
  //     y: 0,
  //   };
  //   var PI2 = Math.PI * 2;
  //   var radius = minCircle + Math.random() * (maxCircle - minCircle);
  //   var outerRadius = Math.floor(
  //     Math.random() * (maxRadius - minRadius + 1) + minRadius,
  //   );
  //   const randomAngle = Math.random() * (20 - 0 + 1) + 0;
  //   var distFromCenter = innerRadius + radius + outerRadius;
  //   var a = angle
  //     ? (angle + randomAngle) * (Math.PI / 180)
  //     : Math.random() * PI2;
  //   var x = cx + distFromCenter * Math.cos(a);
  //   var y = cy + distFromCenter * Math.sin(a);

  //   var hit = false;
  //   for (var i = 0; i < starList.length; i++) {
  //     var circle = starList[i];
  //     var dx = circle.cx - x;
  //     var dy = circle.cy - y;
  //     var r = circle.radius + radius;
  //     if (dx * dx + dy * dy <= r * r) {
  //       hit = true;
  //     }
  //   }
  //   if (!hit) {
  //     //var color = randomColor();
  //     starList.push({
  //       cx: x,
  //       cy: y,
  //       radius: radius,
  //       color: 0x000000,
  //     });
  //     // const circle = this.add.circle(x, y, radius, 0xffffff);
  //     if (this.container) {
  //       star = new Star({}, this.container);
  //       gameObjects = star.create(this, x, y, '', color);
  //       this.stars.push(gameObjects);
  //       if (x > this.containerWidth) this.containerWidth = x;
  //       if (y > this.containerHeight) this.containerHeight = y;

  //       this.container?.add(gameObjects);
  //     }
  //   } else {
  //     star = this.drawStar(
  //       starList,
  //       minCircle,
  //       maxCircle,
  //       innerRadius,
  //       cx + 10,
  //       cy + 10,
  //       minRadius,
  //       maxRadius,
  //       color,
  //       angle,
  //     );
  //   }

  //   return star;
  // }

  private generateStars() {
    if (!this.container) return;
    const rect = {
      width: Number(this.game.config.width),
      height: Number(this.game.config.height),
    };
    for (let a = 0; a < data.stars.length; ++a) {
      const starData = data.stars[a] as any;
      if (starData.x > this.containerWidth) this.containerWidth = starData.x;
      if (starData.y > this.containerHeight) this.containerHeight = starData.y;

      // const star = this.add.image(starData.x, starData.y, 'star-yellow');

      const star = new Star(starData, this.container, {
        players: data.players,
      });
      const gameObjects = star.create(
        this,
        starData.x,
        starData.y,
        starData.name,
      );
      this.stars.push(star);
      if (this.container) this.container.add(gameObjects);
    }
  }
}
