const { EmbedBuilder } = require("discord.js");
const { KyotoQueue } = require("../models/KyotoQueue")

function kyotoEmbed(queue = undefined, song = undefined) {
  const kyoto = new KyotoQueue(queue, song)
  return new EmbedBuilder()
    .setColor("Purple")
    .setTitle(kyoto.queueStatus())
    .setDescription(kyoto.queueTemplate())
    .addFields(
      {
        name: "Looping",
        value: `${kyoto.loopingStatus()}`,
        inline: true,
      },
      {
        name: "Pausado",
        value: `${kyoto.isPaused()}`,
        inline: true,
      },
      {
        name: "Total",
        value: `${kyoto.queueCount()}`,
        inline: true,
      },
    )
    .setImage(kyoto.songPicture());
}

module.exports = { kyotoEmbed };
