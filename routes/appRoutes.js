const express = require('express');
const appController = require('../controllers/appController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/sign-up', authController.signUp);
router.post('/login', authController.login);

router.get('/users', authMiddleware.isLoggedIn, appController.getUsers);
router.get('/users/:id', authMiddleware.isLoggedIn, appController.getUserById);

router.get('/todos', authMiddleware.isLoggedIn, appController.getTodos);
router.post('/todos', authMiddleware.isLoggedIn, appController.createTodo);
router.patch('/todos/:id', authMiddleware.isLoggedIn, appController.updateTodo);
router.delete('/todos/:id', authMiddleware.isLoggedIn, appController.deleteTodo);

router.post('/posts', authMiddleware.isLoggedIn, appController.createPost);
router.get('/posts', authMiddleware.isLoggedIn, appController.getPosts);
router.get('/posts/:id', authMiddleware.isLoggedIn, appController.getPostById);

router.post('/posts/:id/comment', authMiddleware.isLoggedIn, appController.addComment);

module.exports = router;