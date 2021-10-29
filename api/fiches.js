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

module.exports = { list, add };
