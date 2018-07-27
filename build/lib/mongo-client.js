"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var Bluebird = require("bluebird");
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var Collection = mongodb.Collection;
Bluebird.promisifyAll(Collection.prototype);
Bluebird.promisifyAll(MongoClient);
var f = require('util').format;
var collections = {
    users: null,
    polls: null
};
var user = encodeURIComponent(process.env['MONGO_USER']);
var password = encodeURIComponent(process.env['MONGO_PASSWORD']);
var db = encodeURIComponent(process.env['MONGO_DB']);
var address = encodeURIComponent(process.env['MONGO_ADDRESS']);
var port = encodeURIComponent(process.env['MONGO_PORT']);
var url = f('mongodb://%s:%s@%s:%s/%s', user, password, address, port, db);
console.log(url);
var dbName = db;
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var db = client.db(dbName);
    collections.users = db.collection('user');
    collections.polls = db.collection('polls');
    collections.events = db.collection('events');
});
exports.default = collections;
