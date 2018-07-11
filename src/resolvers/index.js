const path = require('path');
const { mergeResolvers, fileLoader } = require('merge-graphql-schemas');

// resolver files must follow file.resolvers.js convention
const resolversArray = fileLoader(path.join(__dirname, './**/*.resolvers.*'));
const resolvers = mergeResolvers(resolversArray);

module.exports = resolvers;
