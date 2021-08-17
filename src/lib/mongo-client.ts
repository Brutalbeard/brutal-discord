import * as Bluebird from 'bluebird'
import { MongoClient, Collection } from 'mongodb'

Bluebird.promisifyAll(Collection.prototype)
Bluebird.promisifyAll(MongoClient)

const f = require('util').format

let collections: any = {
  users: null,
  polls: null
}

// Connection URL
const uri = process.env.MONGO_URI

// Database Name
const dbName = process.env.MONGO_DB

const client = new MongoClient(uri);

client
  .connect()
  .then(() => {
    console.log("Connected successfully to mongo server")

    let db = client.db(dbName)

    collections.users = db.collection('user')
    collections.polls = db.collection('polls')
    collections.events = db.collection('events')
  })
  .catch(e => {
    console.error(e)
  })

// // Use connect method to connect to the server
// MongoClient.connect(uri, function (err, client) {
//   if (err) { console.error("Issue connecting to mongodb: ", err) }
//   console.log("Connected successfully to mongo server")

//   let db = client.db(dbName)

//   collections.users = db.collection('user')
//   collections.polls = db.collection('polls')
//   collections.events = db.collection('events')
// })

export default collections