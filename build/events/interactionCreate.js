module.exports = {
    name: 'interactionCreate',
    execute: function (interaction) {
        console.log(interaction.user.tag + " in #" + interaction.channel.name + " triggered an interaction.");
    },
};
