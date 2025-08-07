const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { RepeatMode } = require("distube");
const { checkPresence } = require("../../helpers/checkPresence.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Encerre o player de música"),
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
    // Defer a resposta para evitar timeout
    await interaction.deferReply();

    const queue = await distube.getQueue(interaction.guild.id);
    if (!queue) return;
    const song = queue.songs[0];
    return await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor("Blurple")
          .setTitle("Fila Atual")
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
                  .join("\n") || "Nenhuma música"
              }`,
            ].join("\n"),
          )
          .addFields(
            {
              name: "Autoplay",
              value: `${queue.autoplay ? "On" : "Off"}`,
              inline: true,
            },
            {
              name: "Loop:",
              value: `${
                queue.repeatMode === RepeatMode.QUEUE
                  ? "✅📋"
                  : queue.repeatMode === RepeatMode.SONG
                    ? "✅🎵"
                    : "Desligado"
              }`,
              inline: true,
            },
            {
              name: "Filtros",
              value: `${queue.filters.names.join(", ") || "Desligado"}`,
              inline: false,
            },
          )
          .setThumbnail(song.thumbnail),
      ],
    });
  },
};
