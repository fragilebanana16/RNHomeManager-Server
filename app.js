const express = require("express");
const app = express();
const server = require("http").createServer(app);
// const createTestServer = require('./routes/test');
// const { countReset } = require("console");

require('dotenv').config();
require('./startUp/routes')(app);
require('./startUp/db')();
require('./startUp/socket')(server, app);

// default response a file
app.get('/testChat', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

    
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/webSocket/test.html');
});