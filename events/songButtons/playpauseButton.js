const { Events, EmbedBuilder, MessageFlags } = require("discord.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");
const { checkPresence } = require("../../helpers/checkPresence.js");
const { errorFollowUp } = require("../../helpers/errorFolowUp.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    const myId = "playpause-button";
    if (!interaction.isButton() || interaction.customId !== myId) return;

    const distube = interaction.client.distube;
    const currQueue = distube.getQueue(interaction);
    const errorObj = checkPresence(interaction);

    if (errorObj.error) {
      return await errorFollowUp(interaction, errorObj.msg);
    }

    if (!currQueue) {
      return await errorFollowUp(interaction, "A fila está vazia no momento.");
    }

    try {
      if (!currQueue.isPaused()) {
        console.log("Pausando");
        await distube.pause(interaction);
        return;
      }
      console.log("voltando");
      await distube.resume(interaction);
      return;
    } catch (error) {
      console.error(error);
      errorEmbed(interaction);
    }
  },
};
