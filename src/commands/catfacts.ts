import {SlashCommandBuilder} from '@discordjs/builders';
import axios from "axios";

const catEmojiArray = [
    ':cat:',
    ':crying_cat_face:',
    ':heart_eyes_cat:',
    ':joy_cat:',
    ':kissing_cat:',
    ':pouting_cat:',
    ':scream_cat:',
    ':smile_cat:',
    ':smiley_cat:',
    ':smirk_cat:'
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catfact')
        .setDescription('An interesting fact about kitty cats'),

    async execute(interaction) {
        const res: string = await axios
            .get('https://catfact.ninja/fact')
            .then(res => {
                return res.data.fact;
            })
            .catch(e => {
                console.error(e);
            });

        let replyMessage = res + " " + catEmojiArray[Math.floor(Math.random() * catEmojiArray.length)];

        await interaction
            .reply({
                content: replyMessage
            });
    },
};