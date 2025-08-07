const { EmbedBuilder } = require("discord.js");

function errorEmbed(
  interaction,
  msg = "Ocorreu um erro durante a execução do comando.",
) {
  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setColor("Red")
        .setTitle("Um erro inesperado ocorreu")
        .setDescription(msg),
    ],
  });
}

module.exports = { errorEmbed };
