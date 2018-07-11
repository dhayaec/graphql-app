const crypto = require('crypto');
const Message = require('./models/Message');

const fakeDb = {};

const userResolver = {
  Query: {
    getMessage: id => {
      if (!fakeDb[id]) {
        throw new Error('No msg with that id');
      }
      return new Message(id, fakeDb[id]);
    }
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
    }
  }
};

module.exports = userResolver;
