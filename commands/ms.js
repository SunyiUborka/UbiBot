const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ms')
        .setDescription('Bot respond time.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
        async execute(interaction) {
            const embed = new EmbedBuilder()
                .setDescription(`${Date.now() - interaction.createdTimestamp}ms`);

            await interaction.reply({embeds: [embed]});
        },
};