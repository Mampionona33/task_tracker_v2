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
  validate(tache);
  const db = getDb();
  const newTache = Object.assign({}, tache);
  newTache.id = await getNextSequence('taches');

  const result = await db.collection('taches').insertOne(newTache);
  const savedTaches = await db
    .collection('fiches')
    .findOne({ _id: result.insertedId });
  return savedTaches;
}

async function update(_, { filter: { id }, update: { name, objectif } }) {
  const db = getDb();
  const filter = { id: id };
  const update = {
    $set: {
      name: name,
      objectif: objectif,
    },
  };
  const options = { upsert: false, returnNewDocument: true };
  const updateFiche = db
    .collection('taches')
    .findOneAndUpdate(filter, update, options, (error, doc) => {
      if (error) {
        console.log('error');
      }
      console.log(doc);
    });
  return updateFiche;
}

async function del(_, { filter: { id } }) {
  const db = getDb();
  const deletedTache = db.collection('taches').deleteOne({ id: id });
  return deletedTache;
}

module.exports = { list, add, update, del };
