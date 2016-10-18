import Hapi from 'hapi';
import bloodCenters from '../data/bloodcenters.json';
import { MongoClient } from 'mongodb';

const url = 'mongodb://admin:admin@ds021999.mlab.com:21999/heroku_vtrpfspm';
let mongo = {};

const server = new Hapi.Server();
server.connection({
  port: process.env.PORT || 4000,
});

server.route({
  method: 'GET',
  path: '/',
  handler(request, reply) {
    return reply('Blood API');
  },
});

server.route({
  method: 'GET',
  path: '/bloodcenters/export',
  handler(request, reply) {
    const collection = mongo.collection('bloodcenters');

    collection.insertMany(bloodCenters, (err, result) => (
      reply(`${result.ops.length} Bloodcenters exported`)
    ));
  },
});

server.route({
  method: 'GET',
  path: '/bloodcenters',
  handler(request, reply) {
    const collection = mongo.collection('bloodcenters');

    collection.find({}).toArray((err, docs) => (
      reply(docs)
    ));
  },
});

server.start(err => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);

  MongoClient.connect(url, (err2, db) => {
    console.log('Connected to mongo db');
    mongo = db;
    // db.close();
  });
});
