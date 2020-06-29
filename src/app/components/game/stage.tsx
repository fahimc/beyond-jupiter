import * as React from 'react';
import * as Phaser from 'phaser';
import { Scene } from './scene';
import { StarScene } from './star-scene';
export interface StageProps {}
export class Stage extends React.Component<StageProps> {
  private game: Phaser.Game | undefined;
  constructor(props: StageProps) {
    super(props);
  }
  public componentDidMount() {
    setTimeout(() => window.scrollTo(0, 1), 50);
    const config = this.getGameConfig();
    this.game = new Phaser.Game(config);
  }
  public render() {
    return <div id="game" />;
  }
  private getGameConfig() {
    return {
      type: Phaser.AUTO,
      width: 411,
      height: 823,
      scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      parent: 'game',
      dom: {
        createContainer: true,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
        },
      },

      // scene: [Scene, StarScene],
      scene: [StarScene],
    };
  }
}
