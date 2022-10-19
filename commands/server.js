const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Get the server image.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
        async execute(interaction) {
            const server = interaction.guild;
            const serverImage = server.iconURL({ size: 1024, format: 'png', dynamic: 'true' });

            if(serverImage === null) return await interaction.reply("The server does not yet have an image.")

            const embed = new EmbedBuilder()
                .setTitle(`The ${server.name}'s image.`)
                .setImage(serverImage)
                .setColor('Random');

            await interaction.reply({embeds: [embed]});
        },
};