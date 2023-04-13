# Brutal-Discord

To add to your discord
channels, [click right here](https://discord.com/api/oauth2/authorize?client_id=168727946834608128&permissions=0&scope=applications.commands%20bot)
.

[![Codacy Security Scan](https://github.com/Brutalbeard/brutal-discord/actions/workflows/codacy.yml/badge.svg)](https://github.com/Brutalbeard/brutal-discord/actions/workflows/codacy.yml)
[![SonarCheck](https://github.com/Brutalbeard/brutal-discord/actions/workflows/sonar.yml/badge.svg)](https://github.com/Brutalbeard/brutal-discord/actions/workflows/sonar.yml)

## About

I was using [Lita](lita.io) for creating and managing my chat bots, however, since I was mostly
using [Discord](discordapp.com), I was somewhat limited. If I wanted to use a Discord specific feature, like an embed, I
was ruining my Lita plugin's abillity to stay agnostic and work for other Lita users.

So, to [discord.js](https://github.com/discordjs/discord.js) I went! Get the of JS, written
in [Typescript](typescriptlang.org), all hosted on [Heroku](heroku.com). Update: Heroku was bein a pain in my ass. Just
using my Raspberry Pi now.

I added on a [Mongo Database](mongodb.com) to keep track of events, polls, and user info. I tried out
using [Redis](redis.io) when using Lita, but it was a pain in the ass. I used [MongoDB](https://mongodb.com/) for my db.
It's free version is plenty of power for this app.

I'm always happy to have fellow devs check out the app, and make pull requests and all that. Fork, and send over a pull
request at your leisure.

## Installation

Application runs on the [Node JS](nodejs.org) framwork, so you'll need that installed. For an editor, I'm a big fan
of [VS Code](https://code.visualstudio.com), but any popular editor should do.

First, fork, then clone

```
$ git clone https://github.com/{Your Github Username)/brutal-discord.git
$ cd brutal-discord
```

Then install all dependencies using npm or yarn

```
npm install
```

This should install all the dependencies the app needs onto your computer.

You'll need to make copy of the ```env_example``` file, fill it in with all your information, and rename it
to ```.env```.

* [Giphy](https://developers.giphy.com)
* [Discord Bot](https://discordapp.com/developers/applications/)
* [APOD](https://api.nasa.gov/api.html#apod)
* Mongo is a different beast. I'm not gonna try to talk anyone through it here. Long story shortest, you need to create
  a mongodb that's hosted somewhere in the universe, and then put a bunch of login credentials. I used just the connect
  URI that was provided with the db, just to make life a little more simple.

Once you've got all that in place, you need to ensure that Typescript is compiling the ```src``` folder in the strictly
type Javascript, that's put into the ```build``` folder. Node will run everything from the build folder. You comile
using the command ```tsc```. There's also an option to "watch" for file changes and auto compile
again. ```tsc --watch```.

## Running the App

Once you've compiled and put in all your ```.env``` stuff, you can spin up the app by going to the app's root directory,
opening up terminal and running. As of the most recent verion of DiscordJS, you need to run with node version 16.
[NVM](https://github.com/nvm-sh/nvm) is great for bouncing back and forth between node versions.

```
$ node .
```

You'll get some happy text in the terminal letting you know it's up and running. I'm only logging errors in the console,
so you won't see much else.

## Writing New Commands

You'll edit everything in the ```/src``` folder. Don't edit the stuff in ```/build``` or you'll go insane.

```/src/index.ts``` runs the show. It's based off the guide supplied by discord.js. Works great, didn't feel like
messing with it. I *did* get a Typescript error when adding commands to the ::Client class. I had to just add an
`//@ts-ignore` to get rid of it.. It was just cause I'm crazy pendantic and didn't want to see the squiggly line. Runs
fine regardless.

To make a new command, you'll toss that into `/src/commands/`. Copy `ud.ts` and use that as a nice little template.
Replace the name and description and what not.

## Database Interactions

I'm using the [Mongodb Node Driver](http://mongodb.github.io/node-mongodb-native/) for all my db interactions.

I considered switching over to Mongoose, but I used Typescript definitions in the ```/src/definitions``` folder already,
so I didn't see the point in making the switch.

## Acknowledgements

* [discord.js](https://github.com/discordjs/discord.js)
* [Node JS](nodejs.org)
* [Typescript](typescriptlang.org)
* [Mongo Database](mongodb.com)
* [Giphy](https://developers.giphy.com)
* [Discord Bot](https://discordapp.com/developers/applications/)
* [APOD](https://api.nasa.gov/api.html#apod)
* [dotenv](https://github.com/motdotla/dotenv)
* [LucasLeandro1204](https://github.com/LucasLeandro1204/Pornsearch)
