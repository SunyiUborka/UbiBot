import { Client, GatewayIntentBits, Collection, Events } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import * as dotenv from 'dotenv'
import { fileURLToPath } from "url";
import logger from './utils/logger.js'

dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

client.commands = new Collection();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commandsPath = path.join(__dirname, 'commands');
const eventsPath = path.join(__dirname, 'events');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { default: command } = await import(filePath);
    if (command?.data?.name) {
        client.commands.set(command.data.name, command);
    } else {
        logger.error(`Incorrect command: ${file}`);
    }
}

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const { default: event } = await import(filePath);
    try {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    } catch (err){
        logger.error(`Error handling event: ${file}`, err);
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        logger.err(`Command not found: ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction, client);
    } catch (e) {
        if (e === "invalid_request_error") return await interaction.editReply({ content:  'Explicit tartalom', flags: "Ephemeral" });
        if (interaction.deferred) return await interaction.editReply({ content: 'I think something went wrong! :( deferred', flags: "Ephemeral" });
        await interaction.reply({ content: 'I think something went wrong! :(', flags: "Ephemeral" });
        console.error(e);
    }
});

client.login(process.env.DISCORD_TOKEN);