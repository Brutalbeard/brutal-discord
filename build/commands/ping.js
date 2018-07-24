"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'ping',
    description: 'Ping!',
    usage: "Ping : Pong",
    execute: function (message, args) {
        message.channel.send('Pong!');
    },
};
