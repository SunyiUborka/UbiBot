const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { ErelaClient } = require('erela.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause music!')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
        async execute(interaction, client) {
            console.log(client.manager.get(interaction.guild.id))
            
            const nodes = [
                {
                    host: "localhost",
                    port: 2333,
                    password: "youshallnotpass",
                }
            ]
            
            let test = new ErelaClient(client, nodes)
            
            
        },
};