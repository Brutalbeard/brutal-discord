import * as assert from 'assert'
import * as Bluebird from 'bluebird'
import * as mongodb from 'mongodb'

var MongoClient = mongodb.MongoClient
var Collection = mongodb.Collection

Bluebird.promisifyAll(Collection.prototype)
Bluebird.promisifyAll(MongoClient)

const f = require('util').format

let collections: any = {
  users: null,
  polls: null
}

// Connection URL
const url = process.env.MONGO_URI

// Database Name
const dbName = process.env.MONGO_DB

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err)
  console.log("Connected successfully to mongo server")

  let db = client.db(dbName)

  collections.users = db.collection('user')
  collections.polls = db.collection('polls')
  collections.events = db.collection('events')
})

export default collections