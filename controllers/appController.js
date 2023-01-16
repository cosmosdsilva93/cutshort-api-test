const todos = require('../models/todoModel');

const createTodo = (async (req, res) => {
    let response = {
        success: true
    }
    try {
        console.log('Formdata -->', req.body);
        if (!req.body.title) {
            throw new Error('Title is required!')
        }
        console.log('Got required data..');
        const todoData = {
            title: req.body.title,
            created_by: ''
        }
        console.log('Saving data to db..');
        const create_todo = await todos.create(todoData);
        console.log('Saved data to db..');
        response.todo = create_todo;
        console.log('Todo created successfully..');
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.success = false;
        response.error = error.message;
        res.status(400).send(response);
    }
});

const updateTodo = (async (req, res) => {
    let response = {
        success: true
    }
    try {
        console.log('Formdata -->', req.body);
        if (!req.params.id) {
            throw new Error('Id is required!')
        }
        if (!req.body.title) {
            throw new Error('Title is required!')
        }
        console.log('Got required data..');
        console.log('Checking if todo exists..');
        const getTodo = await todos.getById(req.params.id);
        if (!Object.keys(getTodo).length) {
            throw new Error('Todo does not exists!');
        }
        console.log('Todo exists..');
        const todoData = {
            id: req.params.id,
            title: req.body.title
        }
        console.log('Saving data to db..');
        const update_todo = await todos.update(todoData);
        console.log('Saved data to db..');
        response.todo = update_todo;
        console.log('Todo updated successfully..');
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.success = false;
        response.error = error.message;
        res.status(400).send(response);
    }
});

const deleteTodo = (async (req, res) => {
    let response = {
        success: true
    }
    try {
        console.log('Formdata -->', req.body);
        if (!req.params.id) {
            throw new Error('Id is required!')
        }
        console.log('Got required data..');
        console.log('Checking if todo exists..');
        const getTodo = await todos.getById(req.params.id);
        if (!Object.keys(getTodo).length) {
            throw new Error('Todo does not exists!');
        }
        console.log('Todo exists..');
        const todoData = {
            id: req.params.id
        }
        console.log('Saving data to db..');
        const delete_todo = await todos.deelete(todoData);
        console.log('Saved data to db..');
        response.todo = delete_todo;
        console.log('Todo deleted successfully..');
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.success = false;
        response.error = error.message;
        res.status(400).send(response);
    }
});

module.exports = {
    createTodo,
    updateTodo,
    deleteTodo,
    // markAsCompleted
}