// https://firebase.google.com/products/auth?gclid=CjwKCAiAm7OMBhAQEiwArvGi3KpLbF9EXwSVjVDv1zAbs2DA-W5tAynAz8IXxncA5QMAzOWfK2WZbhoCbJAQAvD_BwE&gclsrc=aw.ds

const fs = require('fs');
const pathResolver = require('path');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const about = require('./schema/about');
const fiches = require('./schema/fiches');
const typeTache = require('./schema/typeTache');
const statCom = require('./schema/statusCom');
const statIvpn = require('./schema/statIvpn');
const idCounter = require('./schema/idCounter');
const GraphQLDate = require('./schema/graphql_date');
const taskCase = require('./schema/taskCase');

const resolvers = {
  Query: {
    about: about.getMessage,

    listFiches: fiches.list,

    searchFiches: fiches.search,

    listTypeTaches: typeTache.list,

    listStatCom: statCom.list,

    listStatIvpn: statIvpn.list,

    listTaskCase: taskCase.list,

    idCounter: idCounter.list,
  },
  Mutation: {
    setAboutMessage: about.setMessage,
    // type de tache
    typeTachesAdd: typeTache.add,
    typeTacheUpdate: typeTache.update,
    typeTacheDelete: typeTache.del,

    // fiches
    fichesAdd: fiches.add,
    fichesUpdate: fiches.update,
    fichesDelete: fiches.del,

    // StatCom
    statComAdd: statCom.add,
    statComUpdate: statCom.update,
    statComDelete: statCom.del,

    // Status IVPN
    statIvpnAdd: statIvpn.add,
    statIvpnUpdate: statIvpn.update,
    statIvpnDelete: statIvpn.del,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    pathResolver.join(__dirname, 'schema/schema.graphql'),
    'utf-8'
  ),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

async function installHandler(app) {
  await server.start();
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting: ', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };
