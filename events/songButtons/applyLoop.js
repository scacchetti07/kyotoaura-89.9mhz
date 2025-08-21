const { Events, MessageFlags, EmbedBuilder } = require("discord.js");
const { checkPresence } = require("../../helpers/checkPresence.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (
      !interaction.isStringSelectMenu() ||
      interaction.customId !== "loop-types"
    )
      return;

    const distube = interaction.client.distube;
    const currQueue = distube.getQueue(interaction);
    const loop = interaction.values[0];

    const errorObj = checkPresence(interaction);
    if (errorObj.error) {
      return interaction.reply({
        content: errorObj.msg,
        flags: MessageFlags.Ephemeral,
      });
    }

    if (!currQueue) {
      return interaction.reply({
        content: "A fila está vazia no momento",
        flags: MessageFlags.Ephemeral,
      });
    }

    let status = "";
    let embed;
    //   await interaction.deferReply();
    try {
      switch (loop) {
        case "music":
          distube.setRepeatMode(interaction, 1);
          status = "MÚSICAS";
          break;
        case "queue":
          distube.setRepeatMode(interaction, 2);
          status = "FILA";
          break;
        case "off":
          distube.setRepeatMode(interaction, 0);
          status = "off";
          embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("❌ O looping foi desligado");
      }

      if (status !== "off") {
        embed = new EmbedBuilder()
          .setColor("Purple")
          .setDescription(`Looping ligado para **${status}**`);
      }

      interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    } catch (error) {
      console.log(error);
    }
  },
};
