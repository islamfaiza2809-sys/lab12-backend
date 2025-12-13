const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lab12-firebase-e61fb-default-rtdb.firebaseio.com/",
});

const db = admin.database();

module.exports = db;
