const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Set discord bot status')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addStringOption(option => option
            .setName('input')
            .setDescription('Status text')
            .setRequired(true))
        .addStringOption(option => option
            .setName('type')
            .setDescription('Set status type')
            .setRequired(true)
            .addChoices(
                    { name: 'Online', value: 'online' },
                    { name: 'Idle', value: 'idle' },
                    { name: 'Do not disturb', value: 'dnd' },
                    { name: 'Invisible', value: 'invisible' }
            )),
        async execute(interaction, client) {
            const inputString = interaction.options.getString('input');
            const typeOptions = interaction.options.getString('type');

            await client.user.setPresence({
                activities: [{
                    name: `${inputString}`
                }],
                status: `${typeOptions}`
            });
            console.log(typeOptions);
            await interaction.reply("Status set!");
        },
};