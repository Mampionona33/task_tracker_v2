const { getDb, getNextSequence } = require('./db');
const { UserInputError } = require('apollo-server-express');

async function list() {
  const db = getDb();
  const taches = await db.collection('taches').find({}).toArray();
  return taches;
}

function validate(tache) {
  const errors = [];
  if (tache.name === null) {
    errors.push('Nom de la type de tache ne doit pas étre vide');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}
/* le varriable tache doit etre exactement 
identique au varriable qui se trouve dans schema.graphql 
 tachesAdd(tache: TachesInputs): Taches <=> async function add(_, { tache }) */

async function add(_, { tache }) {
  console.log(tache);
  validate(tache);
  const db = getDb();
  const newTache = Object.assign({}, tache);
  newTache.id = await getNextSequence('taches');

  const result = await db.collection('taches').insertOne(newTache);
  const savedTaches = await db
    .collection('fiches')
    .findOne({ _id: result.insertedId });
  return savedTaches;
  console.log(savedTaches);
}

module.exports = { list, add };
