import Credit from "../Models/CreditModel.js";
import logger from "../logger.js";
import { DateTime } from "luxon";

function getUserCredit(userId, serverId){
    return Credit.findOne({
        userId: userId,
        serverId: serverId
    })
}

function getAllUserCredit(serverId){
    return Credit.find({
        serverId: serverId
    })
}

async function addUserCredit(userId, serverId, amount){
    await Credit.findOneAndUpdate({
        serverId: serverId,
        userId: userId,
    },{
        $inc: {
            creditAmount: amount
        },
        $set:{
            lastMessage: new DateTime(r.reportDate).setZone('Europe/Budapest').toFormat("yyyy.MM.dd"),
            lastUpdate: Date,
        }
    },
    {
        upsert: true
    })
}

export { getUserCredit, getAllUserCredit, addUserCredit }