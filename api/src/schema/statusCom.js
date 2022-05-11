const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('../db');

async function list() {
  const db = getDb();
  const statCom = await db.collection('statCom').find({}).toArray();
  return statCom;
}

const validate = (statCom) => {
  const error = [];
  if (statCom.value === '') {
    error.push('Commertial status can not be empty');
  }
  if (error.length > 0) {
    throw new UserInputError('Invalid inputs(s)', { errors });
  }
  return statCom;
};

async function add(_, { statCom }) {
  const db = getDb();
  validate(statCom);
  const newStatCom = Object.assign({}, statCom);
  newStatCom.id = await getNextSequence('statCom');

  const result = await db.collection('statCom').insertOne(newStatCom);
  const savedStatCom = await db
    .collection('statCom')
    .findOne({ _id: result.insertedId });
  return savedStatCom;
}

async function update(_, { filter: { id }, update: { name } }) {
  const db = getDb();
  const filter = { id: id };
  const update = [{ $set: {} }];
  if (name) {
    update[0].$set.name = name;
  }
  const options = { upsert: false, returnNewDocument: true };
  const updateStatCom = db
    .collection('statCom')
    .findOneAndUpdate(filter, update, options);
  const savedUpdate = db.collection('statCom').findOne({ id: id });
  if (updateStatCom) {
    return savedUpdate;
  }
}

async function del(_, { filter: { id } }) {
  const db = getDb();
  const filter = { id: id };
  const deletedStatCom = db.collection('statCom').deleteOne(filter);
  return deletedStatCom;
}

module.exports = { list, add, update, del };
