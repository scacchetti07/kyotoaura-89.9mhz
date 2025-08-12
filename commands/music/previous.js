const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { checkPresence } = require("../../helpers/checkPresence.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("previous")
    .setDescription("Volte a tocar a música anteriro"),
  async execute(interaction) {
    const distube = interaction.client.distube;

    const errorObj = checkPresence(interaction);
    if (errorObj.error) {
      return errorEmbed(interaction, errorObj.msg);
    }

    try {
      const prevSong = await distube.previous(interaction);
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("DarkPurple")
            .setTitle("Voltando a Música")
            .setDescription(
              `Tocando a música [${prevSong.name}](${prevSong.url})`,
            )
            .setFooter({
              text: `${interaction.member.user.username}`,
              iconURL: `${interaction.member.user.avatarURL()}`,
            })
            .setTimestamp(),
        ],
      });
    } catch (err) {
      console.error(err);
      return errorEmbed(interaction, "Não há música anterior.");
    }
  },
};
