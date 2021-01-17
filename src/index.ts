import * as dotenv from 'dotenv'
dotenv.config()

import * as Discord from 'discord.js'
import * as fs from 'fs'
import * as https from 'https'
import getOrSetUser from './lib/users'
import * as moment from 'moment'

const prefix = '!'

const client = new Discord.Client()
//@ts-ignore
client.commands = new Discord.Collection()

const cooldowns = new Discord.Collection()

const commandFiles = fs.readdirSync('./build/commands')

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	//@ts-ignore
	client.commands.set(command.name, command)
}

client.on('ready', () => {
	console.log('Ready Freddy!')
})

client.on('disconnect', () => {
	console.error("Disconnected from Discord, will try reconnecting")

	client.login(process.env['DISCORD_TOKEN'])
})

client.on('message', message => {
	getOrSetUser(message.author)

	if (process.env.DOWNLOAD_ATTACHMENTS == 'true') {
		if (message.attachments.size > 0) {
			message.attachments

			message.attachments.forEach((v, k) => {
				saveImageToDisk(v.url, `./images/${moment().unix()} - ${v.name}`)
			})
		}
	}



	if (!message.content.startsWith(prefix) || message.author.bot) return

	const args = message.content.slice(prefix.length).split(/ +/)
	const commandName = args.shift().toLowerCase()

	//@ts-ignore
	const command = client.commands.get(commandName)
		//@ts-ignore
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

	if (!command) return

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!')
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
		}

		return message.channel.send(reply)
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection())
	}

	const now = Date.now()
	const timestamps: any = cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || 1) * 1000

	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now)
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
	}
	else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
		}

		timestamps.set(message.author.id, now)
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
	}

	try {
		command.execute(message, args)
	}
	catch (error) {
		console.error(error)
		message.reply('there was an error trying to execute that command!')
	}
})

client.login(process.env['DISCORD_TOKEN'])

function saveImageToDisk(url, localPath) {
	var file = fs.createWriteStream(localPath);
	https.get(url, function (response) {
		response.pipe(file);
	});
}