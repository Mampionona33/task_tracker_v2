const { getDb, getNextSequence } = require('../db');
const { UserInputError } = require('apollo-server-express');

// input validation
async function validation(statIvpn) {
  const prevStatuIvpn = await list();
  // console.log('prevStatuIvpn', prevStatuIvpn);
  const errors = [];
  let nameLenght = statIvpn.name.length;
  // check if user insert more than one character
  if (nameLenght > 1) {
    errors.push(`IVPN status must a single letter`);
  }
  // check if user insert no character
  if (nameLenght <= 0) {
    errors.push(`IVPN status must not be empty`);
  }

  const regExName = /[a-z]/gi;
  if (!statIvpn.name.match(regExName)) {
    errors.push(`IVPN status must be a letter`);
  }

  prevStatuIvpn.forEach((element) => {
    if (element.name === statIvpn.name) {
      errors.push(`This value already exist !!`);
    }
  });
  // check if there is some error , them print the error
  if (errors.length > 0) {
    console.log(errors);
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function validateUpdate(name) {
  const errors = [];
  let nameLenght = name.length;

  if (nameLenght > 1) {
    errors.push(`Le statut IVPN ne doit comporter qu' une seule caractère`);
  }
  if (nameLenght <= 0) {
    errors.push(`Le statut IVPN ne doit pas étre vide`);
  }
  if (errors.length > 0) {
    console.log(errors.length);
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

// get list status IVPN from mongo db
async function list() {
  const db = getDb();
  const statIvpn = await db.collection('statIvpn').find({}).toArray();
  return statIvpn;
}

// Add new element in status IVPN in the collection statIVPN
async function add(_, { statIvpn }) {
  // connect to database
  const db = getDb();
  // validate the user input
  await validation(statIvpn);
  // copier le valeur de statIvpn dans un objet {}
  const newStatIvpn = Object.assign({}, statIvpn);
  // recurer l'id suivant venant de getNextSequence est l'assigner a l'id de newStatIvpn
  newStatIvpn.id = await getNextSequence('statIvpn');
  // inserer newStatIvpn dans la collection "statIvpn"
  const result = await db.collection('statIvpn').insertOne(newStatIvpn);
  const savedStatIvpn = await db
    .collection('statIvpn')
    .findOne({ _id: result.insertedId });
  return savedStatIvpn;
}

// update element in satus IVPN collection's, take two argumment filter and update
async function update(_, { filter: { id }, update: { name } }) {
  // connect to database
  const db = getDb();
  // initialise parameters
  const filter = { id: id };
  // const update = { $set: { name: name } };
  const update = [{ $set: {} }];
  if (name) {
    update[0].$set.name = name;
  }
  // console.log(`name est : ${name}`);
  const options = { upsert: false, returnNewDocument: true };
  // validate the user input before proced to update
  await validateUpdate(name);
  // find the document with filter and proced the update with $set
  const updateStatIvpn = db
    .collection('statIvpn')
    .findOneAndUpdate(filter, update, options);

  const result = db.collection('statIvpn').findOne({ id: id });
  return result;
}

// delete element from status IVPN
async function del(_, { filter: { id } }) {
  // connect to database
  const db = getDb();

  // initialise filter
  const filter = { id: id };

  // find and delete element in database
  const delStatIvpn = db.collection('statIvpn').deleteOne(filter);
  return delStatIvpn;
}

module.exports = { list, add, update, del };
