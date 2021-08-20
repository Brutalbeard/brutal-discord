"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var Discord = require("discord.js");
var fs = require("fs");
var https = require("https");
var users_1 = require("./lib/users");
var moment = require("moment");
dotenv.config();
var prefix = '!';
var client = new Discord.Client();
client.commands = new Discord.Collection();
var cooldowns = new Discord.Collection();
var commandFiles = fs.readdirSync('./build/commands-old');
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    var command = require("./commands-old/" + file);
    client.commands.set(command.name, command);
}
client.on('ready', function () {
    console.log('Ready Freddy!');
});
client.on('disconnect', function () {
    console.error("Disconnected from Discord, will try reconnecting");
    client.login(process.env['DISCORD_TOKEN']);
});
client.on('message', function (message) {
    users_1.default(message.author);
    if (process.env.DOWNLOAD_ATTACHMENTS == 'true') {
        if (message.attachments.size > 0) {
            message.attachments;
            message.attachments.forEach(function (v, k) {
                saveImageToDisk(v.url, "./images/" + moment().unix() + " - " + v.name);
            });
        }
    }
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;
    var args = message.content.slice(prefix.length).split(/ +/);
    var commandName = args.shift().toLowerCase();
    var command = client.commands.get(commandName)
        || client.commands.find(function (cmd) { return cmd.aliases && cmd.aliases.includes(commandName); });
    if (!command)
        return;
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }
    if (command.args && !args.length) {
        var reply = "You didn't provide any arguments, " + message.author + "!";
        if (command.usage) {
            reply += "\nThe proper usage would be: `" + prefix + command.name + " " + command.usage + "`";
        }
        return message.channel.send(reply);
    }
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    var now = Date.now();
    var timestamps = cooldowns.get(command.name);
    var cooldownAmount = (command.cooldown || 1) * 1000;
    if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(function () { return timestamps.delete(message.author.id); }, cooldownAmount);
    }
    else {
        var expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            var timeLeft = (expirationTime - now) / 1000;
            return message.reply("please wait " + timeLeft.toFixed(1) + " more second(s) before reusing the `" + command.name + "` command.");
        }
        timestamps.set(message.author.id, now);
        setTimeout(function () { return timestamps.delete(message.author.id); }, cooldownAmount);
    }
    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});
client.login(process.env['DISCORD_TOKEN']);
function saveImageToDisk(url, localPath) {
    var file = fs.createWriteStream(localPath);
    https.get(url, function (response) {
        response.pipe(file);
    });
}
