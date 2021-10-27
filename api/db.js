require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDb() {
  const url = process.env.DB_URL;
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connect to MongoDb at ', url);
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db
    .collection('counters')
    .findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnOriginal: false }
    );
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getDb, getNextSequence };
