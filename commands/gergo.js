import { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('gergo')
        .setDescription('Gergő')
        .setDMPermission(false)
        .addSubcommand(s=>
            s.setName('miota')
                .setDescription('Ehe')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
        async execute(interaction) {
            if (interaction.options.getSubcommand() === 'miota'){
                interaction.reply(`# <@361904030735138828> már ${Math.floor(Math.abs((new Date() - new Date('2023.05.31')) / (1000 * 60 * 60 * 24)))} napja munkanélküli.`)
            }
        },
};