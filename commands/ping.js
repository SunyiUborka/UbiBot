import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
        async execute(interaction) {
            await interaction.reply('Pong!');
        },
};