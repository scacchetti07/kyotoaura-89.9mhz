const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "playSong",
  async execute(queue, song) {
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🎵 Tocando agora")
      .setDescription(`[${song.name}](${song.url})`)
      .addFields(
        { name: "⏱ Duração", value: song.formattedDuration, inline: true },
        {
          name: "Pedido por:",
          value: `<@${song.user?.id ?? "Desconhecido"}>`,
          inline: true,
        },
        {
          name: "Plataforma:",
          value: song.source,
          inline: true,
        },
      )
      .setThumbnail(song.thumbnail)
      .setTimestamp();

    queue.textChannel.send({ embeds: [embed] }).catch(console.error);
  },
};
