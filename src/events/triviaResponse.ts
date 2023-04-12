import db from "../lib/mongo-client";

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.message.interaction.commandName !== "trivia") return;

        let selectedButton = interaction.customId;

        let myId = interaction.customId.slice(0, -2);

        let finalTrivia = await db
            .trivia
            .findOne({
                id: myId
            }).then(res => {
                return res;
            }).catch(e => {
                console.error(e);
            });

        if (!finalTrivia) {
            interaction
                .reply("Some weird shit happened. No worky");

            return;
        }

        if (finalTrivia.smartUsers.includes(interaction.user.username) || finalTrivia.dumbUsers.includes(interaction.user.username)) {
            interaction
                .reply({ content: "Can only vote once", ephemeral: true });

            return;
        }

        let tempComponents = finalTrivia.row.components;

        for (let i in tempComponents) {
            if (tempComponents[i].custom_id == selectedButton) {
                tempComponents[i].timesChosen = tempComponents[i].timesChosen + 1;

                if (tempComponents[i].correctAnswer === true) {
                    finalTrivia
                        .smartUsers
                        .push(interaction.user.username);
                } else {
                    finalTrivia
                        .dumbUsers
                        .push(interaction.user.username);
                }
            }
        }

        finalTrivia.row.components = tempComponents;

        await db
            .trivia
            .replaceOne({ id: myId }, finalTrivia)
            .catch(e => {
                console.error(e);
            });

        interaction
            .reply({ content: "Noted", ephemeral: true });
    },
};