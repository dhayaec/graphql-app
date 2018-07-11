const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const RandomDie = require('./RandomDie');
const Message = require('./Message');
const { times } = require('../utils');

const fakeDb = {};

const fakeUsers = {};

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
    getDie: (_, { numSides }) => new RandomDie(numSides || 6),
    getMessage: id => {
      if (!fakeDb[id]) {
        throw new Error('No msg with that id');
      }
      return new Message(id, fakeDb[id]);
    },
    isLogin: (_, args, { req }) => typeof req.session.user !== 'undefined',
    loggedInUser: (_, args, { req }) => req.session.user
  },
  Mutation: {
    createMessage: (_, { input }) => {
      const id = crypto.randomBytes(10).toString('hex');
      fakeDb[id] = input;
      return new Message(id, input);
    },
    updateMessage: (_, { id, input }) => {
      if (!fakeDb[id]) {
        throw new Error(`No message with that id ${id}`);
      }
      fakeDb[id] = input;
      return new Message(id, fakeDb[id]);
    },
    deleteMessage: (_, { id }) => {
      delete fakeDb[id];
      return 'deleted';
    },
    signup: async (_, { username, password }) => {
      if (fakeUsers[username]) {
        throw new Error(
          `An user with ther username ${username} already exists!`
        );
      }
      fakeUsers[username] = {
        password: await bcrypt.hashSync(password, 10)
      };
      return true;
    },
    login: async (_, { username, password }, { req }) => {
      const user = fakeUsers[username];
      if (user) {
        if (await bcrypt.compareSync(password, user.password)) {
          req.session.user = {
            ...user
          };
          return true;
        }
        throw new Error('Invalid username or password!');
      }
      throw new Error('No such user exists!');
    },
    logout: (_, args, { req }) => req.session.destroy()
  }
};
