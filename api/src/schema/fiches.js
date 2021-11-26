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
  { input: { numFiche, typeTrav, submiteState, cat, statuCom, statuIvpn } }
) {
  const db = getDb();
  // create filter
  const filter = {};
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
    filter.cat = { $regex: statuIvpn, $options: 'i' };
  }
  if (submiteState) {
    filter.submiteState = submiteState;
  }

  const filtredFiche = await db.collection('fiches').find(filter).toArray();

  return filtredFiche;
}

async function update(
  _,
  {
    filter: { id },
    update: {
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
      duree,
      productivity,
    },
  }
) {
  const db = getDb();
  const filter = { id: id };
  const update = {
    $set: {
      typeTrav: typeTrav,
      cat: cat,
      numFiche: numFiche,
      statuCom: statuCom,
      statuIvpn: statuIvpn,
      url: url,
      state: state,
      submiteState: submiteState,
      nbBefor: nbBefor,
      nbAft: nbAft,
      startDate: startDate,
      validDate: validDate,
      duree: duree,
      productivity: productivity,
    },
  };
  const options = { upsert: false, returnNewDocument: true };

  const updateFiche = db
    .collection('fiches')
    .findOneAndUpdate(filter, update, options, (error, doc) => {
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
