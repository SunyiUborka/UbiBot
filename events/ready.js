import axios from "axios";
import {JSDOM} from "jsdom";
import {EmbedBuilder, Events} from "discord.js";
import {schedule} from "node-cron";

export default {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Successfully started ${client.user.tag}!`);

        getApi(client)
        schedule('*/30 * * * *', ()=>{
            getApi(client)
        })

        schedule('0 7 * * *', ()=>{
            axios.get(`https://www.astronet.hu/horoszkop/`)
            .then(res => {
                let hor = new Set();
                let dom = new JSDOM(res.data)
                dom.window.document.querySelectorAll('.gyujto-jegyek .jegy-details').forEach(link => {
                    hor.add(link.href)
                })

                hor.forEach((value)=>{
                    axios.get(`https://www.astronet.hu/${value}`).then(res=>{
                        let dom_hor = new JSDOM(res.data);

                        const embed = new EmbedBuilder()
                        .setTitle(`${dom_hor.window.document.querySelector(`.jegy-adatok .title`).textContent}`)
                        .setColor('Random')
                        .setDescription(`${dom_hor.window.document.querySelector(".details .details-content").textContent}`);
                        client.channels.cache.get('1002844143875260477').send({embeds: [embed]})

                    })
                })

            })
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