import { Message } from "discord.js";
import UserInfo from "../definitions/user-info"
import Poll from "../definitions/poll"
import db from "../lib/mongo-client"
import { parse } from "querystring";
import VotingOption from "../definitions/voting-option";

module.exports = {
    name: 'poll',
    description: 'Create a shiny new poll for people to vote on!',
    usage: "Is Ian a baller? - yes no",
    args: true,
    async execute(message: Message, args: any) {
        
        let pollAuthor: UserInfo = {
            id: message.author.id,
            username: message.author.username,
            bot: message.author.bot,
            avatar: message.author.avatar,
            avatarURL: message.author.avatarURL
        }

        let poll_id = await getLastPollId(message)
        let question = splitQuestion(args)
        let options: VotingOption[] = splitVotingOptions(args)

        let poll: Poll ={
            poll_id: poll_id,
            poll_author: pollAuthor,
            room: message.channel.id,
            question: question,
            voting_options: options,
            created_at: new Date(),
            updated_at: new Date(),
            deleted: false
        }

        await db.polls.insertOne(
            poll
        ).catch(e =>{
            message.channel.send("There was an issue storing your poll! Whomp whomp :-/").catch(err =>{
                console.error(err)
            })
            console.error(e)
        })
    },
};

async function getLastPollId(message: Message){
    let poll_id: String

    let today = new Date();
    let yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)


    let docs = await db.polls.find({
        room: message.channel.id,
        created_at: {
            $gte: (yesterday)
        },
        deleted: false
    }).toArray()

    if(docs.length == 0){   
        poll_id = '1'
    }else {
        let temp = docs[docs.length - 1].poll_id
        poll_id = (parseInt(temp) + 1).toString()
    }

    return poll_id
}

function splitQuestion(args){

    let pieces = args.slice(0, args.indexOf('-'))

    let question = pieces.join(' ')

    return question
    
}

function splitVotingOptions(args){
    let options = args.slice(args.indexOf('-') + 1)

    let arr: VotingOption[] = []

    options.forEach(element => {
        arr.push({
            option: element, 
            voters: []
        })
    });

    return arr
}