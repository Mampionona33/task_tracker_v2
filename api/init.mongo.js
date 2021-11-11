// Initialisation of db run this command in api folder: node init.mongo.js

// Atlas URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/task_tracker?retryWrites=true';
const { MongoClient } = require('mongodb');

const url =
  'mongodb+srv://mampionona:daddy4806@cluster0.tksr3.mongodb.net/task_tracker?retryWrites=true';

async function resetMongo() {
  console.log('\n--- initialising Mongodb --- \n');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to MongoDb');
    const db = client.db();
    const collectionFiches = db.collection('fiches');
    const collectionCounter = db.collection('counter');
    const collectionTypeTaches = db.collection('typeTache');
    const collectionStatCom = db.collection('statCom');
    const initialCounter = [
      {
        _id: 'fiches',
        current: 7,
      },
      {
        _id: 'typeTaches',
        current: 48,
      },
      {
        _id: 'statCom',
        current: 10,
      },
    ];
    const initialFiches = [
      {
        id: 1,
        typeTrav: 'Contenu',
        numFiche: '15454',
        statuCom: 'Abandon',
        statuIvpn: 'I',
        url: 'http://www.directindustry.com/r/FicheSociete.php?s=174711&w=1232305TiNo4Hs6tZmC5l2D56Z41Y1Z2l2V7pzgri52S4p3T3&droit=on',
        state: 'Normal',
        submiteState: false,
        nbBefor: 5,
        nbAft: 50,
        startDate: '29/10/2021',
        validDate: '29/10/2021',
        duree: '03:15:00',
        productivity: '100%',
      },

      {
        id: 2,
        typeTrav: 'ContenuMaj',
        numFiche: '4545',
        statuCom: '---',
        statuIvpn: 'P',
        url: 'http://www.directindustry.com/r/FicheSociete.php?s=174711&w=1232305TiNo4Hs6tZmC5l2D56Z41Y1Z2l2V7pzgri52S4p3T3&droit=on',
        state: 'Paf',
        submiteState: false,
        nbBefor: 5,
        nbAft: 50,
        startDate: '29/10/2021',
        validDate: '29/10/2021',
        duree: '03:15:00',
        productivity: '102%',
      },
      {
        id: 3,
        typeTrav: 'AUTOVALIDCREAPrio',
        numFiche: '188595',
        statuCom: '---',
        statuIvpn: 'P',
        url: 'http://www.directindustry.com/r/FicheSociete.php?s=188595&w=1636487TiNo4Hs6tZmC5l2D56Z41Y1Z2l2V7pzgri52S4p3T3&droit=on',
        state: 'Sby',
        submiteState: false,
        nbBefor: 0,
        nbAft: 22,
        startDate: '29/10/2021',
        validDate: '29/10/2021',
        duree: '03:15:00',
        productivity: '103%',
      },
      {
        id: 4,
        typeTrav: 'AUTOVALIDCREAPrio',
        numFiche: '126963',
        statuCom: 'Dégradé',
        statuIvpn: 'P',
        url: 'http://www.directindustry.com/restricted/FicheSociete.php?&s=126963&w=1277939TiNo4Hs6tZmC5l2D56Z41Y1Z2l2V7pzgri52S4p3T3&droit=on',
        state: 'Normal',
        submiteState: false,
        nbBefor: 11,
        nbAft: 11,
        startDate: '29/10/2021',
        validDate: '29/10/2021',
        duree: '03:15:00',
        productivity: '100%',
      },
      {
        id: 5,
        typeTrav: 'CréaPrio',
        numFiche: '239657',
        statuCom: '---',
        statuIvpn: 'P',
        url: 'http://www.directindustry.com/r/FicheSociete.php?s=239657&w=1789817fs!RiGhtOwtSrCing&droit=stag&user=Mampionona',
        state: 'Normal',
        submiteState: true,
        nbBefor: 11,
        nbAft: 11,
        startDate: '29/10/2021',
        validDate: '29/10/2021',
        duree: '03:15:00',
        productivity: '100%',
      },
      {
        id: 6,
        typeTrav: 'MAJPrio',
        numFiche: '14922',
        statuCom: 'Abonné',
        statuIvpn: 'P',
        url: 'http://www.directindustry.com/r/FicheSociete.php?s=14922&w=98456ERfs!RiGhtOwtSrCing&droit=stag&user=mampionona',
        state: 'Normal',
        submiteState: true,
        nbBefor: 178,
        nbAft: 164,
        startDate: '29/10/2021',
        validDate: '29/10/2021',
        duree: '03:15:00',
        productivity: '100%',
      },
    ];
    const initTypeTaches = [
      {
        id: 1,
        name: ' Contenu ',
        objectif: 16,
      },
      {
        id: 2,
        name: ' Contenu (Zappé) ',
        objectif: 80,
      },
      {
        id: 3,
        name: ' Contenu +20 ',
        objectif: 15.5,
      },
      {
        id: 4,
        name: ' ContenuFullCréa ',
        objectif: 15,
      },
      {
        id: 5,
        name: ' ContenuFullCréaPrio ',
        objectif: 15,
      },
      {
        id: 6,
        name: ' ContenuFullMAJ ',
        objectif: 15.5,
      },
      {
        id: 7,
        name: ' ContenuFullMAJPrio ',
        objectif: 15.5,
      },
      {
        id: 8,
        name: ' Créa ',
        objectif: 6.5,
      },
      {
        id: 9,
        name: ' CréaLight ',
        objectif: 8.5,
      },
      {
        id: 10,
        name: ' CréaLightPrio ',
        objectif: 8.5,
      },
      {
        id: 11,
        name: ' CréaPrio ',
        objectif: 6.5,
      },
      {
        id: 12,
        name: ' MAJ ',
        objectif: 8,
      },
      {
        id: 13,
        name: ' MAJLight ',
        objectif: 10,
      },
      {
        name: ' MAJLightPrio ',
        objectif: 10,
        id: 14,
      },
      {
        name: ' MAJPrio ',
        objectif: 8,
        id: 15,
      },
      {
        name: ' MAJFullPrio ',
        objectif: 6.5,
        id: 16,
      },
      {
        name: ' MAJFull ',
        objectif: 6.5,
        id: 17,
      },
      {
        name: ' MAJSPEC ',
        objectif: 10,
        id: 18,
      },
      {
        name: ' PDF ',
        objectif: 20,
        id: 19,
      },
      {
        name: ' MAJ BOOST ',
        objectif: 80,
        id: 20,
      },
      {
        name: ' Jugement ',
        objectif: 50,
        id: 21,
      },
      {
        name: ' REASSOPROD ',
        objectif: 60,
        id: 22,
      },
      {
        name: ' AUTOVALIDCREA ',
        objectif: 6.5,
        id: 23,
      },
      {
        name: ' AUTOVALIDMAJ ',
        objectif: 8,
        id: 24,
      },
      {
        name: ' RFQ ',
        objectif: 10,
        id: 25,
      },
      {
        name: ' MAJ Prix ',
        objectif: 15,
        id: 26,
      },
      {
        name: ' Projet Prix ',
        objectif: 12,
        id: 27,
      },
      {
        name: ' VALIDCLIENT ',
        objectif: 2,
        id: 28,
      },
      {
        name: ' VALIDOUT ',
        objectif: 5,
        id: 29,
      },
      {
        name: ' Matching Grille Tarifaire ',
        objectif: 10,
        id: 30,
      },
      {
        name: ' Matching PDF ',
        objectif: 5,
        id: 31,
      },
      {
        name: ' CREADemo ',
        objectif: 60,
        id: 32,
      },
      {
        id: 33,
        name: ' MAJT ',
        objectif: 5,
      },
      {
        id: 34,
        name: ' MAJNew ',
        objectif: 3,
      },
      {
        id: 35,
        name: ' AUTOVALIDCREADemo ',
        objectif: 60,
      },
      {
        id: 36,
        name: ' AUTOVALIDCREADemoLIGHT ',
        objectif: 65,
      },
      {
        id: 37,
        name: ' AUTOVALIDCREADemoFULL ',
        objectif: 65,
      },
      {
        id: 38,
        name: ' AUTOVALIDMAJT ',
        objectif: 5,
      },
      {
        id: 39,
        name: ' AUTOVALIDMAJTLIGHT ',
        objectif: 10,
      },
      {
        id: 40,
        name: ' AUTOVALIDMAJTFULL ',
        objectif: 15,
      },
      {
        id: 41,
        name: ' AUTOVALIDMAJNew ',
        objectif: 3,
      },
      {
        id: 42,
        name: ' AUTOVALIDCREAPrio ',
        objectif: 6.5,
      },
      {
        id: 43,
        name: ' AUTOVALIDCREALIGHTPrio ',
        objectif: 8.5,
      },
      {
        id: 44,
        name: ' AUTOVALIDCREAFULLPrio ',
        objectif: 15,
      },
      {
        id: 45,
        name: ' AUTOVALIDMAJPrio ',
        objectif: 8,
      },
      {
        id: 46,
        name: ' AUTOVALIDMAJLIGHTPrio ',
        objectif: 10,
      },
      {
        id: 47,
        name: ' AUTOVALIDMAJFULLPrio ',
        objectif: 15,
      },
    ];
    const initialStatCom = [
      {
        id: 1,
        value: '---',
      },
      {
        id: 2,
        value: 'Abondon',
      },
      {
        id: 3,
        value: 'Abonné',
      },
      {
        id: 4,
        value: 'Dégradé',
      },
      {
        id: 5,
        value: 'Dégradé Definitif',
      },
      {
        id: 6,
        value: 'Essai',
      },
      {
        id: 7,
        value: 'EssaiNouveau',
      },
      {
        id: 8,
        value: 'Essai Payant',
      },
      {
        id: 9,
        value: 'Retiré',
      },
    ];

    await collectionFiches.deleteMany({});
    await collectionFiches.insertMany(initialFiches);

    await collectionCounter.deleteMany({});
    await collectionCounter.insertMany(initialCounter);

    await collectionTypeTaches.deleteMany({});
    await collectionTypeTaches.insertMany(initTypeTaches);

    await collectionStatCom.deleteMany({});
    await collectionStatCom.insertMany(initialStatCom);

    const resultFiches = await collectionFiches.find({}).toArray();
    const resultCounter = await collectionCounter.find({}).toArray();
    const resultTypeTaches = await collectionTypeTaches.find({}).toArray();
    const resultStatCom = await collectionStatCom.find({}).toArray();
    console.log(
      'Result of insert: \n',
      resultFiches,
      '----- \n ',
      resultCounter,
      '----- \n',
      resultTypeTaches,
      '----- \n',
      resultStatCom
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

resetMongo();