const path = require('path');
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const resolvers = require('./resolvers');

const typeDefs = importSchema(path.join(__dirname, './schemas/schema.graphql'));

const server = new GraphQLServer({ typeDefs, resolvers });

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
};

server.start(options, ({ port }) => console.info(`Listening on ${port}`));
