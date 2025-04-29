import axios from "axios";
import {JSDOM} from "jsdom";
import {Events, AttachmentBuilder} from "discord.js";
import {schedule} from "node-cron";
import Canvas from 'canvas'

export default {
    name: Events.GuildMemberAdd,
    async execute(member) {

        const canvas = Canvas.createCanvas(1000, 886);
        const context = canvas.getContext('2d');

        context.strokeRect(0, 0, canvas.width, canvas.height);

        const user = (await member.guild.members.fetch('361904030735138828'));

        const avatar = await Canvas.loadImage(user.displayAvatarURL({extension: "jpg"}));
        const background = await Canvas.loadImage('./events/welcome.png');

        context.drawImage(avatar, 146, 133, 803, 886);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        let fontSize = 36;

        context.font = `${fontSize}px arial`;
        context.fillStyle = '#000000';

        const lines = getLines(context, `Szia! Buzi ${user.user.username} vagyok! Üdvözöllek itt ${member.user.username}`, 483, 70);
        for (let i = 0; i < lines.length; i++) {
            context.fillText(lines[i], 460, 100 + (i * fontSize) - 5);
        }

        const attachment = await new AttachmentBuilder(canvas.toBuffer(), {name: 'welcome.jpg'});

        await member.guild.channels.cache.get('1104388164640051221').send({files: [attachment]})
    },
};

let getLines = (ctx, text, maxWidth) => {
    const lines = [];
    if (!text) return lines;

    while (text.length) {
        let i;
        for (i = text.length; ctx.measureText(text.substr(0, i)).width > maxWidth; i -= 1) ;

        const result = text.substr(0, i);

        let j;
        if (i !== text.length) for (j = 0; result.indexOf(' ', j) !== -1; j = result.indexOf(' ', j) + 1) ;

        lines.push(result.substr(0, j || result.length));

        text = text.substr(lines[lines.length - 1].length, text.length);
    }

    return lines;
}