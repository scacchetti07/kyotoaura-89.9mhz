import { kyotoEmbed } from "./kyotoAreaEmbed.js";
import { playerButtons } from "./playerButtons.js";
import { KyotoQueue } from "../models/KyotoQueue.js";

export async function createStartMessage(channel) {
  try {
    const embed = kyotoEmbed();
    const msg = await channel.send({ embeds: [embed], components: [playerButtons()] });
    KyotoQueue.msgId = msg.id;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
