const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { checkPresence } = require("../../helpers/checkPresence.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pausa a música em execução no momento"),
  async execute(interaction) {
    const distube = interaction.client.distube;
    const currQueue = distube.getQueue(interaction);

    const errorObj = checkPresence(interaction);
    if (errorObj.error) {
      return errorEmbed(interaction, errorObj.msg);
    }

    if (currQueue.length == 0)
      return errorEmbed(interaction, "A fila se encontra vazia no momento");
    if (currQueue.isPaused())
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Purple")
            .setTitle("Já Pausado.")
            .setDescription("A música atual já está pausada! use \`/resume\`"),
        ],
      });

    try {
      const queue = await distube.pause(interaction);
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setTitle("Pausado")
            .setDescription(
              `A música [${queue.songs[0].name}](${queue.songs[0].url}) foi pausada!`,
            ),
        ],
      });
    } catch (error) {
      console.error(error);
      return errorEmbed(interaction);
    }
  },
};
