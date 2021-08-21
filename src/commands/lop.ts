import {SlashCommandBuilder} from '@discordjs/builders';
import {getOrSetUser} from "../lib/users";
import db from "../lib/mongo-client";

const appendages = [
    "left leg",
    "right leg",
    "third leg",
    "left arm",
    "right arm",
    "nose",
    "left ear",
    "right ear",
    "left pinky toe",
    "right pinky toe",
    "left nipple",
    "right nipple",
    "bottom lip",
    "upper lip"
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lop')
        .setDescription('Boiler Plate Command')
        .addMentionableOption(mentioned =>
            mentioned
                .setDescription("The person whose feelings you want to hurt")
                .setRequired(true)
                .setName("target")
        ),

    async execute(interaction) {
        let target = interaction
            .options
            ._hoistedOptions
            .find(element => {
                return element.name === 'target'
            });

        let mentionedUser = await getOrSetUser(target.user);

        if (!mentionedUser.appendages) {
            mentionedUser.appendages = appendages;
        }

        if (mentionedUser.appendages.length === 0) {
            interaction
                .reply(`<@${mentionedUser.id}> doesn't have any appendages left! They're basically a doormat.`);
            return;
        }

        let index = Math.floor(Math.random() * mentionedUser.appendages.length);

        let appendage = mentionedUser.appendages[index];
        delete mentionedUser.appendages[index];
        let tempArr: string[] = [];

        for (let index in mentionedUser.appendages) {
            if (mentionedUser.appendages[index] !== undefined) {
                tempArr.push(mentionedUser.appendages[index]);
            }
        }

        // console.log("Temp Lop Arr: ", tempArr)
        mentionedUser.appendages = tempArr;

        await db
            .users
            .updateOne({id: mentionedUser.id}, {
                $set: {appendages: tempArr}
            })
            .catch((e: any) => {
                console.error(e);
            })

        interaction.reply(`<@${interaction.user.id}> just lopped off <@${mentionedUser.id}>'s ${appendage}!`);
    },
};