import {Events, AttachmentBuilder} from "discord.js";

export default {
    name: Events.MessageCreate,
    async execute(message) {
        if(message.author.bot) return;
        if (message.content.includes(`sex`) || message.content.includes(`szex`)) 
            await message.channel.send(`https://cdn.discordapp.com/emojis/1105482456250974210.gif?size=160&quality=lossless`)
        if (message.content.includes(`<a:Hhh:1105482456250974210>`))
            await message.channel.send(`https://cdn.discordapp.com/emojis/1105516399318806538.webp?size=160&quality=lossless`)
    },
};