const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const about = require('./about');

const resolvers = {
  Query: {
    about: about.getMessage,
  },
  Mutation: {
    setAboutMessage: about.setMessage,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

async function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting: ', enableCors);
  await server.start();
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };
