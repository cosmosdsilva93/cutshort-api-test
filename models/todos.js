const firestore = require('../helpers/firestoreHelper');
const moment = require('moment');
const {uid} = require('uid');

const db = firestore.dbConnect();
const users = db.collection('todos');


const create = async (data) => {
    try {
        const todoId = uid(10);
        data.created_on = moment().format('YYYY-MM-DD HH:mm:ss')
        data.status = 0
        await users.doc(todoId).set(data, {merge: true});
        data.id = todoId;
        return data;
    } catch (error) {
        throw error;
    }
}

const get = async(userdata) => {
    try {
        let response = {};
        const password = md5(userdata.password);
        let getUser = await users.where('email', '==', userdata.email).where('password', '==', password).where('status', '==', 0).limit(1).get();
        getUser.forEach((doc) => {
            response = doc.data();
            response.uid = doc.id;
            delete response.password;
        });
        return response;
    } catch (error) {
        throw error; 
    }
}

module.exports = {
    create,
    get
}