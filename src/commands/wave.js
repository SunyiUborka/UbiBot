import {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, Application, ApplicationEmoji,} from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('wave')
        .setDescription('Hello!')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
        async execute(interaction) {

            await interaction.reply({content: "<a:MikuWave:1376859452342407258>"});
        },
};