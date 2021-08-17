"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
var mongodb_1 = require("mongodb");
Bluebird.promisifyAll(mongodb_1.Collection.prototype);
Bluebird.promisifyAll(mongodb_1.MongoClient);
var f = require('util').format;
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
    collections.events = db.collection('events');
})
    .catch(function (e) {
    console.error(e);
});
exports.default = collections;
