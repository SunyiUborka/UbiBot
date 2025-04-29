import { REST, Routes } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

/*
rest.put(Routes.applicationGuildCommands(clientId, process.env.GUILD_ID), { body: [] })
.then(() => console.log('Successfully deleted all guilds command'))
.catch(console.error);
*/

rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
.then(() => console.log('Successfully deleted all command'))
.catch(console.error);