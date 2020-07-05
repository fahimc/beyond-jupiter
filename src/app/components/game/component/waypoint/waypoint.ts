import * as Phaser from 'phaser';
import { store } from 'app';
export const Waypoints = {
  waypoints: [] as Phaser.GameObjects.Star[],
  lines: [] as {
    line: Phaser.GameObjects.Line;
    point: { x: number; y: number };
  }[],
  scene: (undefined as unknown) as Phaser.Scene,
  container: (undefined as unknown) as Phaser.GameObjects.Container | undefined,
  showWayPointsInRange(
    selectedFleet: number | null,
    scene: Phaser.Scene,
    container: Phaser.GameObjects.Container | undefined = undefined,
  ) {
    this.scene = scene;
    this.container = container;

    this.waypoints.forEach(w => w.destroy());
    this.waypoints = [];

    if (selectedFleet !== null) {
      const state = store.getState();
      const fleet = state.fleets.items.find(f => f.id == selectedFleet);
      const player = state.players.items.find(
        p => p.id == state.players.playerId,
      );
      if (fleet && player) {
        //is fleet orbiting a star
        // const star = state.stars.items.find(s => {
        //   if (s.fleetsOrbiting.length) {
        //     return s.fleetsOrbiting.find(fid => selectedFleet);
        //   }
        //   return false;
        // });
        // //fleet is orbiting a star
        // if (star) {
        // }
        const range = player.tech.range.level * (70 / 2);
        let startPoint = { x: fleet.x, y: fleet.y };
        if (this.lines.length) {
          startPoint = this.lines[this.lines.length - 1].point;
        }
        state.stars.items.forEach(star => {
          if (fleet.x !== undefined && fleet.y !== undefined) {
            const distance = Math.sqrt(
              (startPoint.x - star.x) * (startPoint.x - star.x) +
                (startPoint.y - star.y) * (startPoint.y - star.y),
            );
            if (distance <= range) {
              this.createWayPoint(star.x, star.y, scene, container);
            }
          }
        });
      }
    }
  },
  isInRange(star, startPoint) {
    const state = store.getState();
    const player = state.players.items.find(
      p => p.id == state.players.playerId,
    );
    if (player && startPoint) {
      const range = player.tech.range.level * (70 / 2);
      const distance = Math.sqrt(
        (startPoint.x - star.x) * (startPoint.x - star.x) +
          (startPoint.y - star.y) * (startPoint.y - star.y),
      );
      if (distance <= range) {
        return true;
      }
    }
    return false;
  },
  createWayPoint(x, y, scene, container) {
    if (container) {
      const waypoint = scene.add.star(x, y, 20, 20, 25, 0xffffff, 0);
      waypoint.setStrokeStyle(2, 0xa4ebff, 0.6);
      container.add(waypoint);
      this.waypoints.push(waypoint);
      container.sendToBack(waypoint);
    }
  },
  removeWayPoints() {},
  drawLine(starId, fleetId) {
    const state = store.getState();
    const fleet = state.fleets.items.find(f => f.id == fleetId);
    const player = state.players.items.find(
      p => p.id === state.players.playerId,
    );
    const star = state.stars.items.find(s => s.id === starId);
    if (player && this.scene && star && fleet && this.container) {
      let startPoint = { x: fleet.x, y: fleet.y };
      if (this.lines.length) {
        startPoint = this.lines[this.lines.length - 1].point;
      }
      const isInRange = this.isInRange(star, startPoint);
      if (!isInRange) {
        console.log('not in range');
        return;
      }

      const line = this.scene.add.line(
        0,
        0,
        startPoint.x,
        startPoint.y,
        star.x,
        star.y,
        Phaser.Display.Color.HexStringToColor(player.color || '#000000').color,
        0.6,
      );
      this.lines.push({
        line,
        point: {
          x: star.x,
          y: star.y,
        },
      });
      line.setOrigin(0, 0);
      line.setLineWidth(5);
      this.container.add(line);
      this.container.sendToBack(line);
    }
    this.showWayPointsInRange(fleetId, this.scene, this.container);
  },
};
