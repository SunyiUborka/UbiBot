const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { getVoiceConnection } = require("@discordjs/voice")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave from voice!')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction) {
        const  conn = getVoiceConnection(interaction.guild.id)
        conn.destroy()
        interaction.reply({content: 'UwU', ephemeral: true})
        
    },
};
