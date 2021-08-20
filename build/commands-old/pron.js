"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'porn',
    description: "I'm ashamed of myself",
    usage: "{one word search term}",
    args: true,
    execute: function (message, args) {
        var Pornsearch = require('pornsearch')
            .search(args[0]);
        Pornsearch
            .gifs()
            .then(function (res) {
            message.author
                .send(res[Math.floor(Math.random() * res.length)].webm);
        })
            .catch(function (e) {
            console.error(e);
        });
    },
};
