import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from "discord.js";
import { OpenAI } from "openai";
import { setTimeout } from "node:timers/promises";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default {
  data: new SlashCommandBuilder()
    .setName("generate")
    .setDescription("Generate image with OpenAI.")
    .setDMPermission(true)
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  async execute(interaction) {
    await interaction.deferReply();

    const inputString = interaction.options.getString("input");

    let r
    
    try {
        r = await openai.images.generate({
          model: "dall-e-3",
          prompt: inputString,
          n: 1,
          size: "1024x1024"
        })
    }catch (e) {
      if (e.type === 'invalid_request_error') throw "invalid_request_error"
    }

    const embed = new EmbedBuilder()
      .setTitle(`\ ${inputString}`)
      .setImage(r.data[0].url)
      .setColor("Random");

    await interaction.editReply({ embeds: [embed] });
  },
};
