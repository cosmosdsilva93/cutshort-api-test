const admin = require('firebase-admin');
const serviceAccount = require('../auth-files/zymeth-1993-cd-firebase-adminsdk-h1gv2-f33a49bd8b.json');

console.log('Initializing firebase app..');
const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

console.log('Initialized firebase app..');

const dbConnect = () => {
    try {
        const db = firebaseApp.firestore();
        return db;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    dbConnect
}