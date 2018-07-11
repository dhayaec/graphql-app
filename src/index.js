const path = require('path');
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const session = require('express-session');
const ms = require('ms');
const resolvers = require('./resolvers/resolvers');

const typeDefs = importSchema(path.join(__dirname, './schemas/schema.graphql'));

const context = req => ({
  req: req.request
});

const server = new GraphQLServer({ typeDefs, resolvers, context });

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  cors: {
    credentials: true,
    origin: ['http://localhost:3000']
  }
};

server.express.use(
  session({
    name: 'sid',
    secret: `superSecretSessionKey`,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: ms('1d')
    }
  })
);

server.start(options, ({ port }) => console.info(`Listening on ${port}`));
