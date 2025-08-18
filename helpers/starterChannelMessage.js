import {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import { KyotoQueue } from "../models/KyotoQueue.js";
import { errorEmbed } from "./errorEmbedMessage.js";

export function createStartMessage(interaction, channel) {
  const playpauseButton = new ButtonBuilder()
    .setCustomId("playpause-button")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("⏯️");
  const skipButton = new ButtonBuilder()
    .setCustomId("skip-button")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("⏭️");
  const prevButton = new ButtonBuilder()
    .setCustomId("prev-button")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("⏮️");
  const stopButton = new ButtonBuilder()
    .setCustomId("stop-button")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("⏹️");
  const loopButton = new ButtonBuilder()
    .setCustomId("loop-button")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("🔁");
  
  const shuffleButton = new ButtonBuilder()
    .setCustomId("shuffle-button")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("🔀");

  const player = new ActionRowBuilder().addComponents(
    playpauseButton,
    stopButton,
    skipButton,
    loopButton,
    shuffleButton
  );

  try {
    const kyoto = new KyotoQueue(interaction);
    const embed = new EmbedBuilder()
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
      
    channel.send({ embeds: [ embed ], components: [ player ]})
    
  } catch (error) {
    console.error(error);
    throw new Error(error);
    
  }
  
}
