const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const canva = require('canvacord');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cmm')
    .setDescription('Change my mind')
    .addStringOption(option => option
        .setName('input')
        .setDescription('Valami frappáns szöveg')
        .setRequired(true))
    .setDMPermission(true)
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction) {
        const string = interaction.options.getString('input');
        const image = await canva.Canvas.changemymind(string);
        const file = await new AttachmentBuilder(image)

        const embed = new EmbedBuilder()
            .setTitle(`Change My Mind`)
            .setImage('attachment://file.jpg')
            .setColor('Random');

        await interaction.reply({embeds: [embed], files: [file]});
    },
};