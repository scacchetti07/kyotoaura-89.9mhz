const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { RepeatMode } = require("distube");
const { checkPresence } = require("../../helpers/checkPresence.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Coloque a sua sessão em looping")
    .addSubcommand((option) =>
      option
        .setName("musica")
        .setDescription("Coloque a sua música favorita em looping"),
    )
    .addSubcommand((option) =>
      option
        .setName("fila")
        .setDescription("Coloque a sua fila atual em looping"),
    )
    .addSubcommand((option) =>
      option.setName("desligado").setDescription("Desligue o looping atual"),
    ),
  async execute(interaction) {
    const distube = interaction.client.distube;
    const subcommands = interaction.options.getSubcommand();

    const errorObj = checkPresence(interaction);
    if (errorObj.error) {
      return errorEmbed(interaction, errorObj.msg);
    }

    let status = "";
    let embed;
    //   await interaction.deferReply();
    try {
      switch (subcommands) {
        case "musica":
          distube.setRepeatMode(interaction, 1);
          status = "MÚSICAS";
          break;
        case "fila":
          distube.setRepeatMode(interaction, 2);
          status = "FILA";
          break;
        case "desligado":
          distube.setRepeatMode(interaction, 0);
          status = "0";
          embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("❌ O looping foi desligado");
      }

      if (status !== "0") {
        embed = new EmbedBuilder()
          .setColor("Purple")
          .setDescription(`Looping ligado para **${status}**`);
      }

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return errorEmbed(interaction);
    }
  },
};
