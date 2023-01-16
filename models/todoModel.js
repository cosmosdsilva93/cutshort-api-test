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
        data.completed = 0
        await users.doc(todoId).set(data, {merge: true});
        data = await getById(todoId);
        return data;
    } catch (error) {
        throw error;
    }
}

const update = async (data) => {
    try {
        const todoId = data.id;
        delete data.id;
        data.updated_on = moment().format('YYYY-MM-DD HH:mm:ss');
        await users.doc(todoId).update(data);
        data = await getById(todoId);
        return data;
    } catch (error) {
        throw error;
    }
}

const deelete = async (data) => {
    try {
        const todoId = data.id;
        delete data.id;
        data.updated_on = moment().format('YYYY-MM-DD HH:mm:ss');
        data.status = 1;
        await users.doc(todoId).update(data);
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

const getById = async (uid) => {
    try {
        let response = {};
        let getTodo = await users.doc(uid).get();
        if (getTodo.exists) {
            const todoData = getTodo.data();
            if (!todoData.status) {
                response = todoData;
                response.id = uid;
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    get,
    create,
    update,
    deelete,
    getById
}