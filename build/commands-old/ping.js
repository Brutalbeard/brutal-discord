"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'ping',
    description: 'Check upness!',
    usage: "",
    execute: function (message, args) {
        message.channel
            .send("Pong!");
    },
};
