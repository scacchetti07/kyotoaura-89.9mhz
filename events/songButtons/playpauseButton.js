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

    if (currQueue.length == 0)
      return errorEmbed(interaction, "A fila se encontra vazia no momento");
    if (!currQueue.isPaused())
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Em andamento")
            .setDescription("A música atual já está em andamento!"),
        ],
      });

    try {
      if (currQueue.isPlaying()) {
        await distube.resume(interaction);
        return;
      }
      await distube.pause(interaction);
    } catch (error) {
      console.error(error);
      errorEmbed(interaction);
    }
  },
};
