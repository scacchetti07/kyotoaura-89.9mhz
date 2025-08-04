const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "addSong",
  async execute(queue, song) {
    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setTitle(`Adicionado a ${queue.songs.length}° posição`)
      .setDescription(`[${song.name}](${song.url})`)
      .addFields(
        { name: "Duração: ", value: song.formattedDuration, inline: true },
        {
          name: "Pedido Por",
          value: `<@${song.user?.id ?? "Desconhecido"}>`,
          inline: true,
        },
      )
      .setThumbnail(song.thumbnail)
      .setTimestamp();

    queue.textChannel.send({ embeds: [embed] }).catch(console.error);
  },
};
