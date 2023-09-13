import fs from'node:fs'
import { REST, Routes } from'discord.js'
import path from'node:path'
import * as dotenv from'dotenv'
import {fileURLToPath} from "url";

dotenv.config();

const commands = []
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);
    commands.push(command.default.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
.then((data) => console.log(`Successfully registered ${data.length} slash command`))
.catch(console.error);
