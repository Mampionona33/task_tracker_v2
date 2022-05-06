const { getDb, getNextSequence } = require('../db');
const { UserInputError } = require('apollo-server-express');

async function list() {
  const db = getDb();
  const taches = await db.collection('typeTache').find({}).toArray();
  return taches;
}

function validate(tache) {
  const errors = [];
  if (tache.name === '') {
    errors.push('Nom de la type de tache ne doit pas étre vide');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
  return tache;
}
/* le varriable tache doit etre exactement 
identique au varriable qui se trouve dans schema.graphql 
 tachesAdd(tache: TachesInputs): Taches <=> async function add(_, { tache }) */

async function add(_, { typeTache }) {
  validate(typeTache);
  const db = getDb();
  const newTache = Object.assign({}, typeTache);
  newTache.id = await getNextSequence('typeTache');

  const result = await db.collection('typeTache').insertOne(newTache);
  const savedTaches = await db
    .collection('fiches')
    .findOne({ _id: result.insertedId });
  return savedTaches;
}

async function update(_, { filter: { id }, update: { name, objectif } }) {
  const db = getDb();
  const filter = { id: id };
  const update = [{ $set: {} }];
  if (name) {
    update[0].$set.name = name;
  }
  if (objectif) {
    update[0].$set.objectif = objectif;
  }
  const options = { upsert: false, returnNewDocument: true };
  const updateFiche = db
    .collection('typeTache')
    .findOneAndUpdate(filter, ...update, options, (error, doc) => {
      if (error) {
        console.log('error');
      }
      console.log(doc);
    });
  return updateFiche;
}

async function del(_, { filter: { id } }) {
  const db = getDb();
  const filter = { id: id };
  console.log('filter : ', filter);
  const deletedTache = db.collection('typeTache').deleteOne(filter);
  return deletedTache;
}

module.exports = { list, add, update, del };
