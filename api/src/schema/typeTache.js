const { getDb, getNextSequence } = require('../db');
const { UserInputError } = require('apollo-server-express');

async function list() {
  const db = getDb();
  const taches = await db.collection('typeTache').find({}).toArray();
  return taches;
}

async function validate(tache) {
  const prevTypeTaskList = await list();
  const errors = [];
  if (typeof tache.objectif !== 'number') {
    errors.push('Task Goal must be a number');
    console.log('task goal type is ', typeof tache.objectif);
  }

  prevTypeTaskList.forEach((element) => {
    const regExName = new RegExp("^"+ element.name ,'i');
    if(tache.name.match(regExName)){
      console.log(element);
      errors.push('This value already exist !!');
    }
  });

  if (tache.name === '') {
    errors.push('Task type must not be empty');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
  
}
/* le varriable tache doit etre exactement 
identique au varriable qui se trouve dans schema.graphql 
 tachesAdd(tache: TachesInputs): Taches <=> async function add(_, { tache }) */

async function add(_, { typeTache }) {
  await validate(typeTache);
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
