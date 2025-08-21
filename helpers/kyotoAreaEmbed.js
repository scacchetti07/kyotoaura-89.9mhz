import { EmbedBuilder } from "discord.js";

export function kyotoEmbed(kyoto) {
  return new EmbedBuilder()
    .setColor("Purple")
    .setTitle(kyoto.queueStatus())
    .setDescription(kyoto.queueTemplate())
    .addFields(
      {
        name: "Looping",
        value: kyoto.isLooping(),
        inline: true,
      },
      {
        name: "Pausado",
        value: kyoto.isPaused(),
        inline: true,
      },
      {
        name: "Total",
        value: kyoto.queueCount(),
        inline: true,
      },
    )
    .setImage(kyoto.currentPhotoSong());
}
