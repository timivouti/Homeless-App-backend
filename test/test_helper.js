const mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://timi:q6ntgeihw6qpB4ME@homelessapp-shard-00-00-izfbz.mongodb.net:27017,homelessapp-shard-00-01-izfbz.mongodb.net:27017,homelessapp-shard-00-02-izfbz.mongodb.net:27017/homelessapp_test?ssl=true&replicaSet=HomelessApp-shard-0&authSource=admin');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', err);
    });
});

beforeEach((done) => {
  const { users } = mongoose.connection.collections;
  users.drop()
    .then(() => done())
    .catch(() => done());
});
