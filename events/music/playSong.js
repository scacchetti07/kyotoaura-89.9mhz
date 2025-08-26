const { EmbedBuilder } = require("discord.js");
const { kyotoEmbed } = require("../../helpers/kyotoAreaEmbed.js");
const { KyotoQueue } = require("../../models/KyotoQueue.js");
const { playerButtons } = require("../../helpers/playerButtons.js");

module.exports = {
  name: "playSong",
  async execute(queue, song) {
    let embed;

    // Setting the Message Bot in Area
    queue.textChannel.messages.fetch({limit: 1}).then(msg => KyotoQueue.setMessageId(msg.firstKey()))
    if (queue.textChannel.name !== "🎸-kyoto-songs") {
      embed = new EmbedBuilder()
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
    } else {
      embed = kyotoEmbed(queue, song);
     // queue.textChannel.messages.edit(KyotoQueue.msgId)
    }
    queue.textChannel
      .send({ embeds: [embed], components: [playerButtons()] })
      .catch(console.error);
  },
};
