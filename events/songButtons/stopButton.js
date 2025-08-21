const { Events, MessageFlags } = require("discord.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");
const { checkPresence } = require("../../helpers/checkPresence.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    const myId = "stop-button";
    if (!interaction.isButton() || interaction.customId !== myId) return;

    const distube = interaction.client.distube;
    const currQueue = distube.getQueue(interaction);
    const errorObj = checkPresence(interaction);

    if (errorObj.error) {
      return errorEmbed(interaction, errorObj.msg);
    }

    if (currQueue.songs.length == 0)
      return errorEmbed(interaction, "A fila se encontra vazia no momento");

    // await interaction.deferReply();

    try {
      await distube.stop(interaction.guild.id);
      console.log("Música parou");
      // Reiniciar Embed inicial.
    } catch (error) {
      console.error(error);
      interaction.followUp({
        content: "Não foi possível realizar o comando, tente novamente",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
