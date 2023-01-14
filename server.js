const express = require('express');
// const cookieParser = require('cookie-parser');
const cors = require('cors');

//custom modules
const appRouter = require('./routes/appRoutes');

const PORT = process.env.PORT || 3000;

const app = express();
app.set('trust proxy', 1);

//Add middlewares
app.use(cors());
//for parsing POST request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//calling session middleware
// app.use(cookieParser('test123'));

// register routes: Start
app.use(appRouter);

// Start the server: Start 
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
  	console.log('Press Ctrl+C to quit.');
});
//Start the server: End 

module.exports = app;


