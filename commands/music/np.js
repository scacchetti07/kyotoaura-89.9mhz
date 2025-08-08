const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");
const { RepeatMode } = require("distube");
const { checkPresence } = require("../../helpers/checkPresence.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("np")
    .setDescription("Veja a música atual"),
  async execute(interaction) {
    const distube = interaction.client.distube;

    const errorObj = checkPresence(interaction);
    if (errorObj.error) {
      return errorEmbed(interaction, errorObj.msg);
    }

    // Defer a resposta para evitar timeout
    await interaction.deferReply();

    const queue = await distube.getQueue(interaction);
    const currSong = queue.songs[0];
    return await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor("Purple")
          .setTitle(`Tocando Agora`)
          .setDescription(
            `[${currSong.name}](${currSong.url})\n\nPróxima a tocar:  \'${queue?.songs[1] ?? "Nenhuma"}\'`,
          )
          .addFields(
            {
              name: "Tempo Atual",
              value: `${queue.formattedCurrentTime}`,
              inline: true,
            },
            {
              name: "Duração",
              value: `${currSong.formattedDuration}`,
              inline: true,
            },
            {
              name: "Looping:",
              value: `${
                queue.repeatMode === RepeatMode.QUEUE
                  ? "Fila"
                  : queue.repeatMode === RepeatMode.SONG
                    ? "Música"
                    : "Desligado"
              }`,
              inline: true,
            },
          )
          .setThumbnail(currSong.thumbnail),
      ],
    });
  },
};
