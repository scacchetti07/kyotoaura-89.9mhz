import { kyotoEmbed } from "./kyotoAreaEmbed.js";
import { playerButtons } from "./playerButtons.js";

export function createStartMessage(channel) {
  try {
    const embed = kyotoEmbed();
    channel.send({ embeds: [embed], components: [playerButtons()] });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
