const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { RepeatMode } = require("distube");
const { checkPresence } = require("../../helpers/checkPresence.js");

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
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Um erro ocorreu")
            .setDescription(errorObj.msg),
        ],
      });
    }

    let status = "";
    let embed;
    //   await interaction.deferReply();
    try {
      switch (subcommands) {
        case "musica":
          distube.setRepeatMode(interaction, 1);
          status = "música favorita";
          break;
        case "fila":
          distube.setRepeatMode(interaction, 2);
          status = "fila";
          break;
        case "desligado":
          distube.setRepeatMode(interaction, 0);
          status = "0";
          embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("❌ O looping atual foi desligado")
            .setFooter({
              text: `${interaction.member.user.username}`,
              iconURL: `${interaction.member.user.avatarURL()}`,
            });
      }

      if (status !== "0") {
        embed = new EmbedBuilder()
          .setColor("Purple")
          .setDescription(`O looping foi setado para a sua ${status}`)
          .setFooter({
            text: `${interaction.member.user.username}`,
            iconURL: `${interaction.member.user.avatarURL()}`,
          });
      }

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Red").setDescription(`ERRO`)],
      });
    }
  },
};
