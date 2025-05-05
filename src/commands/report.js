import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js'
import Report from '../utils/Models/Report.js'
import { DateTime } from "luxon";

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
            .addUserOption(option => option
                .setName('user')
                .setDescription('List of specific user reports.')
                .setRequired(false)
            )
            /*.addStringOption(option => option
                .setName('server')
                .setDescription('List user report on this server.')
                .addChoices(
                    { name: 'true', value: 'true' },
                    { name: 'false', value: 'false' }
                )
            )*/
        ),
        async execute(interaction) {
            const subcommand = interaction.options.getSubcommand()
            const user = interaction.options.getUser('user') || interaction.user
            const msg = interaction.options.getString('message')
            //const server = interaction.option.getString('server') || false

            switch (subcommand) {
                case 'user':
                    Report.create({
                        reportAuthor: interaction.user.id,
                        reportServer: interaction.guildId,
                        reportedUser: user.id,
                        reportMessage: msg,
                        reportDate: Date.now()
                    })
                    interaction.reply({content: `<@${user.id}> has been reported.`, flags: "Ephemeral"})
                    break;
                case 'list':
                    const reports = await Report.find({reportedUser: user.id})
                    const embed = new EmbedBuilder()
                        .setTitle(`${interaction.user.globalName }'s reports.`)
                        .addFields(reports.map(r => ({
                            name: new DateTime(r.reportDate).setZone('Europe/Budapest').toFormat("yyyy.MM.dd"),
                            value: r.reportMessage
                        })))
                    interaction.reply({ embeds: [embed]})
                    break;
            }
        },
};