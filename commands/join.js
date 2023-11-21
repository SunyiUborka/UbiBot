const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, StreamType, generateDependencyReport} = require("@discordjs/voice")
const { createReadStream} = require('node:fs')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join to voice!')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction) {
        await joinVoiceChannel({channelId: interaction.member.voice.channelId, guildId: interaction.guildId, adapterCreator: interaction.guild.voiceAdapterCreator})
        const  conn = await getVoiceConnection(interaction.guild.id)
        
        const player = createAudioPlayer()
        
        const res = createAudioResource(createReadStream(`./kurukuru.webm`), {
            inlineVolume: true,
            inputType: StreamType.WebmOpus,
        })
        res.volume.setVolume(0.025)
        player.play(res)
        conn.subscribe(player)
        player.on('idle', ()=>{
            const res = createAudioResource(createReadStream(`./kurukuru.webm`), {
                inlineVolume: true,
                inputType: StreamType.WebmOpus,
            })
            res.volume.setVolume(0.025)
            player.play(res)
        })
		interaction.reply({content: 'UwU', ephemeral: true})
    },
};
