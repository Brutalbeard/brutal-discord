import db from "../lib/mongo-client";

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.message.interaction.commandName !== "poll") return;

        let selectedButton = interaction.customId;

        let myId = interaction.customId.slice(0, -2);

        let finalPoll = await db
            .polls
            .findOne({
                id: myId
            }).then(res => {
                return res;
            }).catch(e => {
                console.error(e);
            });

        if (!finalPoll) {
            interaction
                .reply("Some weird shit happened. No worky");

            return;
        }

        if (finalPoll.usersThatAnsweredAlready.includes(interaction.user.username)) {
            interaction
                .reply({ content: "Can only vote once", ephemeral: true });

            return;
        }

        let tempComponents = finalPoll.row.components;

        for (let i in tempComponents) {
            if (tempComponents[i].custom_id == selectedButton) {
                tempComponents[i].timesChosen = tempComponents[i].timesChosen + 1;
            }
        }

        finalPoll.usersThatAnsweredAlready.push(interaction.user.username);

        finalPoll.row.components = tempComponents;

        await db
            .polls
            .replaceOne({ id: myId }, finalPoll)
            .catch(e => {
                console.error(e);
            });

        interaction
            .reply({ content: "Voted", ephemeral: true });
    },
};