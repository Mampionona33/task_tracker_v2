const { getDb, getNextSequence } = require('./db');

async function list() {
  const db = getDb();
  const fiches = await db.collection('fiches').find({}).toArray();
  return fiches;
}

async function add(_, { fiche }) {
  console.log(fiche);
  const db = getDb();
  const newFiches = Object.assign({}, fiche);
  newFiches.id = await getNextSequence('fiches');

  const result = await db.collection('fiches').insertOne(newFiches);
  const savedFiche = await db
    .collection('fiches')
    .findOne({ _id: result.insertedId });
  return savedFiche;
}

async function search(_, { input: { numFiche } }) {
  const db = getDb();
  const filtredFiche = await db
    .collection('fiches')
    .find({ numFiche: { $regex: numFiche, $options: 'i' } })
    .toArray();
  return filtredFiche;
}

module.exports = { list, add, search };
