const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get your or other avatar!')
        .setDMPermission(false)
        .addUserOption(option => option.setName('user').setDescription('user'))
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
        async execute(interaction) {
            const member = interaction.options.getUser('user') || interaction.user;
            const avatar = member.displayAvatarURL({ size: 4096, format: 'png', dynamic: 'true' });

            const embed = new EmbedBuilder()
                .setTitle(`${member.username} a legnagyobb SIMP`)
                .setImage(avatar)
                .setColor('Random');

            await interaction.reply({embeds: [embed]});
        },
};