const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('../db');

async function list() {
  const db = getDb();
  const statCom = await db.collection('statCom').find({}).toArray();
  return statCom;
}

const validate = async (statCom) => {
  const prevStatComList = await list();
  const errors = [];
  if (statCom.value === '') {
    error.push('Commertial status can not be empty');
  }
  prevStatComList.forEach((element) => {
    if (element.name === statCom.name) {
      errors.push('This value already exist !! ');
    }
  });
  if (errors.length > 0) {
    console.log(errors);
    throw new UserInputError('Invalid input(s)', { errors });
  }
};

async function add(_, { statCom }) {
  const db = getDb();
  await validate(statCom);
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
