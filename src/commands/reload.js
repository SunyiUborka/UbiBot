import { SlashCommandBuilder } from 'discord.js';
import { loadCommands } from '../utils/loadCommands.js';

export default {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads all commands.'),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    if (interaction.user.id !== "413741899090886667") {
      return interaction.editReply('This user can\'t use this command.')
    }

    try {
      await loadCommands('commands', interaction.client);
      await interaction.editReply('🔄 Commands reloaded!');
    } catch (error) {
      console.error(error);
      await interaction.editReply('❌ An error occurred while reloading..');
    }
  }
}
