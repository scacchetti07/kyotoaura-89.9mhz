const { PermissionsBitField } = require("discord.js");

const messages = [
  "Você precisa estar em uma call para tocar alguma música",
  "Não tenho permissão para conectar na call",
  "Não tenho permissão para falar na call!",
  "Já estou em uma call atualmente. Aguarde!",
];

function checkVoicePresence(interaction) {
  // Variáveis de identificação
  const memberVoiceChannel = interaction.member.voice.channel;
  const me = interaction.guild.members.me;
  const currentVoiceChannel = interaction.guild.members.me.voice.channel;

  // Caso o usuário não esteja em um canal de voz
  if (!memberVoiceChannel) {
    return { msg: messages[0], error: true };
  }

  // Verifica se o bot tem a permissão para acessar o canal de voz
  if (
    !memberVoiceChannel
      .permissionsFor(me)
      .has(PermissionsBitField.Flags.Connect)
  ) {
    return { msg: messages[1], error: true };
  }

  // Verifica se o bot tem permissão para falar.
  if (
    !memberVoiceChannel.permissionsFor(me).has(PermissionsBitField.Flags.Speak)
  ) {
    return { msg: messages[2], error: true };
  }

  // Verifica se ele mesmo já está em algum canal de voz
  if (currentVoiceChannel && currentVoiceChannel !== memberVoiceChannel) {
    return { msg: messages[3], error: true };
  }

  return { msg: null, error: false };
}

module.exports = { checkVoicePresence };
