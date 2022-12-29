import { MongoClient } from 'mongodb';

let collections: any = {
    users: null,
    polls: null,
    trivia: null
};

// Connection URL
const uri = process.env.MONGO_URI;

// Database Name
const dbName = process.env.MONGO_DB;

const client = new MongoClient(uri);

client
    .connect()
    .then(() => {
        console.log("Connected successfully to mongo server");

        let db = client.db(dbName);

        collections.users = db.collection('user');
        collections.polls = db.collection('poll');
        collections.trivia = db.collection('trivia');
    })
    .catch(e => {
        console.error(e);
    });

export default collections;