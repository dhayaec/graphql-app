const bcrypt = require('bcryptjs');

const fakeUsers = {};
const authResolver = {
  Query: {
    isLogin: (_, args, { req }) => typeof req.session.user !== 'undefined',
    loggedInUser: (_, args, { req }) => req.session.user
  },
  Mutation: {
    signup: async (_, { username, password }) => {
      if (fakeUsers[username]) {
        throw new Error(
          `An with username ${username} already exists!`
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
            username
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

module.exports = authResolver;
