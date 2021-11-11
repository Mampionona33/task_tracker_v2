const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('../db');

async function list() {
  const db = getDb();
  const statCom = await db.collection('statCom').find({}).toArray();
  return statCom;
}

async function add(_, { statCom }) {
  const db = getDb();
  const newStatCom = Object.assign({}, statCom);
  newStatCom.id = await getNextSequence('statCom');

  const result = await db.collection('statCom').insertOne(newStatCom);
  const savedStatCom = await db
    .collection('statCom')
    .findOne({ _id: result.insertedId });
  return savedStatCom;
}

async function update(_, { filter: { id }, update: { value } }) {
  const db = getDb();
  const filter = { id: id };
  const update = { $set: { value: value } };
  const options = { upsert: false, returnNewDocument: true };
  const updateStatCom = db
    .collection('statCom')
    .findOneAndUpdate(filter, update, options);
  const savedUpdate = db.collection('statCom').findOne({ id: id });
  return savedUpdate;
}

async function del(_, { filter: { id } }) {
  const db = getDb();
  const filter = { id: id };
  const deletedStatCom = db.collection('statCom').deleteOne(filter);
  return deletedStatCom;
}

module.exports = { list, add, update, del };
