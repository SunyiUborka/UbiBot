const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Say Bot!')
        .setDMPermission(false)
        .addStringOption(o=> o
            .setName('text')
            .setDescription('Text that Bot writes')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction) {
        const text = interaction.options.getString('text')
        
        interaction.reply({content: `https://cdn.discordapp.com/emojis/1105516399318806538.webp?size=64&quality=lossless`, ephemeral: true})
        await interaction.channel.send(`${text}`)
    },
};