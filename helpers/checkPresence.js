const messages = [
  "Você precisa estar em uma call para tocar alguma música",
  "Eu devo em estar em uma call para usar este comando!",
  "Já estou em uma call atualmente. Aguarde!",
];

function checkPresence(interaction) {
  const memberVoiceChannel = interaction.member.voice.channel;
  const currentVoiceChannel = interaction.guild.members.me.voice.channel;

  // Caso o usuário não esteja em um canal de voz
  if (!memberVoiceChannel) {
    return { msg: messages[0], error: true };
  }

  // Caso o Bot não esteja em nenhum canal de voz
  if (!currentVoiceChannel) {
    return { msg: messages[1], error: true };
  }

  // Verifica se ele mesmo já está em algum canal de voz
  if (currentVoiceChannel && currentVoiceChannel !== memberVoiceChannel) {
    return { msg: messages[2], error: true };
  }

  return { msg: null, error: false };
}

module.exports = { checkPresence };
