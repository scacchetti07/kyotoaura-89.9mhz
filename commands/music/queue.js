const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { RepeatMode } = require("distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Encerre o player de música"),
  async execute(interaction) {
    const distube = interaction.client.distube;

    // Variáveis de identificação
    const memberVoiceChannel = interaction.member.voice.channel;
    const me = interaction.guild.members.me;
    const currentVoiceChannel = interaction.guild.members.me.voice.channel;

    // Caso o usuário não esteja em um canal de voz
    if (!memberVoiceChannel) {
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              "Você precisa entrar em alguma call pra usar esse comando",
            ),
        ],
      });
    }

    // Verifica se ele mesmo já está em algum canal de voz
    if (currentVoiceChannel && currentVoiceChannel !== memberVoiceChannel) {
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              "Você precisa entrar na call pra ver as músicas da fila",
            ),
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
