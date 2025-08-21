const { EmbedBuilder, MessageFlags } = require("discord.js");

async function errorFollowUp(
  interaction,
  msg = "Ocorreu um erro durante a execução do comando.",
) {
  return interaction.followUp({
    content: msg,
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = { errorFollowUp };
