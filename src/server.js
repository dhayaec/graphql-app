const path = require('path');
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { times } = require('./utils');

const typeDefs = importSchema(path.join(__dirname, './schemas/schema.graphql'));

const resolvers = {
  Query: {
    hello: () => 'Hello',
    quoteOfTheDay: () =>
      Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within',
    random: () => Math.random(),
    rollThreeDice: () => [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6)),
    whatsUp: () => 'Looking Good',
    rollDice: (_, { numDice, numSides }) =>
      times(numDice).map(() => 1 + Math.floor(Math.random() * (numSides || 6)))
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
};

server.start(options, ({ port }) => console.info(`Listening on ${port}`));
