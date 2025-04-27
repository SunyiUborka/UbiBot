import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} from "discord.js";
import { OpenAI } from "openai";
import { setTimeout } from "node:timers/promises";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Chat with OpenAI.")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Ask a question to AI.")
        .setRequired(true),
    )
    .setDMPermission(true)
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  async execute(interaction) {
    await interaction.deferReply();

    const inputString = interaction.options.getString("input");

    const chat = await openai.chat.completions.create({
      messages: [{ role: "user", content: inputString }],
      model: "gpt-4o",
    });

    const embed = new EmbedBuilder()
      .setTitle(`\ ${inputString}`)
      .setDescription(`\ ${chat.choices[0].message.content}`)
      .setColor("Random");

    await interaction.editReply({ embeds: [embed] });
  },
};
