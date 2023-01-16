const firestore = require('../helpers/firestoreHelper');
const moment = require('moment');
const {uid} = require('uid');

const db = firestore.dbConnect();
const todos = db.collection('todos');


const create = async (data) => {
    try {
        const todoId = uid(10);
        data.created_on = moment().format('YYYY-MM-DD HH:mm:ss')
        data.status = 0
        data.completed = 0
        await todos.doc(todoId).set(data, {merge: true});
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
        await todos.doc(todoId).update(data);
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
        await todos.doc(todoId).update(data);
        data.id = todoId;
        return data;
    } catch (error) {
        throw error;
    }
}

const get = async(userId) => {
    try {
        let response = {};
        let allTodos = [];
        const getTodos = await todos.where('created_by', '==', userId).where('status', '==', 0).get();
        getTodos.forEach((doc) => {
            const todo = doc.data();
            todo.id = doc.id;
            allTodos.push(todo)
        });
        if (allTodos.length > 0) {
            response.todos = allTodos;
        }
        return response;
    } catch (error) {
        throw error; 
    }
}

const getById = async (uid) => {
    try {
        let response = {};
        let getTodo = await todos.doc(uid).get();
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

const getTodosByUserId = async (userId) => {
    try {
        let response = [];
        const getTodos = await todos.where('created_by', '==', userId).where('status', '==', 0).get();
        getTodos.forEach((doc) => {
            const todo = doc.data();
            todo.id = doc.id;
            response.push(todo)
        });
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
    getById,
    getTodosByUserId
}