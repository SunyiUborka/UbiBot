import { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn user')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addUserOption(option => option.setName('user').setDescription('user'))
        .addStringOption(option => option
            .setName('input')
            .setDescription('Warn message')
            .setRequired(false)),
        async execute(interaction, client) {
            let a = interaction.options.getUser('user')
            let msg = interaction.options.getString('input')
        },
};