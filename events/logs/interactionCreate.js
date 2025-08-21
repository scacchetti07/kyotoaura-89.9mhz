const { Events, MessageFlags } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `Nenhum comando "${interaction.commandName}" foi encontrado.`,
      );
      return;
    }

    try {
      if (interaction.channel.name === "🎸-kyoto-songs") {
        await interaction.reply({
          content: "Comandos Slash (/) não são executados nesse chat.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Ocorreu um erro enquanto este comando era executado!",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "Ocorreu um erro enquanto este comando era executado! 2",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};
