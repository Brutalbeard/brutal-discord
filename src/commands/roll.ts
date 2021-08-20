import {SlashCommandBuilder} from '@discordjs/builders';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll some dice')
        .addStringOption(string => {
            string
                .setName("xdy")
                .setDescription("Like, 1d20, or 4d10...")
                .setRequired(false);

            return string;
        }),

    async execute(interaction) {
        let xdy = interaction
            .options
            ._hoistedOptions
            .find(element => {
                return element.name === 'xdy'
            });

        let userDice, userSides;

        if (xdy) {
            let values = xdy.value.split('d');

            userDice = values[0];
            userSides = values[1];
        }

        let numberOfDice = userDice ? userDice : 1;
        let numberOfSides = userSides ? userSides : 20;

        let rolls = [];
        let total = 0;

        for (let i = 0; i < numberOfDice; i++) {
            let die = Math.floor(Math.random() * numberOfSides) + 1;
            rolls.push(die);
            total += die;
        }

        interaction.reply(`${numberOfDice}d${numberOfSides}: ` + rolls.join(', ') + "\nTotal: " + total);
    },
};