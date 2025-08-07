const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { checkPresence } = require("../../helpers/checkPresence.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Encerre o player de música"),
  async execute(interaction) {
    const distube = interaction.client.distube;

    const errorObj = checkPresence(interaction);
    if (errorObj.error) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Um erro ocorreu")
            .setDescription(errorObj.msg),
        ],
      });
    }

    // Defer a resposta para evitar timeout
    await interaction.deferReply();

    await distube.stop(interaction.guild.id);
    return await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor("DarkVividPink")
          .setDescription("❌ Player encerrado."),
      ],
    });
  },
};
