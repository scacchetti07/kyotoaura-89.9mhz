import { checkVoicePresence } from "../helpers/checkVoicePresence.js";
import { errorEmbed } from "../helpers/errorEmbedMessage.js";

export async function playSong(song, interaction) {
    const distube = interaction.client.distube; // Recebe o distube instanciado em index.js

    // Variáveis de identificação
    const memberVoiceChannel = interaction.member.voice.channel;

    const errorVoiceObj = checkVoicePresence(interaction);
    if (errorVoiceObj.error) {
      return errorEmbed(interaction, errorVoiceObj.msg);
    }

    // Defer a resposta para evitar timeout
    // await interaction.deferReply();
    try {
      distube.play(memberVoiceChannel, song, {
        textChannel: interaction.channel,
        member: interaction.member,
        metadata: { interaction },
      });
      return
    } catch (err) {
      console.error(err);
      return errorEmbed(interaction, "A música solicitada não foi encontrada.");
    }

}