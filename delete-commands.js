const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

/*
rest.put(Routes.applicationGuildCommands(clientId, process.env.GUILD_ID), { body: [] })
.then(() => console.log('Sikeresen törölve az összes guild parancs!'))
.catch(console.error);
*/

rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
.then(() => console.log('Sikeresen törölve az összes parancs!'))
.catch(console.error);