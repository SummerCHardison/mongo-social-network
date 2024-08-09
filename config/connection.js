// this file sets up our connection to our mongo database and allows us to view it through compass

const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/networkDB';

connect(connectionString);

module.exports = connection;
