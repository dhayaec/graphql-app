const RandomDie = require('./RandomDie').default;
const { times } = require('../utils');

module.exports = {
  Query: {
    hello: () => 'Hello',
    quoteOfTheDay: () =>
      Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within',
    random: () => Math.random(),
    rollThreeDice: () => [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6)),
    whatsUp: () => 'Looking Good',
    rollDice: (_, { numDice, numSides }) =>
      times(numDice).map(() => 1 + Math.floor(Math.random() * (numSides || 6))),
    getDie: (_, { numSides }) => new RandomDie(numSides || 6)
  }
};
