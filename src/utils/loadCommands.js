import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import logger from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(commandsDirPath, client) {
  const commandsPath = path.join(__dirname, '..', commandsDirPath);
  const commandFiles = await readdir(commandsPath);

  client.commands.clear(); // Ürítsd ki a régieket

  logger.info("Reloading commands...")
  for (const file of commandFiles) {
    if (!file.endsWith('.js')) continue;

    const filePath = path.join(commandsPath, file);
    const fileUrl = `${pathToFileURL(filePath).href}?t=${Date.now()}`;

    try {
      const { default: command } = await import(fileUrl);
      if (command?.data?.name && typeof command.execute === 'function') {
        client.commands.set(command.data.name, command);
        logger.info(`✅ Loaded: ${command.data.name}`);
      } else {
        logger.warn(`⚠️ Incorrect command: ${file}`);
      }
    } catch (err) {
      console.error(`❌ Error in ${file} when loading:`, err);
    }
  }
}
