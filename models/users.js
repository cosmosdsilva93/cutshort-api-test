const firestore = require('../helpers/firestoreHelper');
const moment = require('moment');
const md5 = require('md5');
const {uid} = require('uid');

const db = firestore.dbConnect();
const users = db.collection('users');


const create = async (userdata) => {
    try {
        const userId = uid(10);
        userdata.password = md5(userdata.password);
        userdata.created_on = moment().format('YYYY-MM-DD HH:mm:ss')
        userdata.status = 1
        userdata.admin = false;
        await users.doc(userId).set(userdata, {merge: true});
        userdata.uid = userId;
        delete userdata.password;
        return userdata;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    create
}