import Credit from "../utils/Models/CreditModel.js";
import logger from "../utils/logger.js";
import { DateTime } from "luxon";
import { Events } from "discord.js";

export default {
    name: Events.MessageCreate,
    async execute(message) {
        if(message.author.bot) return;
        let date = DateTime.now().setZone('Europe/Budapest')
        let user = await Credit.findOne(
            {
                userId: message.author.id, serverId: message.guildId
            })
        console.log(user)
        await user.save()
    },
};