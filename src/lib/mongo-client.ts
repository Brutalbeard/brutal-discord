import * as assert from 'assert';
import * as MongoClient from 'mongodb';

const f = require('util').format;

let collections: any = {
  users: null,
  polls: null
}

const user = encodeURIComponent(process.env['MONGO_USER']);
const password = encodeURIComponent(process.env['MONGO_PASSWORD']);
const db = encodeURIComponent(process.env['MONGO_DB']);
const address = encodeURIComponent(process.env['MONGO_ADDRESS']);
const port = encodeURIComponent(process.env['MONGO_PORT']);


// Connection URL
const url = f('mongodb://%s:%s@%s:%s/%s', user, password, address, port, db);

console.log(url)
// Database Name
const dbName = db;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  let db = client.db(dbName);

  collections.users = db.collection('user')
  collections.polls = db.collection('polls')
});

export default collections