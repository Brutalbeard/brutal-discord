"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("../lib/users");
module.exports = {
    name: 'interactionCreate',
    execute: function (interaction) {
        console.log(interaction.user.tag + " in #" + interaction.channel.name + " triggered an interaction.");
        users_1.getOrSetUser(interaction.user)
            .catch(function (e) {
            console.error(e);
        });
    },
};
