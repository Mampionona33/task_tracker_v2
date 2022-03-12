const { getDb, getNextSequence } = require('../db');

async function list() {
  const db = getDb();
  const taskCase = await db.collection('taskCase').find({}).toArray();
  return taskCase;
}

async function add(_,{}) {
    
}

module.exports = { list };
