module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        console.log(`${interaction.user.tag} felhasznált egy parancsot #${interaction.channel.name}-ban/ben`);
        },
};