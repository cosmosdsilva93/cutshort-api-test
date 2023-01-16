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
        userdata.status = 0
        userdata.admin = false;
        await users.doc(userId).set(userdata, {merge: true});
        userdata.uid = userId;
        delete userdata.password;
        return userdata;
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async(email) => {
    try {
        let response = {};
        let getUser = await users.where('email', '==', email).where('status', '==', 0).limit(1).get();
        getUser.forEach((doc) => {
            response = doc.data();
            response.uid = doc.id;
        });
        return response;
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

const getAllUsers = async() => {
    try {
        let response = {};
        let allUsers = [];
        const getUsers = await users.where('status', '==', 0).get();
        getUsers.forEach((doc) => {
            const user = doc.data();
            user.uid = doc.id;
            allUsers.push(user)
        });
        if (allUsers.length > 0) {
            response.users = allUsers;
        }
        return response;
    } catch (error) {
        throw error; 
    }
}

const getUserById = async (id) => {
    try {
        let response = {};
        let getUser = await users.doc(id).get();
        if (getUser.exists) {
            const userData = getUser.data();
            if (!userData.status) {
                response = userData;
                response.uid = id;
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    create,
    get,
    getUserByEmail,
    getAllUsers,
    getUserById
}