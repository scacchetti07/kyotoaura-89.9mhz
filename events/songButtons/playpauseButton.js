const { Events, EmbedBuilder } = require("discord.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");
const { checkPresence } = require("../../helpers/checkPresence.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    const myId = "playpause-button";
    if (!interaction.isButton() || interaction.customId !== myId) return;

    const distube = interaction.client.distube;
    const currQueue = distube.getQueue(interaction);
    const errorObj = checkPresence(interaction);

    if (errorObj.error) {
      return errorEmbed(interaction, errorObj.msg);
    }

    if (currQueue.songs.length == 0)
      return errorEmbed(interaction, "A fila se encontra vazia no momento");

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
