const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get your or other avatar!')
        .setDMPermission(false)
        .addUserOption(option => option.setName('user').setDescription('user'))
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
        async execute(interaction) {
            const userName = interaction.options.getUser('user') || interaction.user;
            const userAvatar = userName.displayAvatarURL({ size: 4096, format: 'png', dynamic: 'true' });

            const embed = new EmbedBuilder()
                .setTitle(`${userName.username}'s avatar!`)
                .setImage(userAvatar)
                .setColor('Random');

            await interaction.reply({embeds: [embed]});
        },
};