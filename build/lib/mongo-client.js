"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var collections = {
    users: null,
    polls: null
};
var uri = process.env.MONGO_URI;
var dbName = process.env.MONGO_DB;
var client = new mongodb_1.MongoClient(uri);
client
    .connect()
    .then(function () {
    console.log("Connected successfully to mongo server");
    var db = client.db(dbName);
    collections.users = db.collection('user');
    collections.polls = db.collection('polls');
})
    .catch(function (e) {
    console.error(e);
});
exports.default = collections;
