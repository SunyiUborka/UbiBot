import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import Report from '../utils/Models/Report.js'

export default {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report user')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addUserOption(option => option
            .setName('user')
            .setDescription('User who do you want to report.')
            .setRequired(true))
        .addStringOption(option => option
            .setName('message')
            .setDescription('Report message')
            .setRequired(true)),
        async execute(interaction) {
            let user = interaction.options.getUser('user')
            let msg = interaction.options.getString('message')

            Report.create({
                reportAuthor: interaction.user.id,
                reportServer: interaction.guildId,
                reportedUser: user.id,
                reportMessage: msg
            })

            interaction.reply({content: `<@${user.id}> has been reported.`, ephemeral: true })
        },
};