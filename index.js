import { Client, GatewayIntentBits, Collection, Events } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import * as dotenv from 'dotenv'
import { fileURLToPath } from "url";

dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commandsPath = path.join(__dirname, 'commands');
const eventsPath = path.join(__dirname, 'events');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);

    client.commands.set(command.default.data.name, command);
}

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = await import(filePath);
    try {
        if (event.once) {
            client.once(event.default.name, (...args) => event.default.execute(...args));
        } else {
            client.on(event.default.name, (...args) => event.default.execute(...args));
        }
    } catch (err){
        console.log(err)
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.default.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'I think something went wrong! :(', ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);