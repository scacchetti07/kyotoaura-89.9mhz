const { EmbedBuilder, MessageFlags } = require("discord.js");

async function errorFollowUp(
  interaction,
  msg = "Ocorreu um erro durante a execução do comando.",
) {
  await interaction.deferReply();
  return interaction.reply({
    content: msg,
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = { errorFollowUp };
