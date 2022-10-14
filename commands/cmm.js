const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const canva = require('canvacord');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cmm')
    .setDescription('Change my mind.')
    .addStringOption(option => option
        .setName('input')
        .setDescription('Something snappy string')
        .setRequired(true))
    .setDMPermission(true)
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction) {
        const inputString = interaction.options.getString('input');
        const baseImage = await canva.Canvas.changemymind(inputString);
        const attachment = await new AttachmentBuilder(baseImage, {name: "change-my-mind.jpg"})

        const embed = new EmbedBuilder()
            .setTitle(`Change my mind`)
            .setImage('attachment://change-my-mind.jpg')
            .setColor('Random');

        await interaction.reply({embeds: [embed], files: [attachment]});
    },
};