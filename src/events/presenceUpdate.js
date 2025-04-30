import { Events } from "discord.js";
import { MongoClient } from "mongodb";

export default {
    name: Events.PresenceUpdate,
    once: false,
    async execute(oldPresence, newPresence) {
        return;
        try {
            if (newPresence.guild.id !== "1104371964342194206") return;
            
            await MongoClient.connect(`mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASSWORD}@bubooo.ddns.net:27017/`, async (err, db)=>
                {
                    let dbo = db.db('greg');
                    let collection = dbo.collection(`status`);
                    
                    console.log(await collection.find({}).toArray())
                    
                    let latest = await collection.find().sort({ timestamp: -1 }).limit(1).toArray()
                });
        }catch (e) {
            console.error(e)
        }
    },
};