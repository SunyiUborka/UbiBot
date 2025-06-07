import Credit from "../utils/Models/CreditModel.js";
import logger from "../utils/logger.js";
import { DateTime } from "luxon";
import { Events } from "discord.js";
import { addUserCredit } from '../utils/socialCredit/manager.js'

export default {
    name: Events.MessageCreate,
    async execute(message) {
        if(message.author.bot) return;
        let date = DateTime.now().setZone('Europe/Budapest')
        await addUserCredit(message.author.id, message.guildId, 10)
    },
};