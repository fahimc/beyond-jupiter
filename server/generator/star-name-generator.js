const fs = require('fs');
const path = require('path');

const GenerateStarName = {
  init() {
    const content = fs.readFileSync(
      path.resolve(__dirname, './data/stars.txt'),
      'utf8',
    );
    const regex = /<li>.+>(.*?)</gm;
    let starNameMatches = content.match(regex);
    let starNames = [];
    if (starNameMatches) {
      starNameMatches.forEach(match => {
        let name = match.match(/">(.*?)</)[1].toLowerCase();
        name = name.replace(/\W/g, '');
        const names = name.split(' ');
        names.forEach(n => {
          if (n.length > 1 && n) {
            starNames.push(
              (n.charAt(0).toUpperCase() + n.slice(1)).substring(0, 10),
            );
          }
        });
      });
      starNames = [...new Set(starNames)];

      const random = this.createRandomStarNames(1000);
      starNames = starNames.concat(random);
      fs.writeFileSync(
        path.resolve(__dirname, './data/stars.json'),
        JSON.stringify(starNames, null, 2),
        'utf8',
      );
    }

    this.generatePlanetNames();
  },
  generatePlanetNames() {
    const random = this.createRandomStarNames(10000, 4, 10);
    fs.writeFileSync(
      path.resolve(__dirname, './data/planets.json'),
      JSON.stringify(random, null, 2),
      'utf8',
    );
  },
  createRandomStarNames(count, min, max) {
    let starNames = [];
    let length = 0;
    let stuck = 0;
    while (length < count) {
      if (stuck > 100) {
        stuck = 0;
        break;
      }
      const wordLength = this.randomIntFromInterval(
        min ? min : 3,
        max ? max : 5,
      );
      let name = this.createRandomWord(wordLength);
      starNames.push(name);
      starNames = [...new Set(starNames)];
      length = starNames.length;
    }
    if (starNames.length !== count) {
      console.log('failed to create names');
    }
    return starNames;
  },
  createRandomWord(length) {
    var consonants = 'bcdfghjlmnpqrstv',
      vowels = 'aeiou',
      rand = function (limit) {
        return Math.floor(Math.random() * limit);
      },
      i,
      word = '',
      length = parseInt(length, 10),
      consonants = consonants.split(''),
      vowels = vowels.split('');
    for (i = 0; i < length / 2; i++) {
      var randConsonant = consonants[rand(consonants.length)],
        randVowel = vowels[rand(vowels.length)];
      word += i === 0 ? randConsonant.toUpperCase() : randConsonant;
      word += i * 2 < length - 1 ? randVowel : '';
    }
    return word;
  },
  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};

GenerateStarName.init();
