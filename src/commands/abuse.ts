import { SlashCommandBuilder } from '@discordjs/builders';

const first: String[] = [
    'LAZY',
    'STUPID',
    'INSECURE',
    'IDIOTIC',
    'SLIMY',
    'SLUTTY',
    'SMELLY',
    'POMPOUS',
    'COMMUNIST',
    'DICKNOSE',
    'SHIT-EATING',
    'RACIST',
    'ELITIST',
    'WHITE TRASH',
    'DRUG-LOVING',
    'BUTTERFACE',
    'TONE DEAF',
    'UGLY',
    'CREEPY',
    'SKANKY',
    'CUM-GUZZLING'
]

const second: String[] = [
    'DOUCHE',
    'ASS',
    'TURD',
    'RECTUM',
    'BUTT',
    'COCK',
    'SHIT',
    'CROTCH',
    'BITCH',
    'TURD',
    'PRICK',
    'SLUT',
    'TAINT',
    'FUCK',
    'DICK',
    'BONER',
    'SHART',
    'NUT',
    'SPHINCTER',
    'NIPPLE'
]

const third: String[] = [
    'PILOT',
    'CANOE',
    'CAPTAIN',
    'PIRATE',
    'HAMMER',
    'KNOB',
    'BOX',
    'JOCKEY',
    'NAZI',
    'WAFFLE',
    'GOBLIN',
    'BLOSSUM',
    'BISCUIT',
    'CLOWN',
    'SOCKET',
    'MONSTER',
    'HOUND',
    'DRAGON',
    'BALLOON',
    'HOLE',
    'SUCKER'
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('abuse')
        .setDescription('Calls someone a mean thing...')
        .addMentionableOption(mentioned =>
            mentioned
                .setDescription("The person whose feelings you want to hurt")
                .setRequired(true)
                .setName("abusee")
        ),

    async execute(interaction) {
        let abusee = interaction
            .options
            ._hoistedOptions
            .find(element => {
                return element.name === 'abusee';
            });

        await interaction
            .reply({
                content: `<@${abusee.user.id}>` +
                    " you're a " +
                    first[Math.floor(Math.random() * first.length)]
                    + " " +
                    second[Math.floor(Math.random() * second.length)]
                    + " " +
                    third[Math.floor(Math.random() * third.length)]
            });
    },
};