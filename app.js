const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://timi:q6ntgeihw6qpB4ME@homelessapp-shard-00-00-izfbz.mongodb.net:27017,homelessapp-shard-00-01-izfbz.mongodb.net:27017,homelessapp-shard-00-02-izfbz.mongodb.net:27017/homelessapp?ssl=true&replicaSet=HomelessApp-shard-0&authSource=admin');
}

app.use(bodyParser.json());
app.use(cors());
routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
