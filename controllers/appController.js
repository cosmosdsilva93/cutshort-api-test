const todos = require('../models/todoModel');
const posts = require('../models/postModel');
const users = require('../models/userModel');

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
        if (!req.body.title && !req.body.completed) {
            throw new Error('Title or completed is required!')
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
        }
        if (req.body.title) {
            todoData.title = req.body.title
        }
        if (req.body.completed) {
            todoData.completed = req.body.completed
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

const getTodos = (async (req, res) => {
    let response = {
        success: true
    }
    try {
        console.log('Getting all todos..');
        const getTodos = await todos.get('');
        if (!Object.keys(getTodos).length) {
            throw new Error('Todos does not exists!');
        }
        response.todos = getTodos.todos;
        console.log('Todos exists..');
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.success = false;
        response.error = error.message;
        res.status(400).send(response);
    }
});

const createPost = (async (req, res) => {
    let response = {
        success: true
    }
    try {
        console.log('Formdata -->', req.body);
        if (!req.body.text) {
            throw new Error('Text is required!')
        }
        console.log('Got required data..');
        const postData = {
            text: req.body.text,
            created_by: ''
        }
        console.log('Saving data to db..');
        const create_post = await posts.create(postData);
        console.log('Saved data to db..');
        response.post = create_post;
        console.log('Post created successfully..');
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.success = false;
        response.error = error.message;
        res.status(400).send(response);
    }
});

const getPosts = (async (req, res) => {
    let response = {
        success: true
    }
    try {
        console.log('Getting all posts..');
        const getPosts = await posts.get();
        if (!Object.keys(getPosts).length) {
            throw new Error('Posts does not exists!');
        }
        const postsArr = getPosts.posts;
        const allPosts = [];
        for (const post of postsArr) {
            const comments = await posts.getCommentsByPostId(post.id);
            post.comments = comments;
            allPosts.push(post);
        }
        response.posts = allPosts;
        console.log('Posts exists..');
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.success = false;
        response.error = error.message;
        res.status(400).send(response);
    }
});

const getPostById = (async (req, res) => {
    let response = {
        success: true
    }
    try {
        console.log('Getting post..');
        // console.log(req.params.id);
        const getPost = await posts.getById(req.params.id);
        if (!Object.keys(getPost).length) {
            throw new Error('Post does not exists!');
        }
        response.post = getPost
        console.log('Post exists..');
        console.log('Getting comments..');
        const comments = await posts.getCommentsByPostId(req.params.id);
        response.post.comments = comments;
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.success = false;
        response.error = error.message;
        res.status(400).send(response);
    }
});

const addComment = (async (req, res) => {
    let response = {
        success: true
    }
    try {
        console.log('Formdata -->', req.body);
        if (!req.body.text) {
            throw new Error('Text is required!')
        }
        console.log('Got required data..');
        const commentData = {
            text: req.body.text,
            post_id: req.params.id,
            created_by: ''
        }
        console.log('Saving data to db..');
        const add_comment = await posts.addComment(commentData);
        console.log('Saved data to db..');
        response.comment = add_comment;
        console.log('Comment added successfully..');
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.success = false;
        response.error = error.message;
        res.status(400).send(response);
    }
});

const getUsers = (async (req, res) => {
    let response = {
        success: true
    }
    try {
        console.log('Getting all users..');
        const getUsers = await users.getAllUsers();
        if (!Object.keys(getUsers).length) {
            throw new Error('Users does not exists!');
        }
        const usersArr = getUsers.users;
        const allUsers = [];
        for (let user of usersArr) {
            const todos_and_posts = await getAllUserDataById('');
            user = {...user, ...todos_and_posts}
            allUsers.push(user);
        }
        response.users = allUsers;
        console.log('Users exists..');
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.success = false;
        response.error = error.message;
        res.status(400).send(response);
    }
});

const getUserById = (async (req, res) => {
    let response = {
        success: true
    }
    try {
        console.log('Getting user..');
        const getUser = await users.getUserById(req.params.id);
        if (!Object.keys(getUser).length) {
            throw new Error('User does not exists!');
        }
        response.user = getUser
        console.log('User exists..');
        console.log('Getting user todos and posts..');
        const todos_and_posts = await getAllUserDataById('');
        response.user = {...response.user, ...todos_and_posts};
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.success = false;
        response.error = error.message;
        res.status(400).send(response);
    }
});

const getAllUserDataById = async (userId) => {
    try {
        let response = {}
        console.log('Getting todos..');
        const allTodos = await todos.getTodosByUserId(userId);
        response.todos = allTodos;
        console.log('Got todos..');
        console.log('Getting posts..');
        let allPosts = [];
        const postsArr = await posts.getPostsByUserId(userId);
        console.log('Getting post comments..');
        for (const post of postsArr) {
            const comments = await posts.getCommentsByPostId(post.id);
            post.comments = comments || [];
            allPosts.push(post);
        }
        console.log('Got post comments..');
        response.posts = allPosts;
        console.log('Got posts..');
        return response;
    } catch (error) {
        throw error;
    }

}

module.exports = {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodos,
    createPost,
    getPosts,
    getPostById,
    addComment,
    getUsers,
    getUserById,
    getAllUserDataById
}