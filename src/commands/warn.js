import { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import Warn from '../utils/Models/Warn.js'

export default {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn user')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addUserOption(option => option.setName('user').setDescription('User who do you want to warn.'))
        .addStringOption(option => option
            .setName('message')
            .setDescription('Warn message')
            .setRequired(true)),
        async execute(interaction, client) {
            let user = interaction.options.getUser('user')
            let msg = interaction.options.getString('input')

            Warn.create({
                author: interaction.user.id,
                user: user.id,
                msg: msg
            })
        },
};