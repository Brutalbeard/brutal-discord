"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'args-info',
    description: 'Information about the arguments provided.',
    usage: "arg1 arg2...",
    args: true,
    execute: function (message, args) {
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        message.channel.send("Arguments: " + args + "\nArguments length: " + args.length);
    },
};
