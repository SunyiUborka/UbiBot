import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import Report from '../utils/Models/Report.js'

export default {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report user')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addSubcommand(s=> s
            .setName('user')
            .setDescription('User who do you want to report.')
            .addUserOption(option => option
                .setName('user')
                .setDescription('User who do you want to report.')
                .setRequired(true))
            .addStringOption(option => option
                .setName('message')
                .setDescription('Report message')
                .setRequired(true))
        )
        .addSubcommand(s=> s
            .setName('list')
            .setDescription('List reports')
        ),
        async execute(interaction) {
            const subcommand = interaction.options.getSubcommand()
            let user = interaction.options.getUser('user')
            const msg = interaction.options.getString('message')

            switch (subcommand) {
                case 'user':
                    Report.create({
                        reportAuthor: interaction.user.id,
                        reportServer: interaction.guildId,
                        reportedUser: user.id,
                        reportMessage: msg,
                        reportDate: Date.now()
                    })
                    interaction.reply({content: `<@${user.id}> has been reported.`, ephemeral: true })
                    break;
                case 'list':
                    console.log(await Report.find({ reportedUser: interaction.user.id}))
                    interaction.reply({ content: 'asd', flags: 'Ephemeral'})
            }
        },
};