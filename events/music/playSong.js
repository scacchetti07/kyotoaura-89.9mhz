const { EmbedBuilder } = require("discord.js");
const { kyotoEmbed } = require("../../helpers/kyotoAreaEmbed.js");
const { KyotoQueue } = require("../../models/KyotoQueue.js");
const { playerButtons } = require("../../helpers/playerButtons.js");

module.exports = {
  name: "playSong",
  async execute(queue, song) {
    let embed;
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
        
        await queue.textChannel
          .send({ embeds: [embed] })
          .catch(console.error);
    } else {
      // Setting the Message Bot in Area
      await queue.textChannel.messages.fetch({limit: 1}).then(msg => KyotoQueue.setMessageId(msg.first().id))
      embed = kyotoEmbed(queue, song);

      try {
        const message = await queue.textChannel.messages.fetch(KyotoQueue.msgId);
        await message.edit({ embeds: [embed], components: [playerButtons()] });
      } catch (err) {
        console.error("Erro ao editar mensagem fixa:", err);
      }
    }
  },
};
