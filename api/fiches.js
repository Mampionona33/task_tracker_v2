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

async function search(_, { input: { numFiche, typeTrav, submiteState } }) {
  const db = getDb();
  const filtredFiche = await db
    .collection('fiches')
    .find({
      numFiche: { $regex: numFiche, $options: 'i' },
      typeTrav: { $regex: typeTrav, $options: 'i' },
      submiteState,
    })
    .toArray();
  return filtredFiche;
}

async function update(
  _,
  {
    filter: { id },
    update: {
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
  const options = { new: false, upsert: false, returnNewDocument: true };

  console.log(update);

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

module.exports = { list, add, search, update };
