const { getDb, getNextSequence } = require('./db');

async function list() {
  const db = getDb();
  const fiches = await db.collection('fiches').find({}).toArray();
  return fiches;
}

module.exports = { list };
