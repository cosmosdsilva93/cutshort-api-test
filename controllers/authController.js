const jwt = require('jsonwebtoken');
const users = require('../models/userModel');

const signUp = (async (req, res) => {
    let response = {
        success: true
    };
    try {
        console.log('Formdata -->', req.body);
        if (!req.body.email) {
            throw new Error('Email id is required!')
        }
        if (!req.body.password) {
            throw new Error('Password is required!')
        }
        console.log('Got required data..');
        console.log('Checking if user already exists..');
        const existingUser = await users.getUserByEmail(req.body.email);
        if (Object.keys(existingUser).length > 0) {
            throw new Error('Looks like your account already exists. Please login.')
        }
        console.log('Creating user in db..');
        const user = await users.create(req.body);
        console.log('Created user in db..');
        console.log('Generating jwt token..');
        const tokenData = user;
        const tokenExpiry = {
            expiresIn: 600 //10 mins
        }
        const token = await jwt.sign(tokenData, 'cosmos-dsilva-secret', tokenExpiry);
        console.log('Generated jwt token..');
        tokenData.id_token = token;
        response.userdata = tokenData;
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.success = false;
        response.error = error.message;
        res.status(400).send(response);
    }
})

const login = (async (req, res) => {
    let response = {
        success: true
    };
    try {
        console.log('Formdata -->', req.body);
        if (!req.body.email) {
            throw new Error('Email id is required!')
        }
        if (!req.body.password) {
            throw new Error('Password is required!')
        }
        console.log('Got required data..');
        console.log('Checking if user exists..');
        const userdata = await users.get(req.body);
        if (!Object.keys(userdata).length) {
            throw new Error('Incorrect email id or password!')
        }
        console.log('User authenticated successfully..');
        console.log('Generating jwt token..');
        const tokenData = userdata;
        const tokenExpiry = {
            expiresIn: 600 //10 mins
        }
        const token = await jwt.sign(tokenData, 'cosmos-dsilva-secret', tokenExpiry);
        console.log('Generated jwt token..');
        tokenData.id_token = token;
        response.userdata = tokenData;
        res.status(200).send(response)
    } catch (error) {
        console.log(error);
        response.success = false;
        response.error = error.message;
        res.status(400).send(response);   
    }
});

module.exports = {
    signUp,
    login
}