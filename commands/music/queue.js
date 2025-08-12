const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { RepeatMode } = require("distube");
const { checkPresence } = require("../../helpers/checkPresence.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Veja quais músicas estão na fila"),
  async execute(interaction) {
    const distube = interaction.client.distube;

    const errorObj = checkPresence(interaction);
    if (errorObj.error) {
      return errorEmbed(interaction, errorObj.msg);
    }
    // Defer a resposta para evitar timeout
    await interaction.deferReply();
    const queue = await distube.getQueue(interaction.guild.id);
    if (!queue) return;
    const song = queue.songs[0];
    return await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor("Purple")
          .setTitle(`Fila em ${interaction.guild.name}`)
          .setDescription(
            [
              `**Tocando agora:** \n[${song.name}](${song.url}) - \`${queue.formattedCurrentTime}\`/\`${
                song.stream.playFromSource
                  ? song.formattedDuration
                  : song.stream.song?.formattedDuration
              }\`\n`,
              `**Na fila**\n${
                queue.songs
                  .slice(1, 10)
                  .map(
                    (song, i) =>
                      `**${i + 1}.** \`${song.formattedDuration}\` [${song.name}](${song.url}) • <@${song.user?.id ?? "Desconhecido"}>`,
                  )
                  .join("\n") || "Fila vazia"
              }`,
            ].join("\n"),
          )
          .addFields(
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
            {
              name: "Total de músicas na fila",
              value: `${queue.songs.length - 1}`,
              inline: true,
            },
            {
              name: "Pausado",
              value: `${queue.isPaused() ? "Sim" : "Não"}`,
            },
          )
          .setThumbnail(song.thumbnail),
      ],
    });
  },
};
