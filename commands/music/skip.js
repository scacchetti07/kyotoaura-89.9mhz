const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { checkPresence } = require("../../helpers/checkPresence.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Pule a música atual"),
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

    try {
      const newSong = await distube.skip(interaction);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("DarkPurple")
            .setDescription(
              `Pulando para a música [${newSong.name}](${newSong.url})`,
            )
            .setFooter({
              text: `${interaction.member.user.username}`,
              iconURL: `${interaction.member.user.avatarURL()}`,
            })
            .setTimestamp(),
        ],
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Erro")
            .setDescription(`Não foi possível pular a música atual.`),
        ],
      });
    }
  },
};
