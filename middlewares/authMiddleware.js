const jwt = require('jsonwebtoken');
const users = require('../models/userModel');

const isLoggedIn = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(403).send("Unauthorized!")
        }
        const tokenSplit = req.headers.authorization.split(' ');
        const decodeToken = await jwt.verify(tokenSplit[1], 'cosmos-dsilva-secret');
        req.user = await users.getUserById(decodeToken.uid);
        next();
    } catch (error) {
        console.log(error);
        res.status(403).send("Unauthorized!")
    }
}

module.exports = {
    isLoggedIn
}