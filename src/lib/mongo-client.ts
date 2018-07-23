import * as assert from 'assert';
import * as MongoClient from 'mongodb';

let collections = {
  users: null
}

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  let db = client.db(dbName);

  collections.users = db.collection('user')
});

export default collections