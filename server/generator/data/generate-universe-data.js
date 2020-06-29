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
  numberOfPlayers: 10,
  init() {
    this.generateStars();
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
  generateStarData(id) {
    const index = Math.floor(Math.random() * this.starNames.length);
    let name = this.starNames[index];
    this.starNames.splice(index, 1);
    const naturalResource = this.randomIntFromInterval(10, 70);
    const planets = this.generatePlanets();
    return {
      id,
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
