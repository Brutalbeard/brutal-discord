import {MongoClient} from 'mongodb';

let collections: any = {
    users: null,
    polls: null
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
        collections.polls = db.collection('polls');
    })
    .catch(e => {
        console.error(e);
    });

export default collections;