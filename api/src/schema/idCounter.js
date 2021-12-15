const { getDb, getNextSequence } = require('../db');

async function list() {
  const db = getDb();
  const counter = await db.collection('counter').find({}).toArray();
  return counter;
}


module.exports = { list };