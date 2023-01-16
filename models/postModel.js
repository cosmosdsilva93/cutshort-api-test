const firestore = require('../helpers/firestoreHelper');
const moment = require('moment');
const {uid} = require('uid');

const db = firestore.dbConnect();
const posts = db.collection('posts');
const comments = db.collection('comments');


const create = async (data) => {
    try {
        const postId = uid(10);
        data.created_on = moment().format('YYYY-MM-DD HH:mm:ss')
        data.status = 0
        await posts.doc(postId).set(data, {merge: true});
        data = await getById(postId);
        return data;
    } catch (error) {
        throw error;
    }
}

// const update = async (data) => {
//     try {
//         const todoId = data.id;
//         delete data.id;
//         data.updated_on = moment().format('YYYY-MM-DD HH:mm:ss');
//         await todos.doc(todoId).update(data);
//         data = await getById(todoId);
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }

// const deelete = async (data) => {
//     try {
//         const todoId = data.id;
//         delete data.id;
//         data.updated_on = moment().format('YYYY-MM-DD HH:mm:ss');
//         data.status = 1;
//         await todos.doc(todoId).update(data);
//         data.id = todoId;
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }

const get = async() => {
    try {
        let response = {};
        let allPosts = [];
        const getPosts = await posts.where('status', '==', 0).get();
        getPosts.forEach((doc) => {
            const post = doc.data();
            post.id = doc.id;
            allPosts.push(post)
        });
        if (allPosts.length > 0) {
            response.posts = allPosts;
        }
        return response;
    } catch (error) {
        throw error; 
    }
}

const getById = async (id) => {
    try {
        let response = {};
        let getPost = await posts.doc(id).get();
        if (getPost.exists) {
            const postData = getPost.data();
            if (!postData.status) {
                response = postData;
                response.id = id;
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}

const addComment = async (data) => {
    try {
        const commentId = uid(10);
        data.created_on = moment().format('YYYY-MM-DD HH:mm:ss')
        data.status = 0
        await comments.doc(commentId).set(data, {merge: true});
        data = await getCommentById(commentId);
        return data;
    } catch (error) {
        throw error;
    }
}

const getCommentById = async (id) => {
    try {
        let response = {};
        let getComment = await comments.doc(id).get();
        if (getComment.exists) {
            const commentData = getComment.data();
            if (!commentData.status) {
                response = commentData;
                response.id = id;
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}

const getCommentsByPostId = async (postId) => {
    try {
        let response = [];
        const getComments = await comments.where('post_id', '==', postId).where('status', '==', 0).get();
        getComments.forEach((doc) => {
            const comment = doc.data();
            comment.id = doc.id;
            response.push(comment)
        });
        return response;
    } catch (error) {
        throw error; 
    }
}

const getPostsByUserId = async (userId) => {
    try {
        let response = [];
        const getPosts = await posts.where('created_by', '==', userId).where('status', '==', 0).get();
        getPosts.forEach((doc) => {
            const post = doc.data();
            post.id = doc.id;
            response.push(post)
        });
        return response;
    } catch (error) {
        throw error; 
    }
}


module.exports = {
    get,
    create,
    // update,
    // deelete,
    getById,
    addComment,
    getCommentById,
    getCommentsByPostId,
    getPostsByUserId
}