const { Events, EmbedBuilder, MessageFlags } = require("discord.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");
const { checkPresence } = require("../../helpers/checkPresence.js");
const { errorFollowUp } = require("../../helpers/errorFolowUp.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    const myId = "skip-button";
    if (!interaction.isButton() || interaction.customId !== myId) return;

    const distube = interaction.client.distube;
    const currQueue = distube.getQueue(interaction);
    const errorObj = checkPresence(interaction);

    if (errorObj.error) {
      return interaction.reply({
        content: errorObj.msg,
        flags: MessageFlags.Ephemeral,
      });
    }

    if (!currQueue) {
      return interaction.reply({
        content: "A fila está vazia no momento",
        flags: MessageFlags.Ephemeral,
      });
    }

    if (currQueue.songs.length <= 1) {
      return interaction.reply({
        content: "Não há músicas na fila a seguir",
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      await distube.skip(interaction);
      console.log("Pulou a música");
      // Modificar tela principal
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: error,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
