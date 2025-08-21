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
      return interaction.reply({
        content: errorObj.msg,
        flags: MessageFlags.Ephemeral,
      });
    }

    if (currQueue.songs.length == 0)
      return interaction.reply({
        content: "A fila está vazia",
        flags: MessageFlags.Ephemeral,
      });

    // await interaction.deferReply();

    try {
      await distube.stop(interaction.guild.id);
      console.log("Música parou");
      // Reiniciar Embed inicial.
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "Não foi possível realizar o comando, tente novamente",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
