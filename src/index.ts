import * as fs from 'fs';
import {Client, Collection, Intents} from 'discord.js';
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';

require('dotenv').config();

// Place your client and guild ids here
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
});

//@ts-ignore
client.commands = new Collection();
const commands = [];

const commandFiles = fs
    .readdirSync(__dirname + '/commands')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(__dirname + `/commands/${file}`);

    commands
        .push(command.data.toJSON());

    client
        //@ts-ignore
        .commands
        .set(command.data.name, command);
}

const eventFiles = fs
    .readdirSync(__dirname + '/events')
    .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(__dirname + `/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client
        // @ts-ignore
        .commands
        .get(interaction.commandName);

    if (!command) return;

    await command
        .execute(interaction)
        .catch(async e => {
            console.error(e);

            await interaction
                .reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
        });
});

client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;
    console.log(interaction);
});

client.on('messageCreate', message => {
    // console.log(message);
});

client
    .login(process.env.DISCORD_TOKEN)
    .catch(e => {
        console.error(e);
    });

const rest = new REST({version: '9'})
    .setToken(process.env.DISCORD_TOKEN);

(async () => {
    console.log('Started refreshing application (/) commands.');

    await rest
        .put(
            Routes.applicationGuildCommands(clientId, guildId),
            {body: commands},
        )
        .then(() => {
            console.log('Successfully reloaded application (/) commands.');
        })
        .catch(e => {
            console.error("Issue setting slash commands: ", e);
        });

    await rest
        .put(
            Routes.applicationCommands(clientId),
            {body: commands},
        )
        .then(() => {
            console.log('Successfully reloaded global (/) commands.');
        })
        .catch(e => {
            console.error("Issue setting slash commands: ", e);
        });

})();