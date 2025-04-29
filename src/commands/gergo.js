import { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import { OpenAI } from "openai";
import { setTimeout } from "node:timers/promises";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default {
    data: new SlashCommandBuilder()
        .setName('gergo')
        .setDescription('Gergő')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
        async execute(interaction) {
            await interaction.deferReply();

            const chat = await openai.chat.completions.create({
              messages: [{ role: "user", content: `kérlek irj egy kis üzenetet arról, hogy Gergő már ${Math.floor(Math.abs((new Date() - new Date('2023.05.31')) / (1000 * 60 * 60 * 24)))} napja munkanélküli, de úgy, hogy az üzenetben Gergőre "GERGO" ként hivatkozol és ne legyen benne aláirás` }],
              model: "gpt-4o",
            });
            //if (interaction.options.getSubcommand() === 'miota'){
                interaction.editReply(`# ${chat.choices[0].message.content.replaceAll("GERGO", "<@361904030735138828>")}`)
            //}
        },
};