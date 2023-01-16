const express = require('express');
const appController = require('../controllers/appController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/sign-up', authController.signUp);
router.post('/login', authController.login);

router.get('/users', appController.getUsers);
router.get('/users/:id', appController.getUserById);

router.get('/todos', appController.getTodos);
router.post('/todos', appController.createTodo);
router.patch('/todos/:id', appController.updateTodo);
router.delete('/todos/:id', appController.deleteTodo);

router.get('/posts', appController.getPosts);
router.get('/posts/:id', appController.getPostById);
router.post('/posts', appController.createPost);
// router.patch('/post/:id', appController.updatePost);

router.post('/posts/:id/comment', appController.addComment);

// router.get('/post/:id', appController.getPostById);
// router.post('/post', appController.createPost);

module.exports = router;