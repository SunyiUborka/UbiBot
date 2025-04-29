import {Events, AttachmentBuilder} from "discord.js";

export default {
    name: Events.MessageCreate,
    async execute(message) {
        if(message.author.bot) return;
    },
};