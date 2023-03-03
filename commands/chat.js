import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js'
import { Configuration, OpenAIApi } from 'openai'
import { setTimeout } from 'node:timers/promises'
import dotenv from 'dotenv'

dotenv.config()

const conf = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(conf);

export default {
    data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Chat with OpenAI.')
    .addStringOption(option => option
    .setName('input')
    .setDescription('Ask a question to AI.')
    .setRequired(true))
    .setDMPermission(true)
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction) {
        interaction.deferReply();

        const inputString = interaction.options.getString('input');

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${inputString}`,
            max_tokens: 1024,
            temperature: 0.9
        });

        const embed = new EmbedBuilder()
        .setTitle(`\ ${inputString}`)
        .setDescription(`\ ${response.data.choices[0].text}`)
        .setColor('Random');

        await setTimeout(15000)
        await interaction.editReply({ embeds: [embed]})

        },
};
