"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var MongoClient = require("mongodb");
var collections = {
    users: null,
    polls: null
};
var url = 'mongodb://' + process.env['MONGO_USER'] + ":" + process.env['MONGO_PASSWORD'] + "@" + process.env['MONGO_ADDRESS'] + "/" + process.env['MONGO_DB'];
var dbName = 'myproject';
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var db = client.db(dbName);
    collections.users = db.collection('user');
    collections.polls = db.collection('polls');
});
exports.default = collections;
