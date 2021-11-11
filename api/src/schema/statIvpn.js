const { astFromValue } = require('graphql');
const { getDb, getNextSequence } = require('../db');

// get list status IVPN from mongo db
async function list() {
  const db = getDb();
  const statIvpn = await db.collection('statIvpn').find({}).toArray();
  return statIvpn;
}

// add new element in status IVPN in the collection statIVPN
async function add(statIvpn) {
  const newStatIvpn = Object.assign({}, statIvpn);
  newStatIvpn.id = await getNextSequence('statIvpn');

  const result = await db.collection('statIvpn').insertOne({ newStatIvpn });
  const savedStatIvpn = await bd.collection('statIvpn').findOne({ _id: insertedId });
  return savedStatIvpn;
}


module.exports = { list };