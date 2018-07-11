const { times } = require('../utils');

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll(numRolls) {
    return times(numRolls).map(() => this.rollOnce());
  }
}

module.exports = RandomDie;
