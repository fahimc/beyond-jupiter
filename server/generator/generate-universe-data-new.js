const fs = require('fs');
const path = require('path');
const starNames = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './data/stars.json'), 'utf8'),
);
const planetNames = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './data/planets.json'), 'utf8'),
);
const mineral = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './data/mineral.json'), 'utf8'),
);

const GenerateUniverse = {
  starNames: [...starNames],
  planetNames: [...planetNames],
  planets: [],
  players: [],
  starIndex: 0,
  numberOfPlayers: 10,
  stars: [],
  minCircle: 20,
  maxCircle: 20,
  x: 200,
  y: 400,
  init() {
    this.createStarsFromCenter();
    this.save();
  },
  save() {
    fs.writeFileSync(
      path.resolve(__dirname, '../../src/app/components/game/game.json'),
      JSON.stringify(
        {
          stars: this.stars,
          planets: this.planets,
          players: this.players,
        },
        null,
        2,
      ),
      'utf8',
    );
  },
  createStarsFromCenter() {
    //generate center star
    let star = this.generateStarData();
    star.x = this.x;
    star.y = this.y;
    this.stars.push(star);
    //260
    //level 1 range upto 70px
    for (let a = 0; a < 10; ++a) {
      this.createStar(0, 75, 100);
    }
    for (let a = 0; a < 5; ++a) {
      this.createStar(80, 75, 100);
    }
    for (let a = 0; a < 10; ++a) {
      this.createStar(100, 80, 89);
    }
    for (let a = 0; a < 10; ++a) {
      this.createStar(140, 80, 89);
    }

    for (let a = 0; a < 10; ++a) {
      this.createStar(180, 80, 89);
    }

    const numberOfPlayers = 8;
    const angleIncrement = 360 / numberOfPlayers;
    const colors = [
      0xf1c40f,
      0x1abc9c,
      0xd35400,
      0x2980b9,
      0x27ae60,
      0xe74c3c,
      0x52be80,
      0xcd00cd,
    ];
    let addInbetween = 0;
    let homeStarIndex = 8;
    let currentAngle = angleIncrement;
    for (let a = 0; a < numberOfPlayers; a++) {
      const puid = a;
      const colorIndex = Math.round(
        Math.random() * (Number(colors.length - 1) - 0 + 1) + 0,
      );
      this.players.push({
        id: puid,
        color: colors[colorIndex],
      });
      const playerStars = [];
      for (let b = 0; b < 10; ++b) {
        const pStar = this.createStar(
          200,
          20,
          200,
          currentAngle,
          b === homeStarIndex ? colors[colorIndex] : undefined,
        );
        if (b === homeStarIndex) {
          pStar.home = true;
          // pStar.puid = puid;
        }
        playerStars.push(pStar);
      }

      for (let b = 0; b < 3; ++b) {
        this.createStar(600, 80, 120, undefined, currentAngle);
      }

      //setHomeStar
      const homeStar = playerStars[homeStarIndex];
      let list = [...playerStars];

      let inRange = [];
      for (let c = 0; c < list.length; c++) {
        list.forEach(s => {
          if (inRange.length > 5) return;

          let rangeList = inRange;
          if (!inRange.length) {
            rangeList = list;
          }
          rangeList.find((rs, index) => {
            if (s.id == rs.id) return false;
            var dx = s.x - rs.x;
            var dy = s.y - rs.y;
            var r = 80;
            if (dx * dx + dy * dy <= r * r) {
              if (!inRange.length) {
                rs.puid = puid;
                inRange.push(rs);
              }
              s.puid = puid;
              inRange.push(s);
              return true;
            }
          });
        });
      }

      colors.splice(colorIndex, 1);
      currentAngle += angleIncrement;
      if (addInbetween) {
        addInbetween = 0;
        for (let b = 0; b < 4; ++b) {
          this.createStar(200, 20, 400, undefined, currentAngle - 22.5);
        }
      }
      addInbetween++;
    }

    // //level 2 range upto 80px

    // //level 3 range upto 90px

    // //level 2 range upto 80px
  },
  createStar(innerRadius, minRadius, maxRadius, angle, color) {
    const star = this.generateStarData();
    let pos = this.drawStar(
      this.minCircle,
      this.maxCircle,
      innerRadius,
      this.x,
      this.y,
      minRadius,
      maxRadius,
      color,
      angle,
    );
    star.x = pos.x;
    star.y = pos.y;
    star.radius = pos.radius;
    this.starIndex++;
    this.stars.push(star);
    return star;
  },
  distSquared(pt1, pt2) {
    var diffX = pt1.x - pt2.x;
    var diffY = pt1.y - pt2.y;
    return diffX * diffX + diffY * diffY;
  },
  drawStar(
    minCircle,
    maxCircle,
    innerRadius,
    cx,
    cy,
    minRadius,
    maxRadius,
    color,
    angle,
  ) {
    var PI2 = Math.PI * 2;
    var radius = minCircle + Math.random() * (maxCircle - minCircle);
    var outerRadius = Math.floor(
      Math.random() * (maxRadius - minRadius + 1) + minRadius,
    );
    const randomAngle = Math.random() * (20 - 0 + 1) + 0;
    var distFromCenter = innerRadius + radius + outerRadius;
    var a = angle
      ? (angle + randomAngle) * (Math.PI / 180)
      : Math.random() * PI2;
    var x = cx + distFromCenter * Math.cos(a);
    var y = cy + distFromCenter * Math.sin(a);

    var hit = false;
    for (var i = 0; i < this.stars.length; i++) {
      var circle = this.stars[i];
      var dx = circle.x - x;
      var dy = circle.y - y;
      var r = circle.radius + radius;
      if (dx * dx + dy * dy <= r * r) {
        hit = true;
      }
    }
    if (!hit) {
      //var color = randomColor();
      // const circle = this.add.circle(x, y, radius, 0xffffff);
      return {
        x,
        y,
        radius: radius,
      };
    } else {
      return this.drawStar(
        minCircle,
        maxCircle,
        innerRadius,
        cx + 10,
        cy + 10,
        minRadius,
        maxRadius,
        color,
        angle,
      );
    }
  },
  generateStars() {
    const numberOfStars = this.numberOfPlayers * 23;
    const stars = [];
    for (let a = 0; a < numberOfStars; ++a) {
      const star = this.generateStarData(a);
      const pos = this.getRandomPos(stars, 20, 20);
      star.x = pos.x;
      star.y = pos.y;
      stars.push(star);
    }
    fs.writeFileSync(
      path.resolve(__dirname, './data/game.json'),
      JSON.stringify(
        {
          stars,
          planets: this.planets,
        },
        null,
        2,
      ),
      'utf8',
    );
  },
  getRandomPos(stars, size, distance) {
    let found = false;
    let x = 0;
    let y = 0;
    let count = 0;
    let width = 2000;
    let height = 1000;

    while (!found) {
      count++;
      if (count > 1000) {
        width += size;
        height += size;
        count = 0;
      }
      x = Math.floor(Math.random() * width) + size / 2;
      y = Math.floor(Math.random() * height) + size / 2;

      if (!stars.length) found = true;
      found = !stars.find(star => {
        let boundaryX = distance + size;
        let boundaryY = distance + size;

        if (
          boundaryX >= width ||
          boundaryY >= height ||
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
  },
  generateStarData() {
    const index = Math.floor(Math.random() * this.starNames.length);
    let name = this.starNames[index];
    this.starNames.splice(index, 1);
    const naturalResource = this.randomIntFromInterval(10, 70);
    const planets = this.generatePlanets();
    this.starIndex++;
    return {
      id: this.starIndex,
      name,
      naturalResource: naturalResource,
      terraformedResource: naturalResource,
      planets,
    };
  },
  generatePlanets() {
    const numberOfPlanets = this.randomIntFromInterval(5, 10);
    const planets = [];
    for (let a = 0; a < numberOfPlanets; ++a) {
      planets.push(this.generatePlanet());
    }
    return planets;
  },
  generatePlanet() {
    const index = Math.floor(Math.random() * this.planetNames.length);
    const name = this.planetNames[index];
    this.planetNames.splice(index, 1);
    const id = this.planets.length;
    const ecoMineral =
      mineral.economy[Math.floor(Math.random() * mineral.economy.length)];
    const manuMineral =
      mineral.manufacturing[
        Math.floor(Math.random() * mineral.manufacturing.length)
      ];
    this.planets.push({
      id: this.planets.length,
      name,
      mining: {
        economy: {
          mineral: ecoMineral.name,
          value: Number(ecoMineral.value),
          type: ecoMineral.type,
        },
        manufacturing: {
          mineral: manuMineral.name,
          value: Number(manuMineral.value),
          type: manuMineral.type,
        },
      },
    });
    return id;
  },
  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};
GenerateUniverse.init();
