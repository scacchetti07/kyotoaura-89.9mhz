const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "addSong",
  async execute(queue, song) {
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`Música adicionada`)
      .setDescription(`Música:\n[${song.name}](${song.url})`)
      .addFields(
        { name: "Duração: ", value: song.formattedDuration, inline: true },
        {
          name: "Plataforma:",
          value: song.source,
          inline: true,
        },
        {
          name: "Posição na Fila",
          value: `${queue.songs.findIndex((sg) => sg.name === song.name) + 1}°`,
          inline: true,
        },
      )
      .setThumbnail(song.thumbnail);

    queue.textChannel.send({ embeds: [embed] }).catch(console.error);
  },
};
