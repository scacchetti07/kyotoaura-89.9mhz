const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { checkPresence } = require("../../helpers/checkPresence.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Pule a música atual")
    .addStringOption((opc) =>
      opc
        .setName("to")
        .setDescription(
          "Pule para uma música determinada na fila indicando a sua posição.",
        ),
    ),
  async execute(interaction) {
    const distube = interaction.client.distube;
    const errorObj = checkPresence(interaction);
    if (errorObj.error) {
      return errorEmbed(errorObj.msg);
    }

    try {
      const pos = interaction.options.getString("to") ?? "vazio";
      if (pos !== "vazio") {
        const nextSong = await distube.jump(interaction, Number(pos));
        return interaction.reply({
          embeds: [songEmbed(interaction, nextSong)],
        });
      }
      const newSong = await distube.skip(interaction);
      return interaction.reply({
        embeds: [songEmbed(interaction, newSong)],
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        embeds: [errorEmbed("Não foi possível pular a música atual.")],
      });
    }
  },
};

function songEmbed(interaction, nextSong) {
  return new EmbedBuilder()
    .setColor("DarkPurple")
    .setTitle("Pulando a Música")
    .setDescription(
      `Tocando agora a música [${nextSong.name}](${nextSong.url})`,
    )
    .setFooter({
      text: `${interaction.member.user.username}`,
      iconURL: `${interaction.member.user.avatarURL()}`,
    })
    .setTimestamp();
}
