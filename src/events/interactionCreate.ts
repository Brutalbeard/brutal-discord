import {getOrSetUser} from "../lib/users";

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        getOrSetUser(interaction.user)
            .catch(e => {
                console.error(e);
            });
    },
};