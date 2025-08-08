const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");
const { checkPresence } = require("../../helpers/checkPresence.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Coloque a música atual para tocar novamente!"),
  async execute(interaction) {
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
      await distube.resume(interaction);
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setTitle("⏯️ Retomado")
            .setDescription(
              `A música [${currQueue.songs[0].name}](${currQueue.songs[0].url}) voltou a tocar!!`,
            ),
        ],
      });
    } catch (error) {
      console.error(error);
      return errorEmbed(interaction);
    }
  },
};
