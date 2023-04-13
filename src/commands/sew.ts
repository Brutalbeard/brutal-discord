import { SlashCommandBuilder } from '@discordjs/builders';
import { getOrSetUser } from "../lib/users";
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
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sew')
        .setDescription('Boiler Plate Command')
        .addMentionableOption(mentioned =>
            mentioned
                .setDescription("The person whose feelings you want to hurt")
                .setRequired(true)
                .setName("patient")
        ),

    async execute(interaction) {
        let patient = interaction
            .options
            ._hoistedOptions
            .find(element => {
                return element.name === 'patient';
            });

        let mentionedUser = await getOrSetUser(patient.user);

        if (mentionedUser.id === interaction.user.id) {
            interaction.reply("Can't put your own appendages back on.");
            return;
        };

        if (!mentionedUser.appendages) {
            mentionedUser.appendages = appendages;
        };

        let tempArr: string[] = []
        for (let index in appendages) {
            if (mentionedUser.appendages.includes(appendages[index])) {
                continue;
            } else {
                tempArr.push(appendages[index]);
            }
        };

        if (tempArr.length == 0) {
            interaction
                .reply(`<@${patient.user.id}> didn't need anything sewed back on!`);
            return;
        }

        let index = Math.floor(Math.random() * tempArr.length);

        let appendage = tempArr[index];

        mentionedUser.appendages.push(appendage);

        await db.users
            .updateOne({ id: mentionedUser.id }, {
                $set: { appendages: mentionedUser.appendages }
            })
            .then(() => {
                interaction
                    .reply(`<@${interaction.user.id}> just sewed <@${patient.user.id}>'s ${appendage} back on. Old Frankenstein ass.`);
            })
            .catch(e => {
                console.error(e);
            });
    },
};