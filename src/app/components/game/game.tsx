import * as React from 'react';
import * as PIXI from 'pixi.js';
import * as data from './game.json';

export interface GameProps {}

export interface StarItem {
  element: PIXI.Graphics;
  x: number;
  y: number;
  size: number;
}

export class Game extends React.Component<GameProps> {
  private pixiApp: PIXI.Application;
  private containerRef: React.RefObject<any>;
  private stars: StarItem[] = [];
  private galaxy: PIXI.Graphics = new PIXI.Graphics();
  private galaxyScale: number = 1;
  private onGalaxyDrag: boolean = false;
  private initialDrag: { x: number; y: number } = { x: 0, y: 0 };
  constructor(props: GameProps) {
    super(props);
    let type = 'WebGL';
    if (!PIXI.utils.isWebGLSupported()) {
      type = 'canvas';
    }

    PIXI.utils.sayHello(type);
    this.containerRef = React.createRef();
    this.pixiApp = new PIXI.Application({});
  }
  public componentDidMount() {
    this.pixiApp.resizeTo = document.body;
    this.containerRef.current.appendChild(this.pixiApp.view);

    this.generateBackground();
    this.generateStars();

    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('touchstart', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchend', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onMouseMove);
  }

  private onMouseDown = event => {
    this.onGalaxyDrag = true;
    this.initialDrag = {
      x: event.touches ? event.touches[0].clientX : event.pageX,
      y: event.touches ? event.touches[0].clientY : event.pageY,
    };
  };
  private onMouseUp = event => {
    this.onGalaxyDrag = false;
  };
  private onMouseMove = event => {
    const x = event.touches ? event.touches[0].clientX : event.pageX;
    const y = event.touches ? event.touches[0].clientY : event.pageY;
    if (this.onGalaxyDrag) {
      const xMovement = this.initialDrag.x - x;
      const yMovement = this.initialDrag.y - y;

      this.galaxy.x -= xMovement;
      this.galaxy.y -= yMovement;

      this.initialDrag = {
        x,
        y,
      };
    }
  };

  private generateBackground() {
    const graphics = new PIXI.Graphics();
    const blurFilter2 = new PIXI.filters.BlurFilter();
    blurFilter2.blur = 3;
    graphics.filters = [blurFilter2];
    const rect = document.body.getBoundingClientRect();
    // for (let a = 0; a < 1000; ++a) {
    //   let x = Math.floor(Math.random() * rect.width) + 1;
    //   let y = Math.floor(Math.random() * rect.width) + 1;

    //   graphics.beginFill(0xffffff, 0.9);
    //   graphics.drawStar(x, y, 5, 3);
    //   graphics.endFill();
    // }

    const texture = PIXI.Sprite.from('galaxy.png');
    // this.pixiApp.stage.addChild(graphics);
    texture.width = rect.width;
    texture.alpha = 0.5;
    // texture.height = rect.height;
    //this.pixiApp.stage.addChild(texture);
  }

  private generateStars() {
    this.galaxy = new PIXI.Graphics();
    let size = 21;
    let minSpace = 20;

    for (let a = 0; a < data.stars.length; ++a) {
      const starData = data.stars[a];
      // let pos = this.getRandomPos(size, minSpace);
      const color = a < 50 ? 0xffbe0e : 0x0433ff;
      this.drawStar(size, starData.x, starData.y, color, this.galaxy, starData);
    }
    this.pixiApp.stage.addChild(this.galaxy);
  }

  private getRandomPos(size: number, distance: number) {
    const rect = document.body.getBoundingClientRect();
    let found = false;
    let x = 0;
    let y = 0;
    let count = 0;
    let width = rect.width;
    let height = rect.height;

    while (!found) {
      count++;
      if (count > 1000) {
        width += size;
        height += size;
        count = 0;
      }
      x = Math.floor(Math.random() * width) + size / 2;
      y = Math.floor(Math.random() * height) + size / 2;

      if (!this.stars.length) found = true;
      found = !this.stars.find(star => {
        let boundaryX = distance + size;
        let boundaryY = distance + size;

        if (
          boundaryX >= rect.width ||
          boundaryY >= rect.height ||
          (x >= star.x - boundaryX &&
            x <= star.x + boundaryX &&
            y >= star.y - boundaryY &&
            y <= star.y + boundaryY)
        ) {
          return true;
        }
      });
    }
    return {
      x,
      y,
    };
  }

  private drawStar(size, x, y, color, galaxy, starData) {
    const innerCircle = new PIXI.Graphics();
    const blurFilter1 = new PIXI.filters.BlurFilter();
    const blurFilter2 = new PIXI.filters.BlurFilter();

    const star = new PIXI.Graphics();
    const graphics = new PIXI.Graphics();
    const outerCircle = new PIXI.Graphics();
    outerCircle.filters = [blurFilter1];
    blurFilter1.blur = 12;
    outerCircle.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    outerCircle.beginFill(color, 0.5);
    outerCircle.drawCircle(x, y, (size + 10) / 2);
    outerCircle.endFill();

    blurFilter2.blur = 2;
    innerCircle.filters = [blurFilter2];
    innerCircle.beginFill(0xffffff, 0.8);
    innerCircle.drawCircle(x, y, (size - 12) / 2);
    innerCircle.endFill();

    const ring = new PIXI.Graphics();
    ring.lineStyle(3, color, 1);
    ring.beginFill(0xc34288, 0);
    ring.drawCircle(x, y, size / 2);
    ring.endFill();

    const warpBlur = new PIXI.filters.BlurFilter();

    warpBlur.blur = 12;

    const warpgate = new PIXI.Graphics();
    const warpgateBlur = new PIXI.Graphics();
    const warpgateRing = new PIXI.Graphics();
    warpgateBlur.filters = [warpBlur];
    warpgateBlur.lineStyle(3, 0xffff00, 1);
    warpgateBlur.beginFill(0xffff00, 1);
    warpgateBlur.drawCircle(x + size, y, size / 3);
    warpgateBlur.endFill();

    warpgateRing.lineStyle(3, 0xffff00, 1);
    warpgateRing.beginFill(0xffff00, 0);
    warpgateRing.drawCircle(x + size, y, size / 4);
    warpgateRing.endFill();
    warpgate.addChild(warpgateBlur);
    warpgate.addChild(warpgateRing);

    // graphics.addChild(outerCircle);
    graphics.addChild(innerCircle);
    graphics.addChild(ring);
    // graphics.addChild(warpgate);

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 13,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fill: '#ffffff', // gradient
      // stroke: '#4a1850',
      // strokeThickness: 1,
      // dropShadow: true,
      // dropShadowColor: '#000000',
      // dropShadowBlur: 1,
      // dropShadowDistance: 1,
      // wordWrap: true,
      // wordWrapWidth: 440,
    });
    const scale = 1;
    graphics.scale.x = scale;
    graphics.scale.y = scale;
    const radiusX = size / 4;
    const radiusY = size / 2;
    const richText = new PIXI.Text(starData.name, style);
    richText.x = (x - richText.width * 0.5) * scale;
    richText.y = (y + radiusY + 2) * scale;

    star.addChild(graphics);
    star.addChild(richText);

    this.stars.push({
      element: graphics,
      x,
      y,
      size,
    });
    galaxy.addChild(star);
  }

  private onScrollWheel(event) {
    event.preventDefault();
    const delta = Math.max(-1, Math.min(1, event.deltaY)); // cap the delta to [-1,1] for cross browser consistency
    if (delta < 0) {
      this.galaxyScale += 0.1;
    } else {
      this.galaxyScale -= 0.1;
    }
    this.galaxy.scale.y = this.galaxyScale;
    this.galaxy.scale.x = this.galaxyScale;

    const rect = document.body.getBoundingClientRect();
    this.galaxy.x = rect.width / 2 - this.galaxy.width / 2;
    this.galaxy.y = rect.height / 2 - this.galaxy.height / 2;
  }

  public render() {
    return (
      <div ref={this.containerRef} onWheel={e => this.onScrollWheel(e)}></div>
    );
  }
}
