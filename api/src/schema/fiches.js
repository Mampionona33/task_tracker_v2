const { getDb, getNextSequence } = require('../db');

async function list() {
  const db = getDb();
  const fiches = await db.collection('fiches').find({}).toArray();
  return fiches;
}

/* le varriable tache doit etre exactement 
identique au varriable qui se trouve dans schema.graphql 
 fichesAdd(fiche: FichesInputs!): Fiches! <=> async function add(_, { fiche }){...} */
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

async function search(
  _,
  {
    input: {
      lastUpdate,
      user,
      id,
      numFiche,
      typeTrav,
      submiteState,
      cat,
      statuCom,
      statuIvpn,
      processing,
    },
  }
) {
  const db = getDb();
  // create filter
  const filter = {};
  if (id) {
    filter.id = id;
  }
  if (user) {
    // filter.user = { $regex: user, $options: 'i' };
    filter.user = user;
  }
  if (numFiche) {
    filter.numFiche = { $regex: numFiche, $options: 'i' };
  }
  if (typeTrav) {
    filter.typeTrav = { $regex: typeTrav, $options: 'i' };
  }
  if (cat) {
    filter.cat = { $regex: cat, $options: 'i' };
  }
  if (statuCom) {
    filter.cat = { $regex: statuCom, $options: 'i' };
  }
  if (statuIvpn) {
    filter.statuIvpn = { $regex: statuIvpn, $options: 'i' };
  }
  if (submiteState) {
    filter.submiteState = submiteState;
  }
  if (processing) {
    filter.processing = processing;
  }
  if (lastUpdate) {
    filter.processing = lastUpdate;
  }

  const filtredFiche = await db.collection('fiches').find(filter).toArray();

  return filtredFiche;
}

async function update(
  _,
  {
    filter: { id },
    update: {
      user,
      numFiche,
      typeTrav,
      cat,
      statuCom,
      statuIvpn,
      url,
      state,
      submiteState,
      nbBefor,
      nbAft,
      startDate,
      validDate,
      elapstedTime,
      productivity,
      processing,
      lastUpdate,
    },
  }
) {
  const db = getDb();
  const filter = { id: id };
  // making partial update
  let update = [{ $set: {} }];
  if (typeTrav) {
    update[0].$set.typeTrav = typeTrav;
  }
  if (cat) {
    update[0].$set.cat = cat;
  }
  if (user) {
    update[0].$set.user = user;
  }
  if (numFiche) {
    update[0].$set.numFiche = numFiche;
  }
  if (statuCom) {
    update[0].$set.statuCom = statuCom;
  }
  if (statuIvpn) {
    update[0].$set.statuIvpn = statuIvpn;
  }
  if (url) {
    update[0].$set.url = url;
  }
  if (state) {
    update[0].$set.state = state;
  }
  if (submiteState) {
    update[0].$set.submiteState = submiteState;
  }
  if (nbBefor) {
    update[0].$set.nbBefor = nbBefor;
  }
  if (nbAft) {
    update[0].$set.nbAft = nbAft;
  }
  if (startDate) {
    update[0].$set.startDate = startDate;
  }
  if (validDate) {
    update[0].$set.validDate = validDate;
  }
  if (elapstedTime) {
    update[0].$set.elapstedTime = elapstedTime;
  }
  if (productivity) {
    update[0].$set.productivity = productivity;
  }
  if (processing) {
    update[0].$set.processing = processing;
  }
  if (lastUpdate) {
    update[0].$set.lastUpdate = lastUpdate;
  }

  const options = { upsert: false, returnNewDocument: true };

  const updateFiche = db
    .collection('fiches')
    .findOneAndUpdate(filter, ...update, options, (error, doc) => {
      if (error) {
        console.log('error');
      }
      console.log(doc);
    });
  return updateFiche;
}

async function del(_, { filter: { id } }) {
  const db = getDb();
  const delFiche = db.collection('fiches').deleteOne({ id: id });
  console.log(delFiche);
  return delFiche;
}

module.exports = { list, add, search, update, del };
