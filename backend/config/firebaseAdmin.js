var admin = require("firebase-admin");

// var serviceAccount = require("./serviceAccountKey.json");
const serviceAccountBuffer = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64');
const serviceAccount = JSON.parse(serviceAccountBuffer.toString('utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;