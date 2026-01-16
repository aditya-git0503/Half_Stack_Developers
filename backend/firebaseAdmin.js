// backend/firebaseAdmin.js
const admin = require('firebase-admin');

// Use the service account key you downloaded
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;