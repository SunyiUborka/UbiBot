import axios from "axios";
import {EmbedBuilder, Events} from "discord.js";
import {schedule} from "node-cron";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Successfully started ${client.user.tag}!`);

        getApi(client)
        schedule('*/30 * * * *', ()=>{
            getApi(client)
        })

        schedule('0 12 * * *', async ()=>{
                const chat = await openai.chat.completions.create({
                    messages: [{ role: "user", content: `kérlek irj egy kis üzenetet arról, hogy Gergő már ${Math.floor(Math.abs((new Date() - new Date('2023.05.31')) / (1000 * 60 * 60 * 24)))} napja munkanélküli, de úgy, hogy az üzenetben Gergőre "GERGO" ként hivatkozol és ne legyen benne aláirás` }],
                    model: "gpt-4o",
                  });
            client.channels.cache.get('1104371965000687639').send(`# ${chat.choices[0].message.content.replaceAll("GERGO", "<@361904030735138828>")}`)
        }, {
            scheduled: true,
            timezone: "Europe/Budapest"
        })
    },
};

const getApi = async (client) => {
    await axios.get(`https://api.getgeoapi.com/v2/currency/convert?api_key=${process.env.GETGEO_API_KEY}&from=USD&to=HUF&amount=1`)
        .then(res => {
            client.user.setPresence({
                activities: [{
                    name: `1$ = ${parseFloat(res.data.rates.HUF.rate).toFixed(2)}Ft`
                }]
            });
        })
}
